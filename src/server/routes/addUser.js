const express = require("express");
var sanitize = require("mongo-sanitize");

const addUserRoute = express.Router();
const { userModel } = require("../schema/reviewSchema");

addUserRoute.route("/user/add").post( async function (req, res) {

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

  try {
    const result = await review.save();
    res.status(201).json({
      message: "Handling POST requests to reviews",
      createdReview: result
    });
  } catch (err) {
    res.status(500).json({
      error: err
    });
    return;
  }
});

 module.exports = addUserRoute;