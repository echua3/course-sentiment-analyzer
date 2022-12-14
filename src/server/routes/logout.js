const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;

const logoutRoute = express.Router();
const { userModel } = require("../schema/userSchema");
const { param, validationResult } = require('express-validator');
const cookieSession = require('cookie-session')

// Use this route to destroy the cookies of the current user, therefore removing
// login permanence

// Returns, resource with a success msg, if it ends up working, if the token/cookie 
//          isn't there it won't return anything 

var sanitize = require("mongo-sanitize");

logoutRoute.route("/jhu/logout").get(function (req, res) {
    let db_connect = dbo.getDb();
    const token = req.cookies.jwt;
  
    if(!token) {
      return res.status(401).end()
    }
  
    res.cookie("jwt", "", {maxAge: 0, httpOnly: true})
    res.status(200).json({value: "msg-ok"})
});

 module.exports = logoutRoute;