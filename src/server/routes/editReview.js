const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;
var sanitize = require("mongo-sanitize");

const editreviewRoutes = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { body, validationResult } = require('express-validator');




editreviewRoutes.route("/review/update/:id").post(body('newreview').not().isEmpty().trim().escape(),
                                       function (req, res) {
  const errors = validationResult(req);
  if(errors.errors.length > 0) {
    res.status(500).json({
      error: errors
    });
    return;
  }


  reviewModel.updateOne(
    {_id: ObjectId(req.params.id)},
    {comment: sanitize(req.body.newreview)}
  ).then(result => {
    console.log('result')
    console.log(result);
    res.status(200).json({
    message: "Review updated!",
    results: result,
  });
  })
  .catch(err => {
    // console.log(err);
    console.log('there is an error')
    res.status(500).json({
      error: err
    });
    return;
  });

 });

 module.exports = editreviewRoutes;
