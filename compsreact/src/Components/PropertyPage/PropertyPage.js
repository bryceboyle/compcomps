import React from "react";
import "./PropertyPage.css";
import GoogleBtn from "../GoogleLogin/GoogleBtn"

class PropertyPage extends React.Component {


    constructor(){
        super();
        this.state={
            id : "",
            propertyObj : null,
            formAdd : "",
            userEmail : ""
        }
        this._handleBackClick = this._handleBackClick.bind(this);
        this._handleStateChange = this._handleStateChange.bind(this);
        this._handleReviewClick = this._handleReviewClick.bind(this);
    }

    componentDidMount(){
        let uri_id = window.location.href
        uri_id = decodeURI(uri_id.substring(uri_id.lastIndexOf("/") + 1))
        this.setState({id:uri_id})
        fetch(`http://localhost:1995/properties/${uri_id}`)
            .then(response => response.json())
            .then(result =>{
                console.log(JSON.stringify(result))
                this.setState({propertyObj:result, formAdd:result[0].formattedAddress})
            })
    }


    _handleStateChange(value){
        this.setState({ userEmail : value })
        console.log("value: " + value)
    }

    _handleBackClick(){
        window.location.href = "/search"
    }

    _handleReviewClick(){
        window.location.href = `/review/${this.state.id}`
    }

    render(){
        return(
            <div>
                <button onClick={this._handleBackClick}> back </button>
                <GoogleBtn _handleStateChange={this._handleStateChange}/>
                <h1>{JSON.stringify(this.state.propertyObj)}</h1>
                <h2>address: {this.state.formAdd}</h2>
                <button onClick={this._handleReviewClick}> submit a review </button>
            </div>
        )
    }
}

export default PropertyPage