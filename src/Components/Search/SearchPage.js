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
            safetyInfo : [],
            hasSearched : false
        }
        this._onSelect = this._onSelect.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleSearchClick = this._handleSearchClick.bind(this);
        this._showData = this._showData.bind(this);
        this._handleHomeCLick = this._handleHomeCLick.bind(this);
    }

    _handleChange(e){
        this.setState({
            inputValue: e.target.value
        })
    }

    _handleHomeCLick(){
        window.location.href = "/"
    }

    _onSelect(){}

    _showData(){
        const data = this.state.safetyInfo
        if(data.length !== 0){
            return(
                data.map(r=>{
                            return(
                                <h1>{r.case_type}</h1>
                                //<h1>helloooo</h1>
                            );
                        })
            )
        }
        else if(this.state.hasSearched){
            console.log('poop')
            return(
                <h2>No Results Found</h2>
            )
        }
        
    }

    _handleSearchClick(){
        const input = this.state.inputValue;
        this.setState({hasSearched : true})
        if(input !== ""){
            fetch(`https://data.lacity.org/resource/2uz8-3tj3.json?address_house_number=${input}`) // Building and Safety Code Enforcement Case
            .then(response => response.json())
            .then(result =>{
                console.log(result)
                this.setState({safetyInfo : result})
            })
            // return(
            //     this.state.safetyInfo.map(r=>{
            //         return(
            //             // <h1>{r.case_type}</h1>
            //             <h1>helloooo</h1>
            //         );
            //     })
            // )
        }
    }

    render(){
        return(
            <div>
                <h3 onClick={this._handleHomeCLick}>Home</h3>
                <div>
                    <h1>Landlord Search</h1>
                </div>
                <div>
                    <Dropdown options={this.state.options} onChange={this._onSelect}  placeholder="Select an option" />
                    <input type = "text" value = {this.state.inputValue} placeholder = "Search for landlord and property info!" onChange = {this._handleChange}></input>
                    <button onClick={this._handleSearchClick}> Search </button>
                    <button onClick={this._showData}>log data</button>
                </div>
                <div>
                    {this._showData()}
                </div>
            </div>
        )
    }
}

export default withRouter(SearchPage);