import React from "react";
import "./Property.css";

class Property extends React.Component {
    constructor(){
        super();
        this.state={
        }
    }

    _handleClick(){
        window.location.href = `/search/${this.propr.id}`
    }

    render(){
        return(
            <div>
                <h2>{this.props.converted_case_type}</h2>
                <h3>{this.props.date}</h3>
                <h4>{this.props.address}</h4>
                <button onClick={this._handleClick}> deeetailz </button>
            </div>
        )
    }
}


export default Property