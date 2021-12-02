import React from "react";
import { useParams } from "react-router-dom";
import "./AccountPage.css";

class AccountPage extends React.Component {


    constructor(){
        super();
        this.state={
            id : "",
            propertyObj : null
        }
        this._handleBackClick = this._handleBackClick.bind(this);
        // this._showResults = this._showResults.bind(this);
        // this._handleStateChange = this._handleStateChange.bind(this);
    }

    componentDidMount(){
        let uri_id = window.location.href
        uri_id = decodeURI(uri_id.substring(uri_id.lastIndexOf("/") + 1))
        this.setState({id:uri_id})

        fetch(`http://localhost:1995/properties/${uri_id}`)
            .then(response => response.json())
            .then(result =>{
                console.log(JSON.stringify(result))
                this.setState({propertyObj:result})
            })
    }

    _handleBackClick(){
        window.location.href = "/search"
    }


    render(){
        return(
            <div>
                <button onClick={this._handleBackClick}> back </button> 
                <h1>{JSON.stringify(this.state.propertyObj)}</h1>
            </div>
        )
    }
}

export default AccountPage