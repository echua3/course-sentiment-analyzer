const { ObjectId } = require("mongodb")
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env"})
const port = process.env.PORT || 1000;

app.use(cors());
app.use(express.json());
routes = require("./routes/review")

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const dbo = require("./db/conn")
const sanitizeHTML = require('sanitize-html')

app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    })
})

app.post("/write-review", cleanup, async (req, res) => {
    console.log(req.body);
    const info = await db.collection("Reviews").insertOne(req.cleanData)
    const newReview = await db.collection("Reviews").findOne({ _id: new ObjectId(info.insertedId) })
    res.send(newReview)
})

function cleanup(req, res, next) {
    if (typeof req.body.initialReview != "string") req.body.initialReview = ""
  
    req.cleanData = {
      initialReview: sanitizeHTML(req.body.initialReview.trim(), { allowedTags: [], allowedAttributes: {} })
    }
  
    next()
}