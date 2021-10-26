import React from "react";
import "./SearchPage.css";
import {withRouter} from "react-router"
import 'react-dropdown/style.css';

class SearchPage extends React.Component {
    constructor(){
        super();
        this.state={
            options : ['Name', 'Address'],
            selected : "addy",
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
        this._handleSelectChange = this._handleSelectChange.bind(this);
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

    _handleHomeCLick(){
        window.location.href = "/"
    }

    _onSelect(){
        // console.log(this.state.selected)
        console.log('selecting woo')
    }

    _showData(){
        if(this.state.selected === 'addy'){
            const data = this.state.safetyInfo
            if(data.length !== 0){
                return(
                    data.map(r=>{
                                return(
                                    <h1>{r.case_type} {r.date_case_generated}-{r.date_case_closed}</h1>
                                    //<h1>helloooo</h1>
                                );
                            })
                )
            }
            else if(this.state.hasSearched){
                return(
                    <h2>No Results Found</h2>
                )
            }
        }
        else{
            return(
                <h2>oops sorry i havent made this yet</h2>
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
                console.log(this.state.selected)
                this.setState({safetyInfo : result})
            })
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
                    <div>
                        <select onChange={this._handleSelectChange}>
                            <option value="addy">Property Address</option>
                            <option value="name">Landlord Name</option>
                        </select>
                    </div>
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