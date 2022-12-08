const express = require("express");
const passport = require("passport");
const saml = require("passport-saml");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const port = process.env.PORT || 3000;

const PbK = fs.readFileSync(__dirname + "/certs/cert.pem", "utf8");
const PvK = fs.readFileSync(__dirname + "/certs/key.pem", "utf8");

const JHU_SSO_URL = "https://idp.jh.edu/idp/profile/SAML2/Redirect/SSO";
const SP_NAME = "https://jhu-courses.herokuapp.com/idp";
const BASE_URL = "https://jhu-courses.herokuapp.com/";

// Setup SAML strategy
const samlStrategy = new saml.Strategy(
  {
    // config options here
    entryPoint: JHU_SSO_URL,
    issuer: SP_NAME,
    callbackUrl: `${BASE_URL}/jhu/login/callback`,
    decryptionPvk: PvK,
    privateCert: PvK,
    cert: PbK,  //needed to prevent "cert is required" error
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
const app = express();


// Pick up React index.html file

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({ secret: "use-any-secret", resave: false, saveUninitialized: true })
);
app.use(passport.initialize({}));
app.use(passport.session({}));

// Set up homepage route
app.get("/", (req, res) => {
    res.send("Test Home Page!");
});

// login route
app.get(
    "/jhu/login",
    (req, res, next) => {
      next();
    },
    passport.authenticate("samlStrategy")
);

// callback route
app.post(
    "/jhu/login/callback",
    (req, res, next) => {
      next();
    },
    passport.authenticate("samlStrategy"),
    (req, res) => {
      // the user data is in req.user
      res.send(`welcome ${req.user.first_name}`);
    }
);

// route to metadata
app.get("/jhu/metadata", (req, res) => {
    res.type("application/xml");
    res.status(200);
    res.send(samlStrategy.generateServiceProviderMetadata(PbK, PbK));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})


// Start the server.

function cleanup(req, res, next) {
    if (typeof req.body.initialReview != "string") req.body.initialReview = ""

    req.cleanData = {
      initialReview: sanitizeHTML(req.body.initialReview.trim(), { allowedTags: [], allowedAttributes: {} })
    }

    next()
}
