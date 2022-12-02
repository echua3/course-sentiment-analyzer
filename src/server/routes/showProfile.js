const express = require("express");

const showProfileRoutes = express.Router();
const { userModel } = require("../schema/userSchema");

showProfileRoutes.route("/user/:userID").get(function (req, res) {

    userModel.find().where("userID").equals(req.params.userID).exec(
        async (err, result) => {
            if (err) res.status(500).json({error: err})
            else {
                res.status(200).json({data: result})
            }
        })
    }
);

module.exports = showProfileRoutes;
