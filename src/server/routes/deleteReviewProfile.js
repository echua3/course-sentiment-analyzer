const express = require("express");
const ObjectId = require("mongodb").ObjectId;

const deleteReviewRoutes = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { userModel } = require("../schema/userSchema");

const { body, validationResult } = require('express-validator');

// Use this route to delete a corresponding review value from the user

// Params, userID, reviewID
// Returns, resource with the corresponding error or success msg as well as the result (which in this case is the user information)

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


  let onereview = await reviewModel.find({_id: ObjectId(req.params.reviewID)}).exec();
  let classid = onereview[0]['classID'];

  const reviewUpdate = finduser[0]['reviewIDs'].remove(req.params.reviewID);
  console.log(finduser[0]['courseIDs'])
  const classidUpdate = finduser[0]['courseIDs'].remove(classid);
  console.log(classidUpdate)


  await reviewModel.findOneAndDelete({_id: ObjectId(req.params.reviewID)})
  await userModel.findOneAndDelete()
  userModel.findOneAndUpdate(
    {userID: req.params.userID },
    {reviewIDs: reviewUpdate,
     courseIDs: classidUpdate
    }
    ).then(result => {
    res.status(200).json({
    message: "Profile updated!",
    results: result,
    });
    })
    .catch(err => {
    res.status(500).json({
      error: err
    });
    return;
});

 });

 module.exports = deleteReviewRoutes;
