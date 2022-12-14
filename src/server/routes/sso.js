const express = require("express");
const passport = require("passport");
const saml = require("passport-saml");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");

const PbK = process.env.PbK || fs.readFileSync(__dirname + "/../certs/cert.pem", "utf8");
const PvK = process.env.PvK || fs.readFileSync(__dirname + "/../certs/key.pem", "utf8");

const email = "email";
const first = "urn:oid:2.5.4.42";
const last = "urn:oid:2.5.4.4";

const JHU_SSO_URL = "https://idp.jh.edu/idp/profile/SAML2/Redirect/SSO";
const SP_NAME = "https://jhu-courses.herokuapp.com/idp";
const BASE_URL = "https://jhu-courses.herokuapp.com";

// Setup SAML strategy
const samlStrategy = new saml.Strategy(
  {
    // config options here
    entryPoint: JHU_SSO_URL,
    issuer: SP_NAME,
    callbackUrl: `${BASE_URL}/jhu/login/callback`,
    decryptionPvk: PvK,
    privateCert: PvK,
    cert: PbK
  },
  (profile, done) => {
    return done(null, profile);
  }
);

// Tell passport to use the samlStrategy
passport.use("samlStrategy", samlStrategy);

// Serialize and deserialize user for paqssport
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Initialize express.
const ssoRoute = express.Router();


// Pick up React index.html file

// Middleware
ssoRoute.use(bodyParser.urlencoded({ extended: false }));
ssoRoute.use(
  session({ secret: "use-any-secret", resave: false, saveUninitialized: true })
);
ssoRoute.use(passport.initialize({}));
ssoRoute.use(passport.session({}));

// login route
ssoRoute.get(
    "/Login",
    (req, res, next) => {
      next();
    },
    passport.authenticate("samlStrategy")
);

// callback route
ssoRoute.post(
    "/jhu/login/callback",
    (req, res, next) => {
      next();
    },
    passport.authenticate("samlStrategy"),
    (req, res) => {
        // the user data is in req.user
        res.redirect(`https://jhu-courses.herokuapp.com/login/` + req.user[email] + '/' + req.user[first] + '/' + req.user[last]);
    }
);

// route to metadata
ssoRoute.get("/jhu/metadata", (req, res) => {
    res.type("application/xml");
    res.status(200);
    res.send(samlStrategy.generateServiceProviderMetadata(PbK, PbK));
});

module.exports = ssoRoute;