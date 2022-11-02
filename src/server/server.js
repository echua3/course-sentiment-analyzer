const { ObjectId } = require("mongodb")
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env"})
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
addReviewRoute = require("./routes/addReview")
searchReviewRoutes = require("./routes/searchReview")
searchCourseRoute = require("./routes/searchCourse")

app.use(addReviewRoute)
app.use(searchReviewRoutes)
app.use('/api', searchCourseRoute)

app.use(express.json())
app.use(express.urlencoded({extended: false}))

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
