import React from "react";
import "./Home.css";
import 'react-dropdown/style.css';
import GoogleBtn from "../GoogleLogin/GoogleBtn"       

class Home extends React.Component {
    constructor(){
        super();
        this.state={
            options : ['Name', 'Address'],
            //defaultOption : options[0]
            inputValue : "",
            userEmail : "",
            isLoggedIn : false,
            userID : "",
            pics : []
        }
        this._onSelect = this._onSelect.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleResourceClick = this._handleResourceClick.bind(this);
        this._handleSearchClick = this._handleSearchClick.bind(this);
        this._handleStateChange = this._handleStateChange.bind(this);
        this._handleAccountClick = this._handleAccountClick.bind(this);
    }
    
    componentDidMount(){
        
        let uri = window.location.href
        let uri_user = ""
        if(uri.lastIndexOf("/") === uri.length -1 || uri.lastIndexOf("/") === -1){
            console.log("not logged in")
        }
        else{
            uri_user = decodeURI(uri.substring(uri.lastIndexOf("/") + 1))
            this.setState({isLoggedIn:true, userID:uri_user})
            console.log("uuuuser id: " + uri_user)
        }
    }

    _onSelect(){}

    _handleChange(e){
        this.setState({
            inputValue: e.target.value
        })
    }

    _handleAccountClick(){
        window.location.href = "/account/61ae757a59f976f727bf03bf"
    }

    _handleResourceClick(){
        if(this.state.userID === ""){
            window.location.href = "/resources"
        }
        else{
            window.location.href = "/resources/"+this.state.userID
        }
    }

    _handleSearchClick(){
        if(this.state.userID === ""){
            window.location.href = "/search"
        }
        else{
            window.location.href = "/search/"+this.state.userID
        }
        
    }

    _handleStateChange(value){
        this.setState({ userEmail : value, isLoggedIn : true})
        console.log("value: " + value)
        console.log("type " + typeof value)
        if(value !== ""){
            fetch(`http://localhost:1995/create/${value}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
            })
            .then(result=>{
                fetch(`http://localhost:1995/users/${value}`)
                    .then(response => response.json())
                    .then(result =>{
                        console.log("reesultlt " + JSON.stringify(result))
                        this.setState({userID: result[0]._id})
                })
            }
                
            )
        }
        else{
            window.location.href = "/"
        }
    }

    render(){
        return(
            <div>
                <div>
                <div>
                    <GoogleBtn _handleStateChange={this._handleStateChange} isLoggedIn={this.state.isLoggedIn}/>
                    <h1 class="bitDown">Landlord Lookup</h1>
                    <h3>A Tenant-Focused Web Application for Rental Transparency</h3>
                </div>
                <div class="buttonContainer">
                    <button class="homeButtons" onClick={this._handleResourceClick}>Tenant Resources!</button>
                    <button class="homeButtons" onClick={this._handleSearchClick}>Search for landlord & property info!</button>
                </div>
                </div>
                <div>
                    <div class="about">
                        <h2>About This Site</h2>
                        <p class="aboutText">Landlord-tenant relationships are often exploitative (especially when the tenants are college students), so it is important 
                            to provide tenants with resources and accurate information about what to expect 
                            when renting. That's why I created Landlord Lookup! This web application contains
                            information about properties and their owners within the 90041 zipcode and is targeted towards students
                            of Occidental College.</p>
                    </div>
                    <div class="howToUse">
                        <h3>Use Landlord Lookup to...</h3>
                        <p>1. Background-check a property after finding a place you are interested in (using something 
                            like Zillow to find somewhere that meets your location, size, and amenities preferences)</p>
                        <p>2. Search through reviews of property owners and landlords</p>
                        <p>2. Write reviews of properties you've lived at and landlords you have had in the past
                            to provide future tenants with accurate rental information.
                        </p>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Home;