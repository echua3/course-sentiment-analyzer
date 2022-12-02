const express = require("express");

const searchReviewRoutes = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { param, validationResult } = require('express-validator');

// Use this to search through specific pages of reviews, in the actual application, upended with pagination

// Params, sectionID (specific class ID)
// Returns, data (resource with the data result of the specific review array (with the corresponding review information)), 
//          currentPage (currentPage of the corresponding dataset), numberOfPage (total number of pages with the values),
//          numberTotal (total amount of values from the scrubbed collection)

searchReviewRoutes.route("/review/sectionID/:sectionID/:page").get(param('sectionID').trim().not().isEmpty(),
                                                                   param('page').trim().not().isEmpty().isInt(),
                                                                   function (req, res) {
  const LIMIT = 3
  const startIndex = (Number(req.params.page) - 1) * LIMIT;

  reviewModel.countDocuments().where("classID").equals(req.params.sectionID).exec(function (err, total) {
    reviewModel.find().where("classID").equals(req.params.sectionID).sort({helpfulness: -1, _id: -1}).limit(LIMIT).skip(startIndex).exec(
        (err, result) => {
            if (err) res.status(500).json({error: err})
            else res.status(200).json({data: result,
                currentPage: Number(req.params.page),
                numberOfPage: Math.ceil(total / LIMIT),
                numberTotal: total});
         }
    )
  });
});

 module.exports = searchReviewRoutes;
