const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;

const searchReviewRoutes = express.Router();
const { reviewModel } = require("../schema/reviewSchema");
const { param, validationResult } = require('express-validator');

searchReviewRoutes.route("/review/sectionID/:sectionID/:page").get(param('sectionID').trim().not().isEmpty(),
                                                                   param('page').trim().not().isEmpty().isInt(),
                                                                   function (req, res) {
  const LIMIT = 3
  const startIndex = (Number(req.params.page) - 1) * LIMIT;

  reviewModel.countDocuments().where("classID").equals(req.params.sectionID).exec(function (err, total) {
    console.log(total);
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
