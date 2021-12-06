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
            userEmail : "",
            hasClicked : false,
            userID : ""
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
        // fetch(`http://localhost:1995/test/lessHour`)
        //     .then(response => response.json())
        //     .then(result =>{
        //         console.log(JSON.stringify(result))
        //     })
    }


    _handleStateChange(value){
        this.setState({ userEmail : value })
        console.log("value: " + value)
        console.log("type " + typeof value)
            
        fetch(`http://localhost:1995/create/${value}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
         })
            // .then(
            //     fetch(`http://localhost:1995/users/${value}`)
            //         .then(response => response.json())
            //         .then(result =>{
            //             console.log(JSON.stringify(result))
            //             this.setState({userID: result[0]._id})
            //     })
            // )
    }

    _handleBackClick(){
        window.location.href = "/search"
    }

    _handleReviewClick(){
        if(this.state.userEmail === "" && !this.state.hasClicked){
            this.setState({hasClicked : true})
        }
        else{
            fetch(`http://localhost:1995/users/${this.state.userEmail}`)
                    .then(response => response.json())
                    .then(result =>{
                        console.log(JSON.stringify(result))
                        this.setState({userID: result[0]._id})
                        console.log(this.state.userID)
                        window.location.href = `/review/${this.state.id + "-" +this.state.userID}`
                    })
            
        }
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