const express = require("express");

const searchAllReviewRoutes = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { param, validationResult } = require('express-validator');

// Use this variable when you need to search through all reviews, not dividing it up with pagination 

// Params, sectionID (specific class ID)
// Returns, error (resource with either the error), or data (the resulting array of reviews and the corresponding information)

searchAllReviewRoutes.route("/review/sectionID/:sectionID/").get(param('sectionID').trim().not().isEmpty(), function (req, res) {

  reviewModel.count().where("classID").equals(req.params.sectionID).exec(function (err, total) {
    console.log(total);
    reviewModel.find().where("classID").equals(req.params.sectionID).exec(
        (err, result) => {
            if (err) res.status(500).json({error: err})
            else res.status(200).json({data: result, 
                numberTotal: total}); 
         }
    )
  });
});

 module.exports = searchAllReviewRoutes;