import React from "react";
import "./Home.css";
import 'react-dropdown/style.css';
import GoogleBtn from "../GoogleLogin/GoogleBtn"
const long = "data:image/png;base64,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"
        

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
        fetch(`http://localhost:1995/getImg/61b91d017a140ec3d83179ee`)
            .then(response => response.json())
            .then(result =>{
                // const temp = []
                // for(let i=0;i<result.length;i++){
                //     temp.push(result[0])
                // }
                console.log("EEEEEE "+ result[0].URL.length)
                this.setState({pics : result[0].URL})
            })
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
            window.location.href = "/"
        }
    }

    render(){
        return(
            <div>
                <div>
                <div>
                    {/* <img src={this.state.pics} alt="loading"/>
                    <p>{this.state.pics}</p> */}
                    {/* <img src={long} alt="weeee"/> */}
                    {/* <h3 onClick={this._handleAccountClick}>Account Info</h3> */}
                    <GoogleBtn _handleStateChange={this._handleStateChange} isLoggedIn={this.state.isLoggedIn}/>
                    <h1 class="bitDown">Landlord Lookup</h1>
                    <h3>A Tenant-Focused Web Application for Rental Transparency</h3>
                </div>
                <div>
                    <button onClick={this._handleResourceClick}>Tenant Resources!</button>
                    <button onClick={this._handleSearchClick}>Search for landlord & property info!</button>
                </div>
                </div>
                <div>
                    <div>
                            <h2>About This Site</h2>
                            <p>Landlord-tenant relationships are often exploitative (especially when the tenants are college students), so it is important 
                                to provide tenants with resources and accurate information about what to expect 
                                when renting. That's why I created Landlord Lookup! This web application contains
                                information about properties and their owners within the 90041 zipcode and is targeted towards students
                                of Occidental college.</p>
                            <p>Use Landlord Lookup to...</p>
                            <p>1. Background-check a property after finding a place you are interested in (using something 
                                like Zillow to find somewhere that meets your location, size, and ameneties preferences)</p>
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