const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;

const logoutRoute = express.Router();
const { userModel } = require("../schema/userSchema");
const { param, validationResult } = require('express-validator');
const cookieSession = require('cookie-session')

var sanitize = require("mongo-sanitize");

logoutRoute.route("/logout").get(function (req, res) {
    let db_connect = dbo.getDb();
    const token = req.cookies.jwt;
  
    if(!token) {
      return res.status(401).end()
    }
  
    res.cookie("jwt", "", {maxAge: 0, httpOnly: true})
    res.status(200).json({value: "msg-ok"})
});

 module.exports = logoutRoute;