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
	// console.log(client);
	console.log("before connect")
	await client.connect();
	console.log("after connect")
	// define database
	database = client.db("comps-db");

	// define collections
	propCollection = database.collection("property-info");
	userCollection = database.collection("user-acct-info");
	revCollection = database.collection("reviews");
	

}
connectDB();

async function getAllProperties(req, res){
	// console.log("reee")
	const query = {};
	let propCursor = await propCollection.find(query);
	let props = await propCursor.toArray();
	// console.log(props);

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
	console.log

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

	let userid = new ObjectId(req.params.userID);
	const postResult = await revCollection.insertOne(req.body.reviewObj);
	res.json(postResult)
	let revId = JSON.stringify(postResult.insertedId);

	// check for existing user
	let revList = [];
	const query = {_id : userid};
	let userCursor = await userCollection.find(query);
	let properties = await userCursor.toArray();
	console.log("revid " +revId)
	if(properties[0].reviewList === undefined){
		console.log("no list. before creating")
		const filter = {_id : userid};
		const updateDocument = {
			$set:{
				reviewList : []
			}
		};
		console.log("no list. after defining update doc")
		const result = await userCollection.updateOne(filter, updateDocument);
		// res.json(result)
		console.log("no list. after creating")
	}
	else{
		revList = properties[0].reviewList
		console.log("PROP OF 0" + JSON.stringify(properties[0]))
	}
	console.log("list made. before pushing rev id")
	await revList.push(revId)
	console.log("after pushing rev id")
	console.log("list "+revList)
	console.log("yes email")
	

	const filter = {_id : userid};
	const updateDocument = {
		$set:{
			reviewList : revList
		}
	};
	const result = await userCollection.updateOne(filter, updateDocument);
	// res.json(result);

	

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

async function getRevFromProp(req, res){
	let propId = req.params.propID;
	console.log("user id: " + propId);
	const query = {propID : propId};
	let userCursor = await revCollection.find(query);
	let user = await userCursor.toArray();

	const response = user;
	console.log(response);
	res.json(response);
}

async function getPropFromAddy(req, res){
	let addy = req.params.address;
	let RE = new RegExp(addy, "i")
	console.log("address: " + addy);
	const query = {formattedAddress : RE};
	let userCursor = await propCollection.find(query);
	let user = await userCursor.toArray();

	const response = user;
	console.log(response);
	res.json(response);
}

async function getRevFromUser(req, res){
	let userid = req.params.userID;
	console.log("user: " + userid);
	const query = {userID : userid};
	let userCursor = await revCollection.find(query);
	let user = await userCursor.toArray();

	const response = user;
	console.log(response);
	res.json(response);
}
async function ree(req, res){
	let propID = new ObjectId(req.params.id);
	// console.log("id: " +propID);
	const query = {owner : /gan link/i};
	let propsCursor = await propCollection.find(query);
	let properties = await propsCursor.toArray();

	const response = properties;
	console.log(response);
	res.json(response);
}

async function getRevFromOwner(req, res){
	let userid = req.params.owner;
	console.log("owner: " + userid);
	// let meep = userid === "gan"
	// console.log("equal? "+meep)
	let testRE = new RegExp(userid, "i")
	const query = {owner : testRE};
	console.log("query: "+JSON.stringify(query))
	let userCursor = await propCollection.find(query);
	let user = await userCursor.toArray();
	console.log("properties: "+JSON.stringify(user))
	// let meep = userid === user[0].owner
	// console.log("equal? "+meep)
	let reviews = []

	for(let i = 0; i<user.length; i++){
		const query2 = {propID : user[i]._id.toString()};
		console.log("ids: "+user[i]._id)
		let cursor = await revCollection.find(query2);
		let temp = await cursor.toArray();
		console.log("temp: "+temp)
		for(let j = 0; j<temp.length;j++){
			reviews.push(temp[j])
		}
	}

	const response = reviews;
	console.log(response);
	res.json(response);
}

async function suggestLL(req, res){
	const currProp = new ObjectId(req.params.propID);
	const newLL = req.body.LL;
	console.log("IM SUGGESTINGNGNGN: "+ newLL)

	let LLList = [];
	const query = {_id : currProp};
	let userCursor = await propCollection.find(query);
	let properties = await userCursor.toArray();
	if(properties[0].LL_list === undefined){
		console.log("no list. before creating")
		const filter = {_id : currProp};
		const updateDocument = {
			$set:{
				LL_list : []
			}
		};
		console.log("porp: no list. after defining update doc")
		const result = await propCollection.updateOne(filter, updateDocument);
		// res.json(result)
		console.log("no list. after creating")
	}
	else{
		LLList = properties[0].LL_list
		console.log("PROP OF 0" + JSON.stringify(properties[0]))
	}
	console.log("list made. before pushing prop id")
	await LLList.push(newLL)
	console.log("after pushing prop id")
	console.log("list "+LLList)
	console.log("yes email")
	

	const filter = {_id : currProp};
	const updateDocument = {
		$set:{
			LL_list : LLList
		}
	};
	const result = await propCollection.updateOne(filter, updateDocument);
}

app.get('/allProps', getAllProperties)
app.get('/properties/:id', getProperty)
app.get('/users/:email', getUser)
app.get('/userID/:id', getUserFromID)
app.get('/reviews/:propID', getRevFromProp)
app.get('/props/:address', getPropFromAddy)
app.get('/account/:userID', getRevFromUser)
app.get('/ownerSearch/:owner', getRevFromOwner)
app.get('/meep', ree)

app.post('/create/:email', jsonParser, createNewUser)
app.post('/update/:address', jsonParser, addFormAddy)
app.post('/postReview/:userID', jsonParser, postReview)
app.post('/LLsug/:propID', jsonParser, suggestLL)


app.listen(1995, function(){
	console.log("Server is running on port 1995.");
})