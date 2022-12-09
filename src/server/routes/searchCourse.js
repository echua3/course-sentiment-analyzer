const express = require("express");
const dbo = require("../db/conn_search");

// Use this method to get the total amount of classes, in the retrieval of the class
// collection

// Returns, resource with the corresponding amount of classes

const searchRoutes = express.Router();
searchRoutes.route("/courselist").get(function (req, res) {
  const LIMIT = 10;
  const startIndex = (Number(req.query.currentPage) - 1) * LIMIT;
  let db_connect = dbo.getDb("Classes");
  let myquery = {};
  if (req.query.CourseTitle) {
    Object.assign(myquery,{'Title':{$regex:req.query.CourseTitle,$options: 'i'}})
  }
  if (req.query.CourseNumber) {
    if (!Number(req.query.CourseNumber.split('.')[0]) && req.query.CourseNumber.split('.')[0].length > 2) {
      res.json({code: 400, msg: "The format of the Course Number is incorrect", });
      return
    }
    Object.assign(myquery,{'OfferingName':{$regex:req.query.CourseNumber,$options: 'i'}})
  }
  if (req.query.Credits) {
    if (!Number(req.query.Credits)){
      res.json({code: 400, msg: "Credits need to be numbers!", });
      return
    }
    Object.assign(myquery,{'Credits':{$regex:req.query.Credits,$options: 'i'}})
  }
  if (req.query.Department) {
    Object.assign(myquery,{'Department':{$regex:req.query.Department,$options: 'i'}})
  }


  db_connect.collection("testClasses").find({$and:[myquery]}).limit(LIMIT).skip(startIndex).toArray(function (err, result) {
    if (err) return handleError(err);
    res.status(200).json({
      data: result,
      code: 200,
      currentPage: Number(req.query.currentPage),
      numberOfPage: Math.ceil(req.query.total / LIMIT),
      numberTotal: req.query.total,
      Limit: LIMIT,
      msg: '',
    });
  });
});


module.exports = searchRoutes;
