const express = require("express");

const userInfoRoutes = express.Router();
const { userModel } = require("../schema/userSchema");

userInfoRoutes.route("/user/info/:userID").get(function (req, res) {
    userModel.find().where("userID").equals(req.params.userID).exec(
        async (err, result) => {
            if (err) res.status(500).json({error: err})
            else {
                console.log('result'),
                console.log(result)
                res.status(200).json({data: result});
            }
        })
    }
);

module.exports = userInfoRoutes;
