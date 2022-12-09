const express = require("express");
const passport = require("passport");
const saml = require("passport-saml");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const port = process.env.PORT || 4000;

const PbK = process.env.PbK;
const PvK = process.env.PvK;

const displayName = "urn:oid:2.16.840.1.113730.3.1.241";
const grade = "user_field_job_title";
const email = "email";
const school = "urn:oid:1.3.6.1.4.1.5923.1.1.1.4";
const affiliation = "user_field_affiliation";
const JHEDid = "uid";
const dept = "urn:oid:1.3.6.1.4.1.5923.1.1.1.4";
const first = "urn:oid:2.5.4.42";
const last = "urn:oid:2.5.4.4";

//const PbK = fs.readFileSync(__dirname + "/certs/cert.pem", "utf8");
//const PvK = fs.readFileSync(__dirname + "/certs/key.pem", "utf8");

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
      res.send(`welcome ${req.user[JHEDid]}, ${req.user[displayName]}, ${req.user[grade]}, ${req.user[email]}, ${req.user[school]}, ${req.user[affiliation]}, ${req.user[dept]}, ${req.user[first]}, ${req.user[last]}`);
    }
);

// route to metadata
app.get("/jhu/metadata", (req, res) => {
    res.type("application/xml");
    res.status(200);
    res.send(samlStrategy.generateServiceProviderMetadata(PbK, PbK));
});

// Start the server.
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})


// function cleanup(req, res, next) {
//     if (typeof req.body.initialReview != "string") req.body.initialReview = ""

//     req.cleanData = {
//       initialReview: sanitizeHTML(req.body.initialReview.trim(), { allowedTags: [], allowedAttributes: {} })
//     }

//     next()
// }
// const { ObjectId } = require("mongodb")
// const express = require("express");
// const app = express();
// const proxy = require('express-http-proxy');
// const cors = require("cors");
// require("dotenv").config({ path: "./config.env"})
// const port = process.env.PORT || 3000;
// const path = require("path");
// const cookieParser = require('cookie-parser')
// const session = require('express-session')
// var MongoDBStore = require('connect-mongodb-session')(session);
// var bodyParser = require('body-parser')

// addReviewRoute = require("./routes/addReview")
// searchReviewRoutes = require("./routes/searchReview")
// searchAllReviewsRoutes = require("./routes/searchAllReviews")
// searchCourseRoute = require("./routes/searchCourse")
// searchCountRoutes = require("./routes/searchCourseCount")
// addUserRoute = require("./routes/addUser")
// retrieveUserRoute = require("./routes/retrieveUser")
// editUserRoute = require("./routes/editUser")
// userReviewRoutes = require("./routes/userReview")
// deleteReviewRoutes = require("./routes/deleteReviewProfile")
// showProfileRoutes = require("./routes/showProfile")
// editreviewRoutes = require("./routes/editReview")
// userInfoRoutes = require("./routes/userInfo")

// currentUserRoute = require("./routes/getCurrentUser")
// login = require("./routes/login")
// logout = require("./routes/logout")
// getRecsRoute = require("./routes/getRecs")

// // allow cross-origin interaction:
// // app.use(cors({
// //     credentials: true,
// //     origin: [
// //         process.env.REACT_APP_API_ENDPOINT,
// //         'http://localhost:5000',
// //         'http://jhu-courses.herokuapp.com',
// //         'https://jhu-courses.herokuapp.com'
// //     ],
// //   }));

// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true
// }))
// app.use(express.json());
// app.use(express.urlencoded({extended: true}))
// app.use(cookieParser());


// app.use(addReviewRoute)
// app.use(addUserRoute)
// app.use(searchReviewRoutes)
// app.use(userReviewRoutes)
// app.use(userInfoRoutes)
// app.use(retrieveUserRoute)
// app.use(editUserRoute)
// app.use(deleteReviewRoutes)
// app.use(showProfileRoutes)
// app.use(searchAllReviewsRoutes)

// app.use('/api', searchCourseRoute)
// app.use(searchCountRoutes)
// app.use(login)
// app.use(logout)
// app.use(currentUserRoute)
// app.use(getRecsRoute)
// app.use(editreviewRoutes)


// // Pick up React index.html file
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../webpage/build")))
// }

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../webpage/build/index.html'));
// });

// const dbo_search = require("./db/conn_search")

// const sanitizeHTML = require('sanitize-html');
// const addUserRoutes = require("./routes/addUser");
// const upvoteReviewRoute = require("./routes/upvoteReview");
// const downvoteReviewRoute = require("./routes/downvoteReview");
// const undoUpvoteReviewRoute = require("./routes/undoUpvoteReview");
// const undoDownvoteReviewRoute = require("./routes/undoDownvoteReview");

// app.use(upvoteReviewRoute)
// app.use(downvoteReviewRoute)
// app.use(undoUpvoteReviewRoute)
// app.use(undoDownvoteReviewRoute)

// app.listen(port, () => {

//     dbo_search.connectToServer(function (err) {
//         if (err) console.error(err);
//     })

//     console.log(`Server is running on port: ${port}`);
// })

// function cleanup(req, res, next) {
//     if (typeof req.body.initialReview != "string") req.body.initialReview = ""

//     req.cleanData = {
//       initialReview: sanitizeHTML(req.body.initialReview.trim(), { allowedTags: [], allowedAttributes: {} })
//     }

//     next()
// }
