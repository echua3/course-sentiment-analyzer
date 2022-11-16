const express = require("express");
const dbo = require("../db/conn_search");

const recRoutes = express.Router();

recRoutes.route("/recs").get(function (req, res) {
    let db_connect = dbo.getDb("classes");

    const { firstInterest, secondInterest, thirdInterest, department, degreeType } = req.query;

    return db_connect.collection("testClasses").aggregate(
        [{
          $search: {
            "compound": {
              "should": [
                {
                    "text": {
                        "query": firstInterest,
                        "path": ["Other Buzzwords", "Description"],
                        score: { boost: { value: 4 }}
                    }
                },
                {
                    "text": {
                        "query": secondInterest,
                        "path": ["Other Buzzwords", "Description"],
                        score: { boost: { value: 3 }}
                    }
                },
                {
                    "text": {
                        "query": thirdInterest,
                        "path": ["Other Buzzwords", "Description"],
                        score: { boost: { value: 2 }}
                    }
                },
                {
                    "text": {
                        "query": department,
                        "path": "AllDepartments",
                        score: { boost: { value: 2 }}
                    }
                },
                {
                    "text": {
                        "query": degreeType,
                        "path": "Level",
                        score: { boost: { value: 3 }}
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
            "_id": 1,
            "Description": 1,
            "score": { "$meta": "searchScore" },
            "Department" : 1,
            "SchoolName" : 1,
            "OfferingName" : 1,
            "Title" : 1,
            "Credits" : 1,
            "AllDepartments" : 1,
            "Instructors" : 1,
            "InstructorsFullName" : 1,
            "SSS_SectionsID" : 1,
            "Level" : 1,
          }
        }
        ]).toArray(function (err, result) {
        if (err) {
            return handleError(err);
        }
        res.status(200).json({data: result});
    })
});


module.exports = recRoutes;
