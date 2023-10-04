const express = require("express");

let app = express();

//DATABASES

let database = [];
let id = 100;

//BODYPARSER JSON

app.use(express.json());

let port = process.env.PORT || 3001;

//REST API

app.get("/api/shopping",function(req,res) {
	console.log(req);
	return res.status(200).json(database);
})

console.log("Running in port",port);

app.listen(port);