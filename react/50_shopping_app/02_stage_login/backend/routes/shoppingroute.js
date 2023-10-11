const express = require("express");

const router = express.Router();

//DATABASES

let database = [];
let id = 100;

//REST API

router.get("/shopping",function(req,res) {
	let tempDatabase = database.filter(item => item.user === req.session.user)
	return res.status(200).json(tempDatabase);
})

router.post("/shopping", function(req,res) {
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
		"id":id,
		"user":req.session.user
	}
	id++;
	database.push(item);
	return res.status(201).json(item);
})

router.delete("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId && database[i].user === req.session.user) {
			database.splice(i,1);
			return res.status(200).json({"Message":"Success"});
		}
	}
	return res.status(404).json({"Message":"Not found"});
})

router.put("/shopping/:id",function(req,res) {
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
		"id":tempId,
		"user":req.session.user
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId && database[i].user === req.session.user) {
			database.splice(i,1,item);
			return res.status(200).json({"Message":"Success"});
		}
	}
	return res.status(404).json({"Message":"Not found"});
})

module.exports = router;