/* 
 routes for removing downvote of a review
 must have reviewID and userID
*/

const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;
const async = require('async');

const undoDownvoteReviewRoute = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { userModel } = require("../schema/userSchema");
const { param, validationResult } = require('express-validator');


undoDownvoteReviewRoute.route("/review/undoDownvote/:reviewID/:userID").post(param('reviewID').trim().not().isEmpty(),
param('userID').trim().not().isEmpty(),
    async function (req, res) {

    let db_connect = dbo.getDb();

    var undoDownvoteResult;
    var userUndoDownvoteResult;

    // edit helpfulness in review model
    try {
        undoDownvoteResult = await reviewModel.findByIdAndUpdate(req.params.reviewID,
            {$inc: {'helpfulness': 1}})
        // console.log("undoDownvoteResult: ", undoDownvoteResult);
    } catch (err) {
        return res.status(500).json({
            message: "Error while undoing downvote.",
            error: err,
        });
    }

    // edit reviewDownvoteIDs in user model
    try {
        userUndoDownvoteResult = await userModel.updateOne({'userID': req.params.userID}, {
            $pull: {
                'reviewDownvoteIDs': ObjectId(req.params.reviewID)
            }
        }) 
        // console.log("userUndoDownvoteResult: ", userUndoDownvoteResult);
    } catch (err) {
        return res.status(500).json({
            message: "Error while userUndoDownvoteResult and editing user downvoteIDs.",
            error: err,
        });
    }

    // results 
    res.status(200).json({
        message: "Review and User reviewDownvoteIDs updated!",
        results: [undoDownvoteResult, userUndoDownvoteResult],
    });
    res.end();
    
});

module.exports = undoDownvoteReviewRoute;