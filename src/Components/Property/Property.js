import React from "react";
import "./Property.css";

class Property extends React.Component {
    constructor(){
        super();
        //this._getChargingStatus = this._getChargingStatus.bind(this);
        this.state={
        }
    }


    // _getChargingStatus(){
    //     fetch(`http://localhost:5000/charging/${this.props.stationInfo._id}`)
    //     .then(response => response.json())
    //     .then(result =>{
    //         this.setState({resultList : result})
    //     })
    // }

    render(){
        return(
            <div>
                <h2>{this.props.converted_case_type}</h2>
                <h3>{this.props.date}</h3>
                <h4>{this.props.address}</h4>
            </div>
        )
    }
}


export default Property