import React from "react";
import "./SubmitReviewPage.css";

class SubmitReviewPage extends React.Component {
    constructor(){
        super();
        this.state={
            propertyObj : null,
            userEmail : "",
            formAdd : "",
            id : ""
        }
        this._handleCancelClick = this._handleCancelClick.bind(this);
        this._handleSubmitClick = this._handleSubmitClick.bind(this);
    }

    componentDidMount(){
        let uri_id = window.location.href
        uri_id = decodeURI(uri_id.substring(uri_id.lastIndexOf("/") + 1))
        fetch(`http://localhost:1995/properties/${uri_id}`)
            .then(response => response.json())
            .then(result =>{
                console.log(JSON.stringify(result))
                this.setState({propertyObj:result, formAdd:result[0].formattedAddress})
            })
    }

    _handleCancelClick(){
        window.location.href = `/search/${this.state.propertyObj[0]._id}`
    }
    
    _handleSubmitClick(){
        // post to db!
    }


    render(){
        return(
            <div>
                <h2>Submit a review for {this.state.formAdd}</h2>
                <button onClick={this._handleSubmitClick}> submit </button>
                <button onClick={this._handleCancelClick}> cancel </button>
            </div>
        )
    }
}

export default SubmitReviewPage