const express = require("express");
const mongoose = require("mongoose");

let app = express();

let port = process.env.PORT || 3000;

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/?retryWrites=true&w=majority"

console.log(url);

mongoose.connect(url).then(
() => console.log("Connected to Mongo Atlas"),
(error) => console.log("Failed to connect to Mongo Atlas. Reason",error)
)

app.listen(port)