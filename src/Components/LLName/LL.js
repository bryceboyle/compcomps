import React from "react";
import "./LL.css";
import {withRouter} from "react-router"
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

class LL extends React.Component {
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
                
            </div>
        )
    }
}

export default withRouter(LL);