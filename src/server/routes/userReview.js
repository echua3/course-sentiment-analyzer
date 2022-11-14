const express = require("express");
const dbo = require("../db/conn_search");
const ObjectId = require("mongodb").ObjectId;

const userReviewRoutes = express.Router();
const { userModel } = require("../schema/userSchema");
const { reviewModel } = require("../schema/reviewSchema");
const { param, validationResult } = require('express-validator');

userReviewRoutes.route("/user/review/:userID/:page").get(param('page').trim().not().isEmpty().isInt(),
                                                                   function (req, res) {
  const LIMIT = 5
  const startIndex = (Number(req.params.page) - 1) * LIMIT;
  let db_connect = dbo.getDb("Classes");
  let classes = db_connect.collection("classes");
  //users: reviewsID => reviews: classID => classes: SSS_SectionsID

  console.log('req.params.userID');
  console.log(req.params.userID);
  userModel.count("reviewIDs").where("userID").equals(req.params.userID).exec(function (err, total) {
    console.log('totalreview')
    console.log(total);
    userModel.find().limit(LIMIT).skip(startIndex).where("userID").equals(req.params.userID).exec(
        async (err, result) => {
            if (err) res.status(500).json({error: err})
            else {
                console.log('result');
                console.log(result);
                senddata = [];
                let allreviews = result[0].reviewIDs;
                console.log('allreviews');
                console.log(allreviews.length);
                for (let i = 0; i < allreviews.length; i++) {
                    let newobject = {};
                    newobject['reviewID'] = allreviews[i];
                    let onereview = await reviewModel.find({_id: ObjectId(allreviews[i])}).exec();
                    // const onereview = await reviewModel.find({classID:729491}).exec();
                    console.log('onereview');
                    console.log(onereview);
                    newobject['comment'] = onereview[0]['comment'];
                    newobject['score'] = onereview[0]['score'];
                    newobject['helpfulness'] = onereview[0]['helpfulness'];
                    let classid = onereview[0]['classID'];
                    console.log('classid');
                    console.log(classid);
                    let oneclass = await db_connect.collection('classes').find({'SSS_SectionsID': classid.toString()}).toArray();
                    console.log('oneclass');
                    console.log(oneclass[0]);
                    newobject['OfferingName'] = oneclass[0]['OfferingName'];
                    newobject['Title'] = oneclass[0]['Title'];
                    newobject['Instructors'] = oneclass[0]['Instructors'];
                    senddata.push(newobject);
                }
                console.log('senddata');
                console.log(senddata);
                res.status(200).json({data: senddata,
                    currentPage: Number(req.params.page),
                    numberOfPage: Math.ceil(total / LIMIT),
                    numberTotal: total});

  }
})
}
)});

module.exports = userReviewRoutes;
