/* 
 routes for removing upvote of a review
 must have reviewID and userID
*/

const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const async = require('async');

const undoUpvoteReviewRoute = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { userModel } = require("../schema/userSchema");
const { param, validationResult } = require('express-validator');

// Use this to undo the changes made with upvoting a specific post

// Params, userID, reviewID
// Returns, resource with the update message and result (value of the user who undoed the update)

undoUpvoteReviewRoute.route("/review/undoUpvote/:reviewID/:userID").post(param('reviewID').trim().not().isEmpty(),
param('userID').trim().not().isEmpty(),
async function (req, res) {

    try {
        var undoUpvoteResult;
        var userUndoUpvoteResult;

        // edit helpfulness in review model
        undoUpvoteResult = await reviewModel.findByIdAndUpdate(req.params.reviewID,
            {$inc: {'helpfulness': -1}})
        // console.log("undoUpvoteResult: ", undoUpvoteResult);

        // edit reviewUpvoteIDs in user model
        userUndoUpvoteResult = await userModel.updateOne({'userID': req.params.userID}, {
            $pull: {
                'reviewUpvoteIDs': ObjectId(req.params.reviewID)
            }
        }) 
        // console.log("userUndoUpvoteResult: ", userUndoUpvoteResult);

        // results 
        res.status(200).json({
            message: "Review and User reviewUpvoteIDs updated!",
            results: [undoUpvoteResult, userUndoUpvoteResult],
        });
        res.end();

    } catch (err) {
        return res.status(500).json({
            message: "Error while undoing upvote.",
            error: err,
        });
    }

});

module.exports = undoUpvoteReviewRoute;