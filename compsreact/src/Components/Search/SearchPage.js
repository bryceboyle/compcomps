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
            inputValue : "",    // just house number for now
            propertyList : [],
            heckList : [],
            hasHecked : false,
            hasSearched : false,
            case_code_dict : {"CNAP" : "Citywide Nuisance Abatement Program",  "NAR": "Nuisance Abatement Revocation", "NOID" : "Notice of Intent to Demolish",
            "PACE" : "Pro-Active Code Enforcement", "VEIP" : "Vehicle Establishment Inspection Program", "BILLBOARDS" : "Billboards?",
            "SIGNS" : "signs?", "XXX" : "bro who knows", "GENERAL" : "general?", "CITATIONS" : "citations?"
            },
            id : "0",
            userEmail : "",
            userID : "",
            isLoggedIn : false
        }
        this._onSelect = this._onSelect.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleSearchClick = this._handleSearchClick.bind(this);
        this._showData = this._showData.bind(this);
        this._handleHomeCLick = this._handleHomeCLick.bind(this);
        this._handleSelectChange = this._handleSelectChange.bind(this);
        this._convertAddress = this._convertAddress.bind(this);
        this._heck = this._heck.bind(this);
        this._handleStateChange = this._handleStateChange.bind(this);
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

    _convertAddress(house_num, num_frac, street_dir, street_name, street_sufx, sufx_dir, zip){ // FIXME A MILLIION SPACES IF INFO IS MISSIING
        const addy = house_num + num_frac + " " + street_dir + " " + street_name + " " + street_sufx + " " + sufx_dir + " " + zip
        return(addy)
    }

    _showData(){
        if(this.state.hasSearched){
            if(this.state.selected === 'addy'){
                const data = this.state.propertyList
                console.log(data)
                if(data.length !== 0){
                    return(
                        data.map(r=>{
                                    return(
                                        <div>
                                            {/* <h1>{r.case_type} {this._convertTimestamp(r.date_case_generated)}</h1> */}
                                            <Property whole_object={r} id={r._id}/>
                                            {/* <Property id={this.state.id}/> */}
                                            {/* <h1>this.state.id</h1> */}
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
                const data = this.state.propertyList
                console.log(data)
                if(data.length !== 0){
                    return(
                        data.map(r=>{
                                    return(
                                        <div>
                                            {/* <h1>{r.case_type} {this._convertTimestamp(r.date_case_generated)}</h1> */}
                                            <Property whole_object={r} id={r._id}/>
                                            {/* <Property id={this.state.id}/> */}
                                            {/* <h1>this.state.id</h1> */}
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

    _heck(){
        this.setState({hasHecked:true})
        fetch('http://localhost:1995/allProps/')
        .then(response => response.json())
        .then(result =>{
            this.setState({heckList:result})
        })
    }

    _showHeck(){
        if(this.state.hasHecked){
            const info = this.state.heckList
            return(
                info.map(r=>{
                            return(
                                <div>
                                    <Property whole_object={r} id={r._id}/>
                                </div>
                            );
                }))
        }
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
                    console.log(result)
                    console.log(this.state.selected)
                    this.setState({propertyList : result})
                })
            }
            else{
                fetch("http://localhost:1995/allProps")
                .then(response => response.json())
                .then(result =>{
                    console.log(result)
                    console.log(this.state.selected)
                    this.setState({propertyList : result})
                })
            }
        }
        // if(this.state.selected === "name"){
        //     if(input !== ""){

        //     }
        //     else{

        //     }
        // }
        
    }

    render(){
        return(
            <div>
                <h3 onClick={this._handleHomeCLick}>Home</h3>
                <GoogleBtn _handleStateChange={this._handleStateChange} isLoggedIn={this.state.isLoggedIn}/>
                <div>
                    <h1>Landlord Search</h1>
                </div>
                <div>
                    {(this.state.selected === "addy")?
                        <h4>enter an address in the form: street number street name zipcode</h4>
                        : <h4>enter the property owner/ landlord name</h4>
                    }
                    <div>
                        <select onChange={this._handleSelectChange}>
                            <option value="addy">Property Address</option>
                            <option value="name">Landlord Name</option>
                        </select>
                    </div>
                    <input type = "text" value = {this.state.inputValue} placeholder = "Search for property info!" onChange = {this._handleChange}></input>
                    <button onClick={this._handleSearchClick}> Search </button>
                    {/* <button onClick={this._heck}> heck </button> */}
                    {/* <button onClick={this._showData}>log data</button> */}
                </div>
                <div>
                    {/* {this._showData()} */}
                    {this._showData()}
                </div>
            </div>
        )
    }
}

export default SearchPage;