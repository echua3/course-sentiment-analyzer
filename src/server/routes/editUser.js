const express = require("express");
const editUserRoutes = express.Router();
const { userModel } = require("../schema/userSchema");

// Use this variable when you need to downvote a post, adding the information to the corresponding user information 

// Params, id (review id), newreview (the corresponding new review value)
// Returns, resource with the corresponding error or success msg as well as the result (which in this case is the review information)

editUserRoutes.route("/user/update/:userID").post(async function (req, res) {
    let user = {}
    for (const [key,val] of Object.entries(req.body)) {
        if(val) {
            user[key] = val
        }
    }

    try {
        console.log(userModel.find({userID: req.body.userID}))
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
