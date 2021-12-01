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
let collection = null;

async function connectDB(){
	console.log(client);
	console.log("before connect")
	await client.connect();
	console.log("after connect")
	// define database
	database = client.db("comps-db");

	// define collections
	collection = database.collection("property-info");
	

}
connectDB();

async function getAllProperties(req, res){
	// console.log("reee")
	const query = {};
	let propCursor = await collection.find(query);
	let props = await propCursor.toArray();
	console.log(props);

	const response = props;
	res.json(response);
}

async function getProperty(req, res){
	let propID = new ObjectId(req.params.id);
	console.log("id: " +propID);
	const query = {_id : propID};
	let propsCursor = await collection.find(query);
	let properties = await propsCursor.toArray();

	const response = properties;
	console.log(response);
	res.json(response);
}

app.get('/allProps', getAllProperties)
app.get('/properties/:id', getProperty)


app.listen(1995, function(){
	console.log("Server is running on port 1995.");
})