/*
* TODO: Add editable user component via editable profiles
*/
/*
* TODO: Add editable user component via editable profiles
*/
const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;
var sanitize = require("mongo-sanitize");

const reviewRoutes = express.Router();
const { userModel } = require("../schema/userSchema");
const { body, validationResult } = require('express-validator');




reviewRoutes.route("/user/update/:userID").post(function (req, res) {
//   const errors = validationResult(req);
    let db_connect = dbo.getDb();

    let user = new userModel({
        userID: sanitize(req.body.userID),
        firstName: sanitize(req.body.firstName),
        lastName: sanitize(req.body.lastName),
        degreeType: sanitize(req.body.degreeType),
        interests: sanitize(req.body.interests),
        reviewIDs: sanitize(req.body.reviewIDs),
        reviewUpvotedIDs: sanitize(req.body.reviewUpvotedIDs),
        reviewDownvotedIDs: sanitize(req.body.reviewDownvotedIDs),
        dept: sanitize(req.body.dept)
    })

    userModel.where("_id").equals(req.params.id).updateMany(
        {},
        {$set: {
            user
        }}
    ).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Profile updated!",
    });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
        return;
    });




 });

 module.exports = reviewRoutes;
