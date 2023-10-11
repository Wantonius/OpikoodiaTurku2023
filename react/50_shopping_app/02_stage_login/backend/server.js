const express = require("express");
const shoppingroute = require("./routes/shoppingroute");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

let app = express();

//BODYPARSER JSON

app.use(express.json());

let port = process.env.PORT || 3001;

//LOGIN DATABASES

let registeredUsers = [];
let loggedSessions = [];
const time_to_live_diff = 3600000;

//LOGIN MIDDLEWARES

const createToken = () => {
	let token = crypto.randomBytes(64);
	return token.toString("hex");
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			return res.status(409).json({"Message":"Username already in use"});
		}
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			console.log(err);
			return res.status(500).json({"Message":"Internal server error"})
		}
		let user = {
			username:req.body.username,
			password:hash
		}
		console.log(user);
		registeredUsers.push(user);
		return res.status(201).json({"Message":"Register success"});
	})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad Request"});
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			bcrypt.compare(req.body.password,registeredUsers[i].password,function(err,success) {
				if(err) {
					console.log(err);
					return res.status(500).json({"Message":"Internal server error"});
				}
				if(!success) {
					return res.status(401).json({"Message":"Unauthorized"});
				}
				let token = createToken();
				let now = Date.now();
				let session = {
					"token":token,
					"user":req.body.username,
					"ttl":now+time_to_live_diff
				}
				loggedSessions.push(session);
				return res.status(200).json({"token":token});
			})
			return;
		}
	}
	return res.status(401).json({"Message":"Unauthorized"});
})

app.use("/api",shoppingroute);

console.log("Running in port",port);

app.listen(port);