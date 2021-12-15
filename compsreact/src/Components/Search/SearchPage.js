import React from "react";
import "./SearchPage.css";
import 'react-dropdown/style.css';
import Property from "../Property/Property"
import GoogleBtn from "../GoogleLogin/GoogleBtn"

class SearchPage extends React.Component {
    constructor(){
        super();
        this.state={
            options : ['Name', 'Address'],
            selected : "addy",
            inputValue : "",
            displayedList : [],
            hasSearched : false,
            case_code_dict : {"CNAP" : "Citywide Nuisance Abatement Program",  "NAR": "Nuisance Abatement Revocation", "NOID" : "Notice of Intent to Demolish",
            "PACE" : "Pro-Active Code Enforcement", "VEIP" : "Vehicle Establishment Inspection Program", "BILLBOARDS" : "Billboards?",
            "SIGNS" : "signs?", "XXX" : "bro who knows", "GENERAL" : "general?", "CITATIONS" : "citations?"
            },
            id : "0",
            userEmail : "",
            userID : "",
            isLoggedIn : false,
            revPropDict : {},
            propOwnDict : {}
        }
        this._onSelect = this._onSelect.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleSearchClick = this._handleSearchClick.bind(this);
        this._showData = this._showData.bind(this);
        this._handleHomeCLick = this._handleHomeCLick.bind(this);
        this._handleSelectChange = this._handleSelectChange.bind(this);
        this._convertAddress = this._convertAddress.bind(this);
        this._handleStateChange = this._handleStateChange.bind(this);
        this._getFormAddy = this._getFormAddy.bind(this);
        this._frickle = this._frickle.bind(this);
        this._getPropURI = this._getPropURI.bind(this);
        this._formatSelect = this._formatSelect.bind(this);
    }

    componentDidMount(){
        let uri = window.location.href
        let uri_user = ""
        if(uri.substring(uri.lastIndexOf("/") + 1)=== "search"){
            console.log("not logged in")
        }
        else{
            uri_user = decodeURI(uri.substring(uri.lastIndexOf("/") + 1))
            this.setState({isLoggedIn:true, userID:uri_user})
            console.log("uuuuser id: " + uri_user)
        }
    }

    _handleChange(e){
        this.setState({
            inputValue: e.target.value,
            //selected : e.target.value
        })
    }
    _handleSelectChange(e){
        this.setState({
            displayedList: [],
            hasSearched : false,
            selected: e.target.value,
        })
    }

    _handleStateChange(value){
        // bro why does this next line work if this is called for both login and logout
        this.setState({ userEmail : value, isLoggedIn : true})
        console.log("value: " + value)
        console.log("type " + typeof value)
        if(value !== ""){
            fetch(`http://localhost:1995/create/${value}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
         })
            .then(
                fetch(`http://localhost:1995/users/${value}`)
                    .then(response => response.json())
                    .then(result =>{
                        console.log("reesultlt " + JSON.stringify(result))
                        this.setState({userID: result[0]._id})
                })
            )
        }
        else{
            window.location.href = "/search"
        }
    }

    _handleHomeCLick(){
        window.location.href = "/" + this.state.userID 
    }

    _onSelect(){
        // console.log(this.state.selected)
        console.log('selecting woo')
    }

    _convertTimestamp(timestamp){
        const date_only = '20' + timestamp.slice(2,10)
        const month = date_only.slice(5,7)
        const day = date_only.slice(8,10)
        const year = date_only.slice(0,4)
        const converted_date = month + "/" + day + "/" + year
        return(converted_date)
    }

    _convertAddress(house_num, num_frac, street_dir, street_name, street_sufx, sufx_dir, zip){ // FIXME unused
        const addy = house_num + num_frac + " " + street_dir + " " + street_name + " " + street_sufx + " " + sufx_dir + " " + zip
        return(addy)
    }

    _getPropURI(id){
        let newURI = "/property/" + id
        if(this.state.isLoggedIn){
            newURI += "-"+this.state.userID
        }
        return newURI
    }

    _getFormAddy(id){ //FIXME unused??
        console.log("id "+id)
        let temp = "frackle"
        fetch(`http://localhost:1995/properties/${id}`)
            .then(response => response.json())
            .then(result =>{
                console.log("res: "+ JSON.stringify(result))
                if(result.length > 0){
                    console.log("addd: "+result[0].formattedAddress)
                    temp = result[0].formattedAddress
                    this._frickle(temp)
                }
                else{
                    console.log("not found")
                    temp = "-1"
                }                
            })
        
    }

    _frickle(thing){ //FIXME unused??
        console.log("im a thing "+thing)
        return thing
    }

    _showData(){
        if(this.state.hasSearched){
            if(this.state.selected === 'addy'){
                const data = this.state.displayedList
                console.log(data)
                if(data.length !== 0){
                    return(
                        data.map(r=>{
                                    return(
                                        <div>
                                            <Property whole_object={r} id={r._id} userID={this.state.userID}/>
                                        </div>
                                    );
                        }))
                }
                else{
                    return(
                        <h2>No Results Found</h2>
                    )
                }
            }
            else{
                const data = this.state.displayedList
                // console.log(data)
                if(data.length !== 0){
                    return(
                        data.map(r=>{                        
                            return(
                                <div class="prop">
                                    <h2>Owner(s): {this.state.propOwnDict[r._id]}</h2>
                                    <a href={this._getPropURI(r.propID)}>{this.state.revPropDict[r._id]}</a>
                                    <h3>★ rating: {r.LLrating}</h3>
                                    <h3>Response time: {this._formatSelect(r.rTime)}</h3>
                                    {(r.LLRev !== "")?
                                    <h3>Review: {r.LLRev}</h3>
                                    : ""
                                    }
                                                                        
                                </div>
                            );
                                    
                        }))
                }
                else{
                    return(
                        <h2>No Results Found</h2>
                    )
                }
            }
        }
    }

    _formatSelect(input){
        if(input === "lessHour"){
            return "Less than an hour"
        }
        if(input === "fewHours"){
            return "A few hours"
        }
        if(input === "sameDay"){
            return "Within the same day"
        }
        if(input === "fewDays"){
            return "A few days"
        }
        if(input === "more"){
            return "More than a few days"
        }
        return ""
    }

    _handleSearchClick(){
        let input = this.state.inputValue;
        this.setState({hasSearched : true})
        if(this.state.selected === "addy"){
            if(input !== ""){
                input = input.toUpperCase();
                console.log("input: "+input);
                if(input.lastIndexOf("BOULEVARD") !== -1){
                    input = input.replace("BOULEVARD", "BLVD")
                }
                if(input.lastIndexOf("AVENUE") !== -1){
                    input = input.replace("AVENUE", "AVE")
                }
                if(input.lastIndexOf("STREET") !== -1){
                    input = input.replace("STREET", "ST")
                }
                if(input.lastIndexOf("COURT") !== -1){
                    input = input.replace("COURT", "CT")
                }
                if(input.lastIndexOf("PLACE") !== -1){
                    input = input.replace("PLACE", "PL")
                }
                if(input.lastIndexOf("DRIVE") !== -1){
                    input = input.replace("DRIVE", "DR")
                }
                if(input.lastIndexOf("LANE") !== -1){
                    input = input.replace("LANE", "LN")
                }
                console.log("converted: "+input)
    
                
                fetch(`http://localhost:1995/props/${input}`)
                .then(response => response.json())
                .then(result =>{
                    console.log("input "+input)
                    // console.log(result)
                    console.log(this.state.selected)
                    this.setState({displayedList : result})
                })
            }
            else{
                fetch("http://localhost:1995/allProps")
                .then(response => response.json())
                .then(result =>{
                    // console.log(result)
                    console.log(this.state.selected)
                    this.setState({displayedList : result})
                })
            }
        }
        if(this.state.selected === "name"){
            if(input !== ""){
                fetch(`http://localhost:1995/ownerSearch/${input}`)
                    .then(response => response.json())
                    .then(result =>{
                        // console.log("1st res "+JSON.stringify(result))
                        console.log(this.state.selected)
                        this.setState({displayedList : result})
                        for(let k=0;k<result.length;k++){
                            fetch(`http://localhost:1995/properties/${result[k].propID}`)
                                .then(response => response.json())
                                .then(result2 =>{
                                    // console.log("2nd res "+JSON.stringify(result2))
                                    console.log("formAddy "+result2[0].formattedAddress)
                                    let tempObj = this.state.revPropDict
                                    tempObj[result[k]._id] = result2[0].formattedAddress
                                    let tempObj2 = this.state.propOwnDict
                                    tempObj2[result[k]._id] = result2[0].owner
                                    console.log("reererrecc "+JSON.stringify(tempObj))
                                    this.setState({revPropDict:tempObj, propOwnDict:tempObj2})
                                })
                        }
                    })
            }
            else{

            }
        }
        
    }

    render(){
        return(
            <div>
                <h3 class="left" id="stick"onClick={this._handleHomeCLick}>Home</h3>
                <GoogleBtn _handleStateChange={this._handleStateChange} isLoggedIn={this.state.isLoggedIn}/>
                <div>
                    <h1 class="title">Landlord & Property Search</h1>
                </div>
                <div class="spaceBelow">
                    {(this.state.selected === "addy")?
                        <div><h4>Search for a landlord name or property address</h4> <h5>To leave a review, search for the property.</h5></div>
                        : <h4>Enter your property owner/landlord's name to see reviews of them</h4>
                    }
                    <div>
                        <select onChange={this._handleSelectChange}>
                            <option value="addy">Property Address</option>
                            <option value="name">Landlord Name</option>
                        </select>
                    </div>
                    <input type = "text" value = {this.state.inputValue} onChange = {this._handleChange}></input>
                    <button onClick={this._handleSearchClick}> Search </button>
                </div>
                
                <div class="centered" >
                    {this._showData()}
                </div>
            </div>
        )
    }
}

export default SearchPage;