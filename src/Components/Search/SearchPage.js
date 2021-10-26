import React from "react";
import "./SearchPage.css";
import {withRouter} from "react-router"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class SearchPage extends React.Component {
    constructor(){
        super();
        this.state={
            options : ['Name', 'Address'],
            //defaultOption : options[0],
            inputValue : "",    // just house number for now
            SafetyInfo : undefined
        }
        this._onSelect = this._onSelect.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleSearchClick = this._handleSearchClick.bind(this);
        this._showData = this._showData.bind(this);
    }
    

    _onSelect(){}

    _showData(){
        fetch('https://data.lacity.org/resource/2uz8-3tj3.json?address_zip=90042') // Building and Safety Code Enforcement Case
        .then(response => response.json())
        .then(result =>{
            console.log(result)
        })
    }

    _handleChange(e){
        this.setState({
            inputValue: e.target.value
        })
    }

    _handleSearchClick(){}

    render(){
        return(
            <div>
                <div>
                <div>
                    <h1>Landlord Search</h1>
                </div>
                <div>
                    <Dropdown options={this.state.options} onChange={this._onSelect}  placeholder="Select an option" />
                    <input type = "text" value = {this.state.inputValue} placeholder = "Search for landlord and property info!" onChange = {this._handleChange}></input>
                    <button onClick={this._handleSearchClick}> Search </button>
                    <button onClick={this._showData}>log data</button>
                </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchPage);