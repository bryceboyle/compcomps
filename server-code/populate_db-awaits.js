const MongoClient = require('mongodb').MongoClient;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// import fetch from "node-fetch";
const fetch = require("node-fetch");

const uri = "mongodb+srv://bboyle:dbtimewoo123@cluster0.acl7h.mongodb.net/comps-db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

const app = express();
const jsonParser = bodyParser.json();
app.use(cors());

let database = null;
let collection = null;
let propInfoList = [];

async function connectDB(){
    console.log("before connect");
    await client.connect();
    console.log("after connect");
    // define database
    database = client.db("comps-db");

    // define collections
    collection = database.collection("property-info");
    let badEntry = false;

    let ainList = []
    let response = await fetch("https://data.lacounty.gov/resource/9trm-uz8i.json?situszip=90041&usecodedescchar1=Residential") // residential parcel info for 90041
    let result = await response.json()
    for (var j = 0; j < 15; j++){
        if(result[j] === undefined){
            console.log("sad undefined: index "+j);
        }
        ainList.push(result[j]["assessorid"])
    }
    console.log(ainList)

    for (var i = 0; i < ainList.length; i++){

        badEntry = false;
        console.log("ain result: "+ainList[i])
        let newObj = {};
        // adding AIN to property object
        newObj["ain"] = ainList[i];
        // adding reviewer (user) ID and rating fields to property object
        newObj["reviewerID"] = "";
        newObj["overallRating"] = "";
        console.log("ain:" + newObj["ain"])

            // *** getting property information from Estated ***
        response = await fetch(`https://apis.estated.com/v4/property?token=zYYAQpDilG79vjLEvZLDIUDrNtaKGB&fips=06037&apn=${newObj["ain"]}`)
        result = await response.json()
        console.log("estated data result street: " + result.data.address.street_name)
            // adding house number to property object
        newObj["houseNum"] = result.data.address.street_number
        // adding (pre) street direction to property object
        newObj["streetDirPre"] = result.data.address.street_pre_direction
        // adding street name to property object
        newObj["streetName"] = result.data.address.street_name
        // adding street suffix to property object
        newObj["streetSfx"] = result.data.address.street_suffix
        // adding (post) street direction to property object
        newObj["streetDirPost"] = result.data.address.street_post_direction
        // adding unit number to property object
        newObj["unitNum"] = result.data.address.unit_number
        // adding zipcode to property object
        newObj["zip"] = result.data.address.zip_code
        // adding quality?? to property object
        newObj["quality"] = result.data.structure.quality
        // adding owner(s) to property object
        newObj["owner"] = result.data.owner.name

        response = await fetch(`https://data.lacity.org/resource/2uz8-3tj3.json?address_house_number=${newObj["houseNum"]}&address_street_name=${newObj["streetName"]}&address_street_suffix=${newObj["streetSfx"]}&address_zip=${newObj["zip"]}`)
        result = await response.json()
        console.log("code enf result: " + JSON.stringify(result))
        if (JSON.stringify(result) === "[]"){
            // meep do some auto correcty bits and fetch a different thing
            console.log("(case) NONE or address trouble. ain: " + newObj["ain"])
            // console.log("result is: " + result + ".")
            // newObj["caseNum"] = "NO CASE NUM"
        }
        else if (result.length > 1){
            console.log("(case) heck theres more than one. just taking first 5ish")
            let len = result.length;
            let permitList = [];
            if (result.length > 5){
               len = 5;
            }
            for(let i = 0; i < len; i++){
            // console.log(result[i].case_number + " ")
                let tempObj = {};
                tempObj["caseNum"] = result[i].case_number
                tempObj["caseType"] = result[i].case_type
                tempObj["uglyCaseDate"] = result[i].date_case_generated
                permitList.push(tempObj);
            }
        newObj["permits"] = permitList
            
        }
        else{
            let permitList = [];
            let tempObj = {};
            tempObj["caseNum"] = result.case_number
            tempObj["caseType"] = result.case_type
            tempObj["uglyCaseDate"] = result.date_case_generated
            permitList.push(tempObj);
            newObj["codeEnfCases"] = permitList
        }
        response = await fetch(`https://data.lacity.org/resource/nbyu-2ha9.json?address_start=${newObj["houseNum"]}&street_name=${newObj["streetName"]}&street_suffix=${newObj["streetSfx"]}&zip_code=${newObj["zip"]}`)
        result = await response.json()
        // console.log("building result: " + JSON.stringify(result))
        if (JSON.stringify(result) === "[]"){
            // meep do some auto correcty bits and fetch a different thing
            console.log("(build) NONE or address trouble. ain: " + newObj["ain"])
            // console.log("result is: " + result + ".")
            // newObj["workDesc"] = "MEEP NONE"
        }
        else if (result.length > 1){
            console.log("(build) heck theres more than one. just taking first 5ish")
            let len = result.length;
            let permitList = [];
            if (result.length > 5){
              len = 5;
            }
            for(let i = 0; i < len; i++){
                let tempObj = {};
                tempObj["permitNum"] = result[i].pcis_permit
                tempObj["workDesc"] = result[i].work_description
                tempObj["permitType"] = result[i].permit_type
                tempObj["issueDate"] = result[i].issue_date
                tempObj["statusDate"] = result[i].status_date
                tempObj["contractorName"] = result[i].contractors_business_name
                permitList.push(tempObj);
            }
            newObj["permits"] = permitList
        }
        else{
            let permitList = [];
            let tempObj = {};
            tempObj["permitNum"] = result.pcis_permit
            tempObj["workDesc"] = result.work_description
            tempObj["permitType"] = result.permit_type
            tempObj["issueDate"] = result.issue_date
            tempObj["statusDate"] = result.status_date
            tempObj["contractorName"] = result.contractors_business_name
            permitList.push(tempObj);
            newObj["permits"] = permitList
        }
        propInfoList.push(newObj);
        
        insertStuff(newObj)
        console.log("new obj " + JSON.stringify(newObj))
        
        
    }
        // console.log("proplist: " + propInfoList[0]["workDesc"] + " " + propInfoList[0]["caseNum"])
        // insertStuff(propInfoList)
    console.log("after the loop")

        // if(true){
        // 	while(propInfoList.length === 0 || propInfoList[0]["workDesc"]===undefined){
        // 		// console.log("in while")
        // 	}
        // 	console.log("AFTER")
        // 	// console.log("proplist: " + propInfoList[0]["workDesc"] + " " + propInfoList[0]["caseNum"])
        // }

}


// const temp = await collection.insertMany(propInfoList);
// console.log(temp.insertedCount);



async function insertStuff(data){
    const temp = await collection.insertOne(data);
    console.log("INSERTING");
}

connectDB();
client.close();

// NEXT STEPS: find a better way to get from estated api to other 2 govt apis because
// just using some address information doesn't get accurate results
// also using book-page-parcel from building works sometimes. zipcodes are off
// also there are multiple objects w same ain in parcel data... so need
// to check for repeats before fetching other stuff. but now that there's
// no list i dunno what to 