import React from "react";
import "./AccountPage.css";

class AccountPage extends React.Component {


    constructor(){
        super();
        this.state={
            id : "",
            propertyObj : null
        }
        this._handleBackClick = this._handleBackClick.bind(this);
    }

    componentDidMount(){
        let uri_id = window.location.href
        uri_id = decodeURI(uri_id.substring(uri_id.lastIndexOf("/") + 1))
        this.setState({id:uri_id})

        fetch(`http://localhost:1995/account/${uri_id}`)
            .then(response => response.json())
            .then(result =>{
                console.log("result "+JSON.stringify(result))
                this.setState({propertyObj:result})
            })
    }

    _handleBackClick(){
        window.location.href = "/"
    }


    render(){
        return(
            <div>
                <button onClick={this._handleBackClick}> back </button> 
                <h4>{JSON.stringify(this.state.propertyObj)}</h4>
            </div>
        )
    }
}

export default AccountPage