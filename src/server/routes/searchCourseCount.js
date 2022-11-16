const express = require("express");
const { cloneElement } = require("react");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;

const searchCountRoutes = express.Router();

searchCountRoutes.route("/totalclasscount").get(function (req, res) {
  let db_connect = dbo.getDb("Classes");

  db_connect.collection("testClasses").countDocuments(myquery).then((total) =>{
    if(!response.ok) {
      const message = "An error occurred"
      console.log("Error:" + response.statusText);
      return;
    }
    response.status(200).json({total: total});

})});

module.exports = searchCountRoutes;