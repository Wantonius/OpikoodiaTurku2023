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

app.post("/api/shopping", function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	if(!req.body.type) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	let item = {
		"type":req.body.type,
		"count":req.body.count,
		"price":req.body.price,
		"id":id
	}
	id++;
	database.push(item);
	return res.status(201).json(item);
})

app.delete("/api/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			database.splice(i,1);
			return res.status(200).json({"Message":"Success"});
		}
	}
	return res.status(404).json({"Message":"Not found"});
})

app.put("/api/shopping/:id",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	if(!req.body.type) {
		return res.status(400).json({"Message":"Bad Request"})
	}
	let tempId = parseInt(req.params.id,10);
	let item = {
		"type":req.body.type,
		"count":req.body.count,
		"price":req.body.price,
		"id":tempId
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			database.splice(i,1,item);
			return res.status(200).json({"Message":"Success"});
		}
	}
	return res.status(404).json({"Message":"Not found"});
})

console.log("Running in port",port);

app.listen(port);