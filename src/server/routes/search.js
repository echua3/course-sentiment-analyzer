const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;

const searchRoutes = express.Router();

searchRoutes.route("/courselist/:page").get(function (req, res) {
    const LIMIT = 20;
    const startIndex = (Number(req.params.page) - 1) * LIMIT;
    let db_connect = dbo.getDb();
    let myquery = {
        Title: req.params.CourseTitle,
        OfferingName: req.params.CourseNumber,
        Credits: req.params.Credits,
        Department: req.params.Department,
    };

    db_connect.collection("classes").countDocuments(myquery).then((total) =>{
      db_connect
      .collection("classes")
      .find(myquery).limit(LIMIT).skip(startIndex).toArray(function (err, result) {
        if (err) throw err;
        res.status(200).json({data: result,
                              currentPage: Number(req.params.page),
                              numberOfPage: Math.ceil(total / LIMIT),
                              numberTotal: total});
      })}
    );
  });
