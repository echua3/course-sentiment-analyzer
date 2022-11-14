/*
* TODO: Add editable user component via editable profiles
*/

const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;
var sanitize = require("mongo-sanitize");

const editUserRoutes = express.Router();
const { userModel } = require("../schema/userSchema");
const { body, validationResult } = require('express-validator');




editUserRoutes.route("/user/update/:userID").post(function (req, res) {
//   const errors = validationResult(req);
    let db_connect = dbo.getDb();
    // console.log(req.body)
    // console.log('Degreetype')
    // console.log(req.body.degreeType)

    let user = {}
    for (const [key,val] of Object.entries(req.body)) {
        if(val) {
            user[key] = val
        }
    }

    userModel.updateMany(
        {userID: req.body.userID},
        user
    ).then(result => {
        // console.log('result')
        // console.log(result);
        res.status(200).json({
        message: "Profile updated!",
        results: result,
    });
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({
          error: err
        });
        return;
    });





 });

 module.exports = editUserRoutes;
