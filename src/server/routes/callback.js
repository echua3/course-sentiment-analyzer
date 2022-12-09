const passport = require("passport");

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