import express from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const PORT = 8000;



app.listen(PORT,()=>{
    console.log(`Server successfully connected at http://localhost:${PORT}`)
})

mongoose
  .connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true })
  .then(() => {
    console.log("DB connected");
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  })
  .catch((err) => {
    databasestatus = err;
    console.log("DB Error => ", err);
  });
