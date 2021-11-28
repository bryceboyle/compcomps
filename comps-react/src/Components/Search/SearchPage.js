import React from "react";
import "./SearchPage.css";
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
            heckList : [],
            hasSearched : false,
            case_code_dict : {"CNAP" : "Citywide Nuisance Abatement Program",  "NAR": "Nuisance Abatement Revocation", "NOID" : "Notice of Intent to Demolish",
            "PACE" : "Pro-Active Code Enforcement", "VEIP" : "Vehicle Establishment Inspection Program", "BILLBOARDS" : "Billboards?",
            "SIGNS" : "signs?", "XXX" : "bro who knows", "GENERAL" : "general?", "CITATIONS" : "citations?"
            },
            id : "0"
        }
        this._onSelect = this._onSelect.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleSearchClick = this._handleSearchClick.bind(this);
        this._showData = this._showData.bind(this);
        this._handleHomeCLick = this._handleHomeCLick.bind(this);
        this._handleSelectChange = this._handleSelectChange.bind(this);
        this._convertAddress = this._convertAddress.bind(this);
        this._heck = this._heck.bind(this)
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
                const data = this.state.safetyInfo
                console.log(data)
                if(data.length !== 0){
                    return(
                        data.map(r=>{
                                    return(
                                        <div>
                                            {/* <h1>{r.case_type} {this._convertTimestamp(r.date_case_generated)}</h1> */}
                                            {/* <Property case_object={r} date={this._convertTimestamp(r.date_case_generated)}
                                            address={this._convertAddress(r.address_house_number, r.address_house_fraction_number, r.address_street_direction, r.address_street_name, r.ddress_street_suffix, r.address_street_suffix_direction, r.address_zip)}
                                            converted_case_type={this.state.case_code_dict[r.case_type]}/> */}
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
                return(
                    <h2>oops sorry i havent made this yet</h2>
                )
            }
        }
        
        
    }

    _heck(){
        fetch('http://localhost:1995/allProps/')
        .then(response => response.json())
        .then(result =>{
            console.log(result)
            // this.setState({
            //     id : result._id
            // })
        })
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
        

        // const input = this.state.inputValue;
        // this.setState({hasSearched : true})
        // if(input !== ""){ // FIXME 400 ERROR WHEN SEARCHING "A&I" FOR CASE TYPE
        //     fetch(`https://data.lacity.org/resource/2uz8-3tj3.json`) // Building and Safety Code Enforcement Case
        //     .then(response => response.json())
        //     .then(result =>{
        //         console.log(result)
        //         console.log(this.state.selected)
        //         this.setState({safetyInfo : result})

        //         // ------------ hecked stuff
        //         const tempList = []
        //         console.log(Object.keys(this.state.case_code_dict))
        //         for(let i = 0; i < result.length; i++){
        //             if(Object.keys(this.state.case_code_dict).includes(result[i].case_type) === false && result[i].case_type !== "GENERAL"){
        //                 tempList.push(result[i])
        //             }
        //         }
        //         this.setState({heckList : tempList})
        //     })
            
        // }
        
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
                    <input type = "text" value = {this.state.inputValue} placeholder = "Search for property info!" onChange = {this._handleChange}></input>
                    <button onClick={this._handleSearchClick}> Search </button>
                    <button onClick={this._heck}> heck </button>
                    {/* <button onClick={this._showData}>log data</button> */}
                </div>
                <div>
                    {this._showData()}
                </div>
            </div>
        )
    }
}

export default SearchPage;
// WILL NEED WITHROUTER EQUIVALENT