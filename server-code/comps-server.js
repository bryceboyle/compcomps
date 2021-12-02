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

async function addFormAddy(req, res){
	const currProp = ObjectId(req.params.address);
	const newAddy = req.body.newAddress;

	const filter = {_id : currProp};
	const updateDocument = {
		$set:{
			"formattedAddress" : newAddy
		}
	};
	const result = await collection.updateOne(filter, updateDocument);
	res.json(result)
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

app.post('/update/:address', jsonParser, addFormAddy)


app.listen(1995, function(){
	console.log("Server is running on port 1995.");
})