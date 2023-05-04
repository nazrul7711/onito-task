const express = require("express");
const mongoose = require("mongoose");
const router = require("../router/PersonRoutes");
const cors = require("cors");

let app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

mongoose
  .connect(
    "mongodb+srv://nazrul:CKrT5dskElr0T60h@cluster0.wew6u.mongodb.net/onito-assignment",
    {
      useNewUrlParser: true,
      useUnifiedTopology:true,

    }
  )
  .then(() => console.log("mongodb is connected"));

app.listen(3002, () => {
  console.log("listening on port no 3002");
});

