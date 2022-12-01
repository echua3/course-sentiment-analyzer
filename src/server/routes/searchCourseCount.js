const express = require("express");
const dbo = require("../db/conn_search");

const searchCountRoutes = express.Router();

searchCountRoutes.route("/totalclasscount").get(function (req, res) {
  let db_connect = dbo.getDb("Classes");

  db_connect.collection("testClasses").countDocuments(myquery).then((total) =>{
    if(!response.ok) {
      console.log("Error:" + response.statusText);
      return;
    }
    response.status(200).json({total: total});

})});

module.exports = searchCountRoutes;