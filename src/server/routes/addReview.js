const express = require("express");
var sanitize = require("mongo-sanitize");

const reviewRoutes = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { body, validationResult } = require('express-validator');

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

 module.exports = reviewRoutes;