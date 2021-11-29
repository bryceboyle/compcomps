const MongoClient = require('mongodb').MongoClient;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// import fetch from "node-fetch";
const fetch = require("node-fetch")

const uri = "mongodb+srv://bboyle:dbtimewoo123@cluster0.acl7h.mongodb.net/comps-db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

const app = express();
const jsonParser = bodyParser.json();
app.use(cors());

let database = null;
let collection = null;

async function connectDB(){
	console.log("before connect")
	await client.connect();
	console.log("after connect")
	// define database
	database = client.db("comps-db");

	// define collections
	collection = database.collection("property-info");

	let response = await fetch('https://data.lacity.org/resource/2uz8-3tj3.json?address_zip=90041') // Building and Safety Code Enforcement Case for 90041
    console.log(response.status)
    //     .then(response => response.json())
    //     .then(result =>{
    //     	console.log(result)
    //         propList = result
    // })
	
	// const result = await collection.insertMany(propList);
	// console.log(result.insertedCount);
	client.close();
	

}
connectDB();






