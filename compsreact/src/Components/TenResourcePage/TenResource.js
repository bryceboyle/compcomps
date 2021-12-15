import React from "react";
import "./TenResource.css";

class TenResource extends React.Component {
    constructor(){
        super();
        this.state={
            userID : ""
        }
        this._handleBackClick = this._handleBackClick.bind(this);
    }

    componentDidMount(){
        let uri = window.location.href
        let uri_user = ""
        if(uri.substring(uri.lastIndexOf("/") + 1)=== "resources"){
            console.log("not logged in")
        }
        else{
            uri_user = decodeURI(uri.substring(uri.lastIndexOf("/") + 1))
            this.setState({userID:uri_user})
            console.log("uuuuser id: " + uri_user)
        }
    }

    _handleBackClick(){
        window.location.href = "/" + this.state.userID 
    }

    render(){
        return(
            <div>
                <button onClick={this._handleBackClick}> Back </button>
                <h2>Resources</h2>
                <a href="https://www.tenantstogether.org/resources/housing-rights-center-los-angeles">Housing Rights Center of LA</a><br/>
                <a href="https://latenantsunion.org/en/">LA Tenants Union</a><br/>
                <a href="https://housing.lacity.org">LA Housing Department</a><br/>
                <a href="https://la.curbed.com/2017/4/19/15360412/renters-rights-los-angeles-california-eviction">List of renters' rights</a><br/>
                <a href="https://www.nolo.com/legal-encyclopedia/overview-landlord-tenant-laws-california.html">California Landlord and Tenant laws</a>
                <a href="https://www.tenantsincommon.org/resources">More resources</a>
            </div>
        )
    }
}

export default TenResource;