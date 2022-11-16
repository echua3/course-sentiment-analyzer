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
    function (req, res) {

    let db_connect = dbo.getDb();

    async.parallel([

        function(callback) {
            reviewModel.findByIdAndUpdate(req.params.reviewID, 
                {$inc: {'helpfulness': 1}}
            , function(err, results) {
                if(err) return callback(err);
                callback(null, results);
            })
        },
        function(callback) {
            userModel.updateOne({'userID': req.params.userID}, {
                $pull: {
                    'reviewDownvoteIDs': ObjectId(req.params.reviewID)
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

module.exports = undoDownvoteReviewRoute;