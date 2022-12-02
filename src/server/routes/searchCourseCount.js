const express = require("express");
const dbo = require("../db/conn_search");

const searchCountRoutes = express.Router();

searchCountRoutes.route("/totalclasscount").get(function (req, res) {
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

  db_connect.collection("testClasses").countDocuments(myquery).then((total) =>{
    if(!response.ok) {
      console.log("Error:" + response.statusText);
      return;
    }
    response.status(200).json({total: total});

})});

module.exports = searchCountRoutes;