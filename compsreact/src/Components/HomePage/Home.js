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
            userID : ""
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
        window.location.href = "/resources"
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
                    <h3 onClick={this._handleAccountClick}>Account Info</h3>
                    <GoogleBtn _handleStateChange={this._handleStateChange} isLoggedIn={this.state.isLoggedIn}/>
                    <h1>Landlord Lookup</h1>
                    <h3>A Tenant-Focused Web Application for Rental Transparency</h3>
                </div>
                <div>
                    <button onClick={this._handleResourceClick}>Tenant Resources!</button>
                    <button onClick={this._handleSearchClick}>Search for landlord & property info!</button>
                </div>
                </div>
                <div>
                    <div>
                            <h2>About Us</h2>
                            <p>~~~~~</p>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Home;