const express = require("express");
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

const reviewRoutes = express.Router();


reviewRoutes.route("/review").get(function (req, res) {
    let db_connect = dbo.getDb("classID");
    db_connect
      .collection("reviews")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });

reviewRoutes.route("/review/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
    .collection("reviews")
    .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

reviewRoutes.route("/review/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    classID: req.body.name,
    reviewID: req.body.id,
    valueReview: req.body.valueReview
  };
  db_connect.collection("reviews").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });

reviewRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      classID: req.body.name,
      reviewID: req.body.id,
      valueReview: req.body.valueReview
    },
  };
  db_connect
    .collection("reviews")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
 });

 reviewRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("reviews").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    response.json(obj);
  });
 });