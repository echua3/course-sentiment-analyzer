const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env"})
const port = process.env.PORT || 1000;

app.use(cors());
app.use(express.json());
routes = require("./routes/review")

const dbo = require("./db/conn")

app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    })
})