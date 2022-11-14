const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;
var sanitize = require("mongo-sanitize");

const reviewRoutes = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { body, validationResult } = require('express-validator');




reviewRoutes.route("/review/update/:id").post(body('comment').not().isEmpty().trim().escape(),
                                       function (req, res) {
  const errors = validationResult(req);
  if(errors.errors.length > 0) {
    res.status(500).json({
      error: errors
    });
    return;
  }
  let db_connect = dbo.getDb();

  let review = new reviewModel({
    classID: sanitize(req.body.sectionID),
    comment: sanitize(req.body.comment),
    difficulty: sanitize(req.body.difficulty),
    score: sanitize(req.body.score),
    helpfulness: sanitize(req.body.helpfulness),
  })
  reviewModel.where("_id").equals(req.params.id).updateMany(
    {},
    { $set: {
        review
    }}
  )
 });

 module.exports = reviewRoutes;