const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;

const showProfileRoutes = express.Router();
const { userModel } = require("../schema/userSchema");
const { param, validationResult } = require('express-validator');

showProfileRoutes.route("/user/:userID").get(function (req, res) {

userModel.find().where("userID").equals(req.params.userID).exec(
    async (err, result) => {
        if (err) res.status(500).json({error: err})
        else {
            console.log('result')
            console.log(result)
            res.status(200).json({data: result})
  }
})
}
);

module.exports = showProfileRoutes;
