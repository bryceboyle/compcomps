const MongoClient = require('mongodb').MongoClient;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var ObjectId = require('mongodb').ObjectId; 

const uri = "mongodb+srv://bboyle:dbtimewoo123@cluster0.acl7h.mongodb.net/comps-db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

const app = express();
const jsonParser = bodyParser.json();
app.use(cors());

let database = null;
let propCollection = null;
let userCollection = null;

async function connectDB(){
	console.log(client);
	console.log("before connect")
	await client.connect();
	console.log("after connect")
	// define database
	database = client.db("comps-db");

	// define collections
	propCollection = database.collection("property-info");
	userCollection = database.collection("user-acct-info");
	

}
connectDB();

async function getAllProperties(req, res){
	// console.log("reee")
	const query = {};
	let propCursor = await propCollection.find(query);
	let props = await propCursor.toArray();
	console.log(props);

	const response = props;
	res.json(response);
}

async function createNewUser(req, res){
	const currEmail = req.params.email;
	console.log("emailll: "+ currEmail)
	const query = {email : currEmail};
	let userCursor = await userCollection.find(query);
	let properties = await userCursor.toArray();
	console.log("properties:" + JSON.stringify(properties))
	if (Object.keys(properties).length===0){
		const currEmail = req.params.email;
		const result = await userCollection.insertOne({email : currEmail});
		res.json(result)
	}
	else{
		console.log("i'm elsing")
		const response = properties;
		res.json(response)
	}
}

async function addFormAddy(req, res){
	const currProp = ObjectId(req.params.address);
	const newAddy = req.body.newAddress;

	const filter = {_id : currProp};
	const updateDocument = {
		$set:{
			"formattedAddress" : newAddy
		}
	};
	const result = await propCollection.updateOne(filter, updateDocument);
	res.json(result)
}

async function postReview(req, res){
	console.log("IM POSTING a REVIEW")

	// check for existing user
	let userEmail = req.params.email;
	let revList = [];
	const query = {email : userEmail};
	let userCursor = await userCollection.find(query);
	let properties = await userCursor.toArray();
	// if(Object.keys(properties).length===0){
	// 	console.log("not found")
	// 	const result = await userCollection.insertOne({email : userEmail});
	// 	res.json(result)
	// }
	if(properties[0].reviewList === undefined){
		const filter = {email : userEmail};
		const updateDocument = {
			$set:{
				reviewList : []
			}
		};
		const result = await userCollection.updateOne(filter, updateDocument);
		res.json(result)
	}
	else{
		revList = properties[0].reviewList
		console.log("PROP OF 0" + JSON.stringify(properties[0]))
	}
	revList.push(req.body.reviewObj)
	console.log("yes email")
	// const propID = req.body.propID
	// const rTime = req.body.rTime;
	// const LLName = req.body.LLName;
	// const LLRev = req.body.LLRev;
	// const rent = req.body.rent;
	// const propRev = req.body.propRev;
	// const pictures = req.body.pictures;

	const filter = {email : userEmail};
	const updateDocument = {
		$set:{
			reviewList : revList
		}
	};
	const result = await userCollection.updateOne(filter, updateDocument);
	res.json(result);

	

}



async function getProperty(req, res){
	let propID = new ObjectId(req.params.id);
	console.log("id: " +propID);
	const query = {_id : propID};
	let propsCursor = await propCollection.find(query);
	let properties = await propsCursor.toArray();

	const response = properties;
	console.log(response);
	res.json(response);
}

async function getUser(req, res){
	let userEmail = req.params.email;
	console.log("email: " + userEmail);
	const query = {email : userEmail};
	let userCursor = await userCollection.find(query);
	let user = await userCursor.toArray();

	const response = user;
	console.log(response);
	res.json(response);
}

async function getUserFromID(req, res){
	let userID = new ObjectId(req.params.id);
	console.log("user id: " + userID);
	const query = {_id : userID};
	let userCursor = await userCollection.find(query);
	let user = await userCursor.toArray();

	const response = user;
	console.log(response);
	res.json(response);
}

app.get('/allProps', getAllProperties)
app.get('/properties/:id', getProperty)
app.get('/users/:email', getUser)
app.get('/userID/:id', getUserFromID)

app.post('/create/:email', jsonParser, createNewUser)
app.post('/update/:address', jsonParser, addFormAddy)
app.post('/postReview/:email', jsonParser, postReview)


app.listen(1995, function(){
	console.log("Server is running on port 1995.");
})