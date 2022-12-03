/* 
 routes for removing downvote of a review
 must have reviewID and userID
*/

const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const async = require('async');

const undoDownvoteReviewRoute = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { userModel } = require("../schema/userSchema");
const { param, validationResult } = require('express-validator');

// Use this to undo the changes made with downvoting a specific post

// Params, userID, reviewID
// Returns, resource with the update message and result (value of the user who undoed the update)

undoDownvoteReviewRoute.route("/review/undoDownvote/:reviewID/:userID").post(param('reviewID').trim().not().isEmpty(),
param('userID').trim().not().isEmpty(),
async function (req, res) {

    try {
        var undoDownvoteResult;
        var userUndoDownvoteResult;
    
        // edit helpfulness in review model
        undoDownvoteResult = await reviewModel.findByIdAndUpdate(req.params.reviewID,
            {$inc: {'helpfulness': 1}})
        // console.log("undoDownvoteResult: ", undoDownvoteResult);

        // edit reviewDownvoteIDs in user model
        userUndoDownvoteResult = await userModel.updateOne({'userID': req.params.userID}, {
            $pull: {
                'reviewDownvoteIDs': ObjectId(req.params.reviewID)
            }
        }) 
        // console.log("userUndoDownvoteResult: ", userUndoDownvoteResult);

        // results 
        res.status(200).json({
            message: "Review and User reviewDownvoteIDs updated!",
            results: [undoDownvoteResult, userUndoDownvoteResult],
        });
        res.end();

    } catch (err) {
        return res.status(500).json({
            message: "Error while undoing downvote.",
            error: err,
        });
    }
    
});

module.exports = undoDownvoteReviewRoute;