/*
 routes for upvoting a review
 must have reviewID and userID
*/

const express = require("express");
const async = require('async');

const upvoteReviewRoute = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { userModel } = require("../schema/userSchema");
const { param, validationResult } = require('express-validator');

// Use this to upvote a specific review, by bumping the helpfulness score by 1, and adding the upvoted review id to the user reference collection

// Params, userID, reviewID
// Returns, resource with the update message and result (value of the user who undoed the update)

upvoteReviewRoute.route("/review/upvote/:reviewID/:userID").post(param('reviewID').trim().not().isEmpty(),
param('userID').trim().not().isEmpty(),
    async function (req, res) {
        var upvoteResult;
        var userUpvoteResult;

        // edit helpfulness in review model
        try {
            upvoteResult = await reviewModel.findByIdAndUpdate(req.params.reviewID,
                {$inc: {'helpfulness': 1}})
            // console.log("upvoteResult: ", upvoteResult);
        } catch (err) {
            return res.status(500).json({
                message: "Error while upvoting.",
                error: err,
            });
        }

        // edit reviewUpvoteIDs in user model
        try {
            userUpvoteResult = await userModel.updateOne({'userID': req.params.userID}, {
                $addToSet: {
                    ['reviewUpvoteIDs']: req.params.reviewID
                }
            }) 
            // console.log("userUpvoteResult: ", userUpvoteResult);
        } catch (err) {
            return res.status(500).json({
                message: "Error while upvoting and editing user upvoteIDs.",
                error: err,
            });
        }

        // results
        res.status(200).json({
            message: "Review and User reviewUpvoteIDs updated!",
            results: [upvoteResult, userUpvoteResult],
        });
        res.end();
});

    module.exports = upvoteReviewRoute;
