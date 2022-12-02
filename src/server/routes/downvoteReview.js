/* 
 routes for downvoting a review
 must have reviewID and userID
*/

const express = require("express");
const async = require('async');

const downvoteReviewRoute = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { userModel } = require("../schema/userSchema");
const { param, validationResult } = require('express-validator');

// Use this to downvote a specific review, by bumping the helpfulness score by -1, and adding the downvoted review id to the user reference collection

// Params, userID, reviewID
// Returns, resource with the corresponding success msg as well as the result (which in this case is the user information)

downvoteReviewRoute.route("/review/downvote/:reviewID/:userID").post(param('reviewID').trim().not().isEmpty(),
param('userID').trim().not().isEmpty(),
    function (req, res) {

    async.parallel([

        function(callback) {
            reviewModel.findByIdAndUpdate(req.params.reviewID, 
                {$inc: {'helpfulness': -1}}
            , function(err, results) {
                if(err) return callback(err);
                callback(null, results);
            })
        },
        function(callback) {
            userModel.updateOne({'userID': req.params.userID}, {
                $addToSet: {
                    ['reviewDownvoteIDs']: req.params.reviewID
                }
            }, function(err, results) {
                if(err) return callback(err);
                callback(null, results);
            })
        }

    ], function(err, results) {
        console.log("ERR: ", err);
        if(err) {
            res.status(500).json({
                error: err
            });
        } else {
            res.status(200).json({
                message: "Review and User reviewDownvoteIDs updated!",
                results: results,
            });            
        }
        console.log("RESULTS:", results);
    });
});

module.exports = downvoteReviewRoute;