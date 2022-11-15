const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;
const cookieSession = require('cookie-session')
const currentUserRoute = express.Router();
const { userModel } = require("../schema/userSchema");
const { param, validationResult } = require('express-validator');
const auth = require("./check-auth.js")

const jwt = require("jsonwebtoken");

currentUserRoute.route("/currentUser").get(function (req, res) {
  let db_connect = dbo.getDb();
  const token = req.cookies.jwt;

  if(!token) {
    return res.status(401).end()
  }

  var payload
  try {
    payload = jwt.verify(token, "i_really_hate_express_like_so_much_like_how_does_it_mess_up_this_badly")
  } catch (e) {
    if(e instanceof jwt.JsonWebTokenError) {
        return res.status(401).end()
    }

    return res.status(400).end()
  }
  res.status(200).json({data: payload})
  res.end()
});

 module.exports = currentUserRoute;