const express = require("express");
const { cloneElement } = require("react");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;

const searchRoutes = express.Router();
searchRoutes.route("/courselist").get(function (req, res) {


  const LIMIT = 10;
  const startIndex = (Number(req.query.currentPage) - 1) * LIMIT;
  let db_connect = dbo.getDb("Classes");

  let myquery = {};

  if (!req.query.CourseTitle && !req.query.CourseNumber && !req.query.Credits && !req.query.Department){
    Object.assign(myquery,{'Title': 'false'})
  } else {
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
  }

  console.log(myquery)


  db_connect.collection("classes").countDocuments(myquery).then((total) =>{
    db_connect
    .collection("classes")
    // .find({$and:[myquery]}).limit(LIMIT).skip(startIndex).toArray(function (err, result) {
    .find({$and:[myquery]}).limit(LIMIT).skip(startIndex).toArray(function (err, result) {
      // if (err) throw err;
      if (err) return handleError(err);
      console.log(result)
      res.status(200).json({data: result,
                            currentPage: Number(req.query.currentPage),
                            numberOfPage: Math.ceil(total / LIMIT),
                            numberTotal: total,
                            Limit: LIMIT
                          });
    })}
  );
});


module.exports = searchRoutes;
