const express = require("express");
var sanitize = require("mongo-sanitize");

const reviewRoutes = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { userModel } = require("../schema/userSchema");
const { body, validationResult } = require('express-validator');

// Use this variable to add a review value to the corresponding user and class

// Params, classID (ID of the corresponding course the review belongs to), comment (the contents of the review), difficulty (difficulty score of the review),
//         score (sentiment analysis score of the review), helpfulness (upvote score of the review which should default to 0), date
// Returns, resource with the corresponding error or success msg as well as the created review if the value passes

reviewRoutes.route("/review/add").post(body('comment').not().isEmpty().trim().escape(), 
                                       async function (req, res) {
  const errors = validationResult(req);
  if(errors.errors.length > 0) {
    res.status(500).json({
      error: errors
    });
    return;
  }

  let review = new reviewModel({
    classID: sanitize(req.body.sectionID),
    comment: sanitize(req.body.comment),
    difficulty: sanitize(req.body.difficulty),
    score: sanitize(req.body.score),
    helpfulness: sanitize(req.body.helpfulness),
    date: sanitize(req.body.date)
  })

  let addedCourse = await userModel.findOneAndUpdate({userID: req.body.userID}, {$addToSet: {['courseIDs']: req.body.sectionID}});
  try {
    const result = await review.save();
    let addedReview = await userModel.findOneAndUpdate({userID: req.body.userID}, {$addToSet: {['reviewIDs']: result._id.toHexString()}});
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

 module.exports = reviewRoutes;