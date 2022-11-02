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
  let db_connect = dbo.getDb();

  reviewModel.count().where("classID").equals(req.params.sectionID).exec(function (err, total) {
    console.log(total);
    reviewModel.find().limit(LIMIT).skip(startIndex).where("classID").equals(req.params.sectionID).exec(
        (err, result) => {
            if (err) return handleError(err);
            res.status(200).json({data: result, 
                currentPage: Number(req.params.page),
                numberOfPage: Math.ceil(total / LIMIT),
                numberTotal: total}); 
         }
    )
  });
});

 module.exports = searchReviewRoutes;