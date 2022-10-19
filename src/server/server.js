const { ObjectId } = require("mongodb")
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env"})
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
routes = require("./routes/review")
routes_search = require("./routes/search")

app.use(routes)
app.use('/api', routes_search)

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

app.post("/write-review", cleanup, async (req, res) => {
    console.log(req.body);
    const info = await db.collection("reviews").insertOne(req.cleanData)
    const newReview = await db.collection("reviews").findOne({ _id: new ObjectId(info.insertedId) })
    res.send(newReview)
})

function cleanup(req, res, next) {
    if (typeof req.body.initialReview != "string") req.body.initialReview = ""

    req.cleanData = {
      initialReview: sanitizeHTML(req.body.initialReview.trim(), { allowedTags: [], allowedAttributes: {} })
    }

    next()
}
