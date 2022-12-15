const express = require("express");
const ObjectId = require("mongodb").ObjectId;
var sanitize = require("mongo-sanitize");
var Sentiment = require('sentiment')

const editreviewRoutes = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { body, validationResult } = require('express-validator');
var sentiment = new Sentiment();

editreviewRoutes.route("/review/update/:id").post(body('newreview').not().isEmpty().trim().escape(),
                                       async function (req, res) {
  const errors = validationResult(req);
  if(errors.errors.length > 0) {
    res.status(500).json({
      error: errors
    });
    return;
  }

  try {
    const result = await reviewModel.updateOne(
      {_id: ObjectId(req.params.id)},
      {comment: sanitize(req.body.newreview),
       score:sentiment.analyze(sanitize(req.body.newreview)).score
      }

    );
    res.status(200).json({
      message: "Review updated!",
      results: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err
    });
    return;
  }
});

 module.exports = editreviewRoutes;
