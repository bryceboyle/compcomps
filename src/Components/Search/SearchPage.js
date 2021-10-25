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
            //defaultOption : options[0]
            inputValue : ""
        }
        this._onSelect = this._onSelect.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleResourceClick = this._handleResourceClick.bind(this);
        this._handleSearchClick = this._handleSearchClick.bind(this);
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
                    <button onClick={this._handleResourceClick}>Tenant Resources!</button>
                </div>
                </div>
                <div>
                    <div>
                            <h2>About Us</h2>
                            <p>??????</p>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withRouter(SearchPage);