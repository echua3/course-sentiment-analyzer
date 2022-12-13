const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env"})
const port = process.env.PORT || 4000;
const path = require("path");
const cookieParser = require('cookie-parser')

addReviewRoute = require("./routes/addReview")
searchReviewRoutes = require("./routes/searchReview")
searchAllReviewsRoutes = require("./routes/searchAllReviews")
searchCourseRoute = require("./routes/searchCourse")
searchCountRoutes = require("./routes/searchCourseCount")
addUserRoute = require("./routes/addUser")
retrieveUserRoute = require("./routes/retrieveUser")
editUserRoute = require("./routes/editUser")
userReviewRoutes = require("./routes/userReview")
deleteReviewRoutes = require("./routes/deleteReviewProfile")
showProfileRoutes = require("./routes/showProfile")
editreviewRoutes = require("./routes/editReview")
userInfoRoutes = require("./routes/userInfo")

currentUserRoute = require("./routes/getCurrentUser")
login = require("./routes/login")
logout = require("./routes/logout")
getRecsRoute = require("./routes/getRecs")
ssoRoute = require("./routes/sso")

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

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());


app.use(addReviewRoute)
app.use(addUserRoute)
app.use(searchReviewRoutes)
app.use(userReviewRoutes)
app.use(userInfoRoutes)
app.use(retrieveUserRoute)
app.use(editUserRoute)
app.use(deleteReviewRoutes)
app.use(showProfileRoutes)
app.use(searchAllReviewsRoutes)

app.use('/api', searchCourseRoute)
app.use(searchCountRoutes)
app.use(login)
app.use(logout)
app.use(currentUserRoute)
app.use(getRecsRoute)
app.use(editreviewRoutes)
app.use(ssoRoute)


// Pick up React index.html file
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../webpage/build")))
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../webpage/build/index.html'));
});

const dbo_search = require("./db/conn_search")

const upvoteReviewRoute = require("./routes/upvoteReview");
const downvoteReviewRoute = require("./routes/downvoteReview");
const undoUpvoteReviewRoute = require("./routes/undoUpvoteReview");
const undoDownvoteReviewRoute = require("./routes/undoDownvoteReview");

app.use(upvoteReviewRoute)
app.use(downvoteReviewRoute)
app.use(undoUpvoteReviewRoute)
app.use(undoDownvoteReviewRoute)

app.listen(port, () => {

    dbo_search.connectToServer(function (err) {
        if (err) console.error(err);
    })

    console.log(`Server is running on port: ${port}`);
})
