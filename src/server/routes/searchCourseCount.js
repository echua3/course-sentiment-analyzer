const { query } = require("express");
const express = require("express");
const dbo = require("../db/conn_search");

//Use this method, in tandem to read values from the classes collection in
//the database

// Params, courseTitle, courseNumber, credits, department, currentPage, total (total amount of pages)
// Returns, resource with the corresponding classes (with course data) from the specified page given

const searchCountRoutes = express.Router();

searchCountRoutes.route("/totalclasscount").get(function (req, res) {
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

  console.log(req)
  db_connect.collection("testClasses").countDocuments({$and:[myquery]}, function (err, count) {
    if (err){
      console.log(err)
    }else{
      res.status(200).json({Count: count});
    }
  })



});

module.exports = searchCountRoutes;