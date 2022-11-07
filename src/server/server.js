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

// allow cross-origin interaction:
app.use(cors({
    credentials: true,
    origin: [
      'http://localhost:3000', 
      'http://jhu-courses.herokuapp.com',       
      'https://jhu-courses.herokuapp.com'         
    ],
  }));
app.use(express.json());

app.use(addReviewRoute)
app.use(searchReviewRoutes)

// Middlewares
app.use('/api', searchCourseRoute)

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Pick up React index.html file
app.use(express.static(path.join(__dirname, "../webpage/build")))

const dbo_search = require("./db/conn_search")

const sanitizeHTML = require('sanitize-html')

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
