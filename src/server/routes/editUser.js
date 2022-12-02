const express = require("express");
const editUserRoutes = express.Router();
const { userModel } = require("../schema/userSchema");

editUserRoutes.route("/user/update/:userID").post(async function (req, res) {
    let user = {}
    for (const [key,val] of Object.entries(req.body)) {
        if(val) {
            user[key] = val
        }
    }

    try {
        const result = await userModel.updateMany(
            {userID: req.body.userID},
            user
        );
        res.status(200).json({
            message: "Profile updated!",
            results: result,
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
        return;
    }

 });

 module.exports = editUserRoutes;
