const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;
var sanitize = require("mongo-sanitize");

const addUserRoute = express.Router();
const { userModel } = require("../schema/reviewSchema");
const { body, validationResult } = require('express-validator');



addUserRoute.route("/user/add").post( function (req, res) {
  let db_connect = dbo.getDb();

  let user = new userModel({
    userID: sanitize(req.body.userID),
    firstName: sanitize(req.body.firstName),
    lastName: sanitize(req.body.lastName),
    degreeType: sanitize(req.body.degreeType),
    firstInterest: sanitize(req.body.firstInterest),
    secondInterest: sanitize(req.body.secondInterest),
    thirdInterest: sanitize(req.body.thirdInterest),
    reviewIDs: sanitize(req.body.reviewIDs),
    reviewUpvotedIDs: sanitize(req.body.reviewUpvotedIDs),
    reviewDownvotedIDs: sanitize(req.body.reviewDownvotedIDs),
    department: sanitize(req.body.dept)
  })
  user.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Handling POST requests to reviews",
      createdReview: result
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
    return;
  });
 });

 module.exports = addUserRoute;