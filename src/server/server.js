const { ObjectId } = require("mongodb")
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env"})
const port = process.env.PORT || 3000;
const path = require("path");

addReviewRoute = require("./routes/addReview")
searchReviewRoutes = require("./routes/searchReview")
searchCourseRoute = require("./routes/searchCourse")
addUserRoute = require("./routes/addUser")
retrieveUserRoute = require("./routes/retrieveUser")
editUserRoute = require("./routes/editUser")
userReviewRoutes = require("./routes/userReview")
deleteUserRoutes = require("./routes/deleteUser")

// allow cross-origin interaction:
// app.use(cors({
//     credentials: true,
//     origin: [
//         process.env.REACT_APP_API_ENDPOINT,
//         'http://localhost:5000',
//         'http://jhu-courses.herokuapp.com',
//         'https://jhu-courses.herokuapp.com'
//     ],
//   }));

app.use(cors())
app.use(express.json());

app.use(addReviewRoute)
app.use(addUserRoute)
app.use(searchReviewRoutes)
app.use(userReviewRoutes)
app.use(retrieveUserRoute)
app.use(editUserRoute)
app.use(deleteUserRoutes)
app.use('/api', searchCourseRoute)

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Pick up React index.html file
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../webpage/build")))
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../webpage/build/index.html'));
});

const dbo_search = require("./db/conn_search")

const sanitizeHTML = require('sanitize-html');
const addUserRoutes = require("./routes/addUser");

app.listen(port, () => {

    dbo_search.connectToServer(function (err) {
        if (err) console.error(err);
    })

    console.log(`Server is running on port: ${port}`);
})

function cleanup(req, res, next) {
    if (typeof req.body.initialReview != "string") req.body.initialReview = ""

    req.cleanData = {
      initialReview: sanitizeHTML(req.body.initialReview.trim(), { allowedTags: [], allowedAttributes: {} })
    }

    next()
}
