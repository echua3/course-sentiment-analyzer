const passport = require("passport");

// login route
app.get(
    "/jhu/login",
    (req, res, next) => {
      next();
    },
    passport.authenticate("samlStrategy")
);