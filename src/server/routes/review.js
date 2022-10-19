const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;

const reviewRoutes = express.Router();


reviewRoutes.route("/review").get(function (req, res) {
    let db_connect = dbo.getDb("Classes");
    db_connect
      .collection("reviews")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });

reviewRoutes.route("/review/sectionID/:sectionID/:page").get(function (req, res) {
  const LIMIT = 3
  const startIndex = (Number(req.params.page) - 1) * LIMIT;
  let db_connect = dbo.getDb();
  let myquery = { sectionID: req.params.sectionID };
  
  db_connect.collection("reviews").countDocuments(myquery).then((total) =>{
    db_connect
    .collection("reviews")
    .find(myquery).limit(LIMIT).skip(startIndex).toArray(function (err, result) {
      if (err) throw err;
      res.status(200).json({data: result, 
                            currentPage: Number(req.params.page),
                            numberOfPage: Math.ceil(total / LIMIT),
                            numberTotal: total});
    })}
  ); 
});

reviewRoutes.route("/review/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    sectionID: req.body.sectionID,
    stars: req.body.stars,
    initialReview: req.body.initialReview,
    author: req.body.author
  };
  db_connect.collection("reviews").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });

 module.exports = reviewRoutes;