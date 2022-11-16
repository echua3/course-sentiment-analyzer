const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;

const upvoteReviewRoute = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { param, validationResult } = require('express-validator');


upvoteReviewRoute.route("/review/upvote/:reviewID").post(param('reviewID').trim().not().isEmpty(),
    function (req, res) {

    let db_connect = dbo.getDb();

    reviewModel.findByIdAndUpdate(req.params.reviewID, 
        {$inc: {'helpfulness': 1}}
    ).then(result => {
        // console.log('result')
        // console.log(result);
        res.status(200).json({
        message: "Review updated!",
        results: result,
        });
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({
            error: err
        });
        return;
    });
    
});

    module.exports = upvoteReviewRoute;