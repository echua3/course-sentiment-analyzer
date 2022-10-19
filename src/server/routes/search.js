const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;

const searchRoutes = express.Router();
searchRoutes.route("/courselist").get(function (req, res) {


    const LIMIT = 200000;
    const startIndex = (Number(req.query.page) - 1) * LIMIT;
    let db_connect = dbo.getDb("Classes");

    let myquery = {};

    if (req.query.CourseTitle) {
      Object.assign(myquery,{'Title':{$regex:req.query.CourseTitle,$options: 'i'}})
    }
    if (req.query.CourseNumber) {
      Object.assign(myquery,{'OfferingName':{$regex:req.query.CourseNumber,$options: 'i'}})
    }
    if (req.query.Credits) {
      Object.assign(myquery,{'Credits':{$regex:req.query.Credits,$options: 'i'}})
    }
    // if (req.query.InstructorsFullName) {
    //   Object.assign(myquery,{'InstructorsFullName':{$regex:req.query.InstructorsFullName,$options: 'i'}})
    // }
    if (req.query.Department) {
      Object.assign(myquery,{'Department':{$regex:req.query.Department,$options: 'i'}})
      // Object.assign(myquery,{'Department':req.query.Department})
    }


    db_connect.collection("classes").countDocuments(myquery).then((total) =>{
      db_connect
      .collection("classes")
      .find({$and:[myquery]}).limit(LIMIT).skip(startIndex).toArray(function (err, result) {
        if (err) throw err;
        res.status(200).json({data: result,
                              currentPage: Number(req.query.page),
                              numberOfPage: Math.ceil(total / LIMIT),
                              numberTotal: total});
      })}
    );
  });


  module.exports = searchRoutes;
