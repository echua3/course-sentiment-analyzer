/* 
 routes for removing upvote of a review
 must have reviewID and userID
*/

const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;
const async = require('async');

const undoUpvoteReviewRoute = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { userModel } = require("../schema/userSchema");
const { param, validationResult } = require('express-validator');


undoUpvoteReviewRoute.route("/review/undoUpvote/:reviewID/:userID").post(param('reviewID').trim().not().isEmpty(),
param('userID').trim().not().isEmpty(),
    async function (req, res) {

    let db_connect = dbo.getDb();

    var undoUpvoteResult;
    var userUndoUpvoteResult;

    // edit helpfulness in review model
    try {
        undoUpvoteResult = await reviewModel.findByIdAndUpdate(req.params.reviewID,
            {$inc: {'helpfulness': -1}})
        // console.log("undoUpvoteResult: ", undoUpvoteResult);
    } catch (err) {
        return res.status(500).json({
            message: "Error while undoing upvote.",
            error: err,
        });
    }

    // edit reviewUpvoteIDs in user model
    try {
        userUndoUpvoteResult = await userModel.updateOne({'userID': req.params.userID}, {
            $pull: {
                'reviewUpvoteIDs': ObjectId(req.params.reviewID)
            }
        }) 
        // console.log("userUndoUpvoteResult: ", userUndoUpvoteResult);
    } catch (err) {
        return res.status(500).json({
            message: "Error while userUndoUpvoteResult and editing user upvoteIDs.",
            error: err,
        });
    }

    // results 
    res.status(200).json({
        message: "Review and User reviewUpvoteIDs updated!",
        results: [undoUpvoteResult, userUndoUpvoteResult],
    });
    res.end();
});

module.exports = undoUpvoteReviewRoute;