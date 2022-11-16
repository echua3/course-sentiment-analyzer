const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;
var sanitize = require("mongo-sanitize");

const deleteReviewRoutes = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { userModel } = require("../schema/userSchema");

const { body, validationResult } = require('express-validator');

deleteReviewRoutes.route("/user/review/delete/:userID/:reviewID").delete(async function (req, res) {
  const errors = validationResult(req);
  if(errors.errors.length > 0) {
    res.status(500).json({
      error: errors
    });
    return;
  }
  let finduser = await userModel.find({userID: req.params.userID}).exec();
                    // const onereview = await reviewModel.find({classID:729491}).exec();

  const reviewUpdate = finduser[0]['reviewIDs'].remove(req.params.reviewID);

  await reviewModel.findOneAndDelete({_id: ObjectId(req.params.reviewID)})
  userModel.findOneAndUpdate(
    {userID: req.params.userID },
    {reviewIDs: reviewUpdate}
    ).then(result => {
    // console.log('result')
    // console.log(result);
    res.status(200).json({
    message: "Profile updated!",
    results: result,
    });
    })
    .catch(err => {
    // console.log(err);
    res.status(500).json({
      error: err
    });
    return;
});

 });

 module.exports = deleteReviewRoutes;
