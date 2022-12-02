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
                $pull: {
                    'reviewUpvoteIDs': ObjectId(req.params.reviewID)
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
                message: "Review and User reviewUpvoteIDs updated!",
                results: results,
            });            
        }
        console.log("RESULTS:", results);
    });
    
});

module.exports = undoUpvoteReviewRoute;