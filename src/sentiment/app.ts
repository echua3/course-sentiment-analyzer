import express from "express";
import cors from "cors";
import { getSentiment } from "./src/nlp";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.listen(4000, () => console.log("App is running http://localhost:4000"));
app.get("/health", (req, res) => res.send(200));
    app.post("/api/sentiment", (req, res) => {
        const data = req.body.data;
      
        const sentiment = getSentiment(data);
      
        return res.send({ sentiment });
      });