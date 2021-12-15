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
                <h3 class="left" onClick={this._handleBackClick}> Back </h3>
                <h2 class="bitDown" id="resourceTitle">Resources</h2>
                <a href="https://www.tenantstogether.org/resources/housing-rights-center-los-angeles">
                    <h1 class="resources">Housing Rights Center of LA</h1></a><br/>
                <a href="https://latenantsunion.org/en/"><h1 class="resources">LA Tenants Union</h1></a><br/>
                <a href="https://housing.lacity.org"><h1 class="resources">LA Housing Department</h1></a><br/>
                <a href="https://la.curbed.com/2017/4/19/15360412/renters-rights-los-angeles-california-eviction">
                    <h1 class="resources">List of renters' rights</h1></a><br/>
                <a href="https://www.nolo.com/legal-encyclopedia/overview-landlord-tenant-laws-california.html">
                    <h1 class="resources">California Landlord and Tenant laws</h1></a><br/>
                <a href="https://www.tenantsincommon.org/resources"><h1 class="resources">More resources</h1></a>
            </div>
        )
    }
}

export default TenResource;