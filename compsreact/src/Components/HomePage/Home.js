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
            userEmail : ""
        }
        this._onSelect = this._onSelect.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleResourceClick = this._handleResourceClick.bind(this);
        this._handleSearchClick = this._handleSearchClick.bind(this);
        this._handleStateChange = this._handleStateChange.bind(this);
    }
    
    _onSelect(){}

    _handleChange(e){
        this.setState({
            inputValue: e.target.value
        })
    }

    _handleResourceClick(){
        window.location.href = "/resources"
    }

    _handleSearchClick(){
        window.location.href = "/search"
    }

    _handleStateChange(value){
        this.setState({ userEmail : value })
        console.log("value: " + value)
    }

    render(){
        return(
            <div>
                <div>
                <div>
                    <GoogleBtn _handleStateChange={this._handleStateChange}/>
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

// WILL NEED WITHROUTER EQUIVALENT