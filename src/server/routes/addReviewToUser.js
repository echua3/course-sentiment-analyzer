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

    try {
        var userUpvoteResult;
        userUpvoteResult = await userModel.updateOne({'userID': req.params.userID}, {
            $addToSet: {
                ['reviewUpvoteIDs']: req.params.reviewID
            }
        }) 
      
        res.status(200).json({
            message: "Review and User reviewUpvoteIDs updated!",
            results: [userUpvoteResult],
        });
        res.end();

    } catch (err) {
        return res.status(500).json({
            message: "Error while upvoting.",
            error: err,
        });
    }
});

module.exports = upvoteReviewRoute;
