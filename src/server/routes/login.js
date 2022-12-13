const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;
const cookieSession = require('cookie-session')
const jwt = require('jsonwebtoken');
const cookies = require('js-cookie')

const loginRoute = express.Router();
const { userModel } = require("../schema/userSchema");
const { param, validationResult } = require('express-validator');

// Use this variable to decipher logins using the user model, defined in the user schema,
// and create a cookie once an individual logs in

// Params, userID
// Returns, resource with the corresponding error or success msg

var sanitize = require("mongo-sanitize");

loginRoute.route("/login/:userID/:first/:last").get(param('userID').trim().not().isEmpty(),                                                                   function (req, res) {
  let db_connect = dbo.getDb();
  
  userModel.find().where("userID").equals(sanitize(req.params.userID)).exec(
        (err, result) => {
            if (Object.keys(result).length === 0) {
                    user = {
                        userID: req.params.userID,
                        firstName: req.params.first,
                        lastName: req.params.last
                    };
                    userModel.create(user);
                    const token = jwt.sign(
                        {userId: req.params.userID},
                        "i_really_hate_express_like_so_much_like_how_does_it_mess_up_this_badly",
                         { expiresIn: "1h"});
    
                    res.cookie("jwt", token, {maxAge: 3600 * 1000, httpOnly: true})
                    res.redirect(`https://jhu-courses.herokuapp.com/ProfileEdit`);
                    //res.end();
            }
            else {
                const token = jwt.sign(
                    {userId: req.params.userID},
                    "i_really_hate_express_like_so_much_like_how_does_it_mess_up_this_badly",
                     { expiresIn: "1h"});

                res.cookie("jwt", token, {maxAge: 3600 * 1000, httpOnly: true})
                console.log("AM I GETTING HERE?")
                res.redirect(`https://jhu-courses.herokuapp.com/Profile`);
                res.end();
            }
         }
  );
});

 module.exports = loginRoute;