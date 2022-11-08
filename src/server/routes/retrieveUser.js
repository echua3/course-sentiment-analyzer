const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;

const retrieveUserRoute = express.Router();
const { userModel } = require("../schema/userSchema");
const { param, validationResult } = require('express-validator');

var sanitize = require("mongo-sanitize");

retrieveUserRoute.route("/user/:userID").get(param('userID').trim().not().isEmpty(),                                                                   function (req, res) {
  let db_connect = dbo.getDb();
  
  userModel.find().where("userID").equals(sanitize(req.params.userID)).exec(
        (err, result) => {
            if (err) res.status(500).json({error: err})
            else res.status(200).json({data: result})
         }
  );
});

 module.exports = retrieveUserRoute;