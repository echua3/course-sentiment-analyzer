const express = require("express");
const dbo = require("../db/conn_search");

const recRoutes = express.Router();

recRoutes.route("/recs").get(function (req, res) {
    let db_connect = dbo.getDb("classes");

    const { firstInterest, secondInterest, thirdInterest, department } = req.query;

    return db_connect.collection("testClasses").aggregate(
        [{
          $search: {
            "compound": {
              "should": [
                {
                    "text": {
                        "query": firstInterest, //replace with user.firstInterest
                        "path": ["Other Buzzwords", "Description"],
                        score: { boost: { value: 4 }}
                    }
                },
                {
                    "text": {
                        "query": secondInterest, //replace with user.secondInterest
                        "path": ["Other Buzzwords", "Description"],
                        score: { boost: { value: 3 }}
                    }
                },
                {
                    "text": {
                        "query": thirdInterest, //replace with user.thirdInterest
                        "path": ["Other Buzzwords", "Description"],
                        score: { boost: { value: 2 }}
                    }
                },
                {
                    "text": {
                        "query": department, //replace with user.dept[0]
                        "path": "Department",
                        score: { boost: { value: 2 }}
                    }
                },
              ]
            }
          }
        },
        {
            "$limit": 10
        },
        {
          $project: {
            "_id": 0,
            "Description": 1,
            //"averageScore": 1, //this would be the average sentiment score that was calculated and stored for each course
            "score": { "$meta": "searchScore" }, //multiply "averageScore" with "score" and then sort by
            "Department" : 1,
          }
        }]).toArray(function (err, result) {
        if (err) {
            return handleError(err);
        }
        res.status(200).json({data: result});
    })


    //}


  /*const LIMIT = 10;
  const startIndex = (Number(req.query.currentPage) - 1) * LIMIT;
  let db_connect = dbo.getDb("Classes");

  let myquery = {};

  // if (!req.query.CourseTitle && !req.query.CourseNumber && !req.query.Credits && !req.query.Department){
  //   Object.assign(myquery,{'Title': 'false'})
  // } else {}
  if (req.query.CourseTitle) {
    Object.assign(myquery,{'Title':{$regex:req.query.CourseTitle,$options: 'i'}})
  }
  if (req.query.CourseNumber) {
    // console.log(req.query.CourseNumber.split('.'))
    if (!Number(req.query.CourseNumber.split('.')[0]) && req.query.CourseNumber.split('.')[0].length > 2) {
      res.json({code: 400,
                msg: "The format of the Course Number is incorrect",
              });
      return
    }
    Object.assign(myquery,{'OfferingName':{$regex:req.query.CourseNumber,$options: 'i'}})
  }
  if (req.query.Credits) {
    if (!Number(req.query.Credits)){
      res.json({code: 400,
                msg: "Credits need to be numbers!",
              });
      return
    }
    Object.assign(myquery,{'Credits':{$regex:req.query.Credits,$options: 'i'}})
  }
  if (req.query.Department) {
    Object.assign(myquery,{'Department':{$regex:req.query.Department,$options: 'i'}})
    // Object.assign(myquery,{'Department':req.query.Department})
  }


  // console.log(myquery)


  db_connect.collection("classes").countDocuments(myquery).then((total) =>{
    db_connect
    .collection("classes")
    // .find({$and:[myquery]}).limit(LIMIT).skip(startIndex).toArray(function (err, result) {
    .find({$and:[myquery]}).limit(LIMIT).skip(startIndex).toArray(function (err, result) {
      // if (err) throw err;
      if (err) return handleError(err);
      // console.log(result)
      res.status(200).json({data: result,
                            code: 200,
                            currentPage: Number(req.query.currentPage),
                            numberOfPage: Math.ceil(total / LIMIT),
                            numberTotal: total,
                            Limit: LIMIT,
                            msg: '',
                          });
    })}
  );*/
});


module.exports = recRoutes;
