import React from "react";
import "./PropertyPage.css";
import GoogleBtn from "../GoogleLogin/GoogleBtn"
import Review from "../Review/Review"

// const Photos = require('googlephotos');
// const CLIENT_ID = "803809234110-kk791i6j59kquo46snha5ocjdr8p6m1i.apps.googleusercontent.com"
// const photos = new Photos(CLIENT_ID);



class PropertyPage extends React.Component {


    constructor(){
        super();
        this.state={
            id : "",
            propertyObj : null,
            formAdd : "",
            userEmail : "",
            hasClicked : false,
            userID : "",
            owner: "",
            quality: "",
            needLogin : false,
            reviewList : [],
            isLoggedIn : false,
            LLlist : [],
            permits : [],
            newDate : "",
            pics : []
        }
        this._handleBackClick = this._handleBackClick.bind(this);
        this._handleStateChange = this._handleStateChange.bind(this);
        this._handleReviewClick = this._handleReviewClick.bind(this);
        this._showData = this._showData.bind(this);
        this._showPermits = this._showPermits.bind(this);
        this._convertTimestamp = this._convertTimestamp.bind(this);
    }

    componentDidMount(){
        let uri_id = ""
        let uri = window.location.href
        let uri_user = ""
        if(uri.lastIndexOf("-") === -1){
            uri_id = decodeURI(uri.substring(uri.lastIndexOf("/") + 1))
        }
        else{
            uri_id = decodeURI(uri.substring(uri.lastIndexOf("/") + 1, uri.lastIndexOf("-")))
            uri_user = decodeURI(uri.substring(uri.lastIndexOf("-") + 1))
            this.setState({isLoggedIn:true, needLogin:false, userID:uri_user})
            console.log("uuuuser id: " + uri_user)
        }
        this.setState({id:uri_id})
        fetch(`http://localhost:1995/properties/${uri_id}`)
            .then(response => response.json())
            .then(result =>{
                console.log(JSON.stringify(result))
                this.setState({propertyObj:result, formAdd:result[0].formattedAddress, owner:result[0].owner, quality:result[0].quality, LLlist:result[0].LL_list, permits:result[0].permits})
            })
        fetch(`http://localhost:1995/reviews/${uri_id}`)
            .then(response => response.json())
            .then(result =>{
                console.log("TYYYPPPEE "+typeof result)
                console.log("reviews "+JSON.stringify(result))
                console.log(result.length)
                this.setState({reviewList : result})
            })
        // fetch(`https://photoslibrary.googleapis.com/v1/mediaItems/6JUBakhrM66ucxGg7`)
        //     .then(response => response.json())
        //     .then(result =>{
        //         console.log("result "+JSON.stringify(result))
        //     })

            
        // fetch(`http://localhost:1995/test/lessHour`)
        //     .then(response => response.json())
        //     .then(result =>{
        //         console.log(JSON.stringify(result))
        //     })
    }

    _convertTimestamp(timestamp){
        const date_only = timestamp.slice(0,10)
        const month = date_only.slice(5,7)
        const day = date_only.slice(8,10)
        const year = date_only.slice(0,4)
        const converted_date = month + "/" + day + "/" + year
        return(converted_date)
    }

    _showPermits(){
        if(this.state.permits !== [] && this.state.permits !== undefined){
            return(
                this.state.permits.map(r=>{
                    if(r.permitNum !== null){
                        if(r.workDesc !== null){
                            if(r.timestamp !== null && r.timestamp !== "")
                            return(
                                <div>
                                    <h3>permit issue date: {this._convertTimestamp(r.issueDate)}</h3>
                                    <h3>permit type: {r.permitType}</h3>
                                    <h3>description: {r.workDesc}</h3>
                                    
                                </div>
                            );
                        }
                        else{
                            return(
                                <div>
                                    <h3>permit issue date: {this._convertTimestamp(r.issueDate)}</h3>
                                    <h3>permit type: {r.permitType}</h3>
                                </div>
                            );
                        }
                    }
                    return(
                        ""
                    );
                }))
        }
        
            return(
                ""
            );
        
    }

    _showData(){
        if(this.state.reviewList.length !== 0){
            return(
                this.state.reviewList.map(r=>{
                    
                    return(
                        <div>
                            <Review review_object={r} type="all"/>                    
                        </div>
                    );
                }))
        }
        else{
            return(
                <h2>no reviews</h2>
            )
        }
    }



    _handleStateChange(value){
        this.setState({ userEmail : value, needLogin : false, isLoggedIn : true})
        console.log("value: " + value)
        console.log("type " + typeof value)
            
        fetch(`http://localhost:1995/create/${value}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
         })
            .then(
                fetch(`http://localhost:1995/users/${value}`)
                    .then(response => response.json())
                    .then(result =>{
                        console.log("reesultlt " + JSON.stringify(result))
                        this.setState({userID: result[0]._id})
                })
            )
    }

    _handleBackClick(){
        if(this.state.userID === ""){
            window.location.href = "/search"
        }
        else{
            window.location.href = "/search/" + this.state.userID 
        }
        
    }

    _handleReviewClick(){
        if(this.state.userEmail === "" && this.state.userID === ""){
            this.setState({needLogin : true})
        }
        else{
            if(this.state.userEmail === ""){
                window.location.href = `/review/${this.state.id + "-" +this.state.userID}`
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
    }

    render(){
        return(
            <div>
                <h3 class="left" onClick={this._handleBackClick}> Back </h3>
                <GoogleBtn _handleStateChange={this._handleStateChange} isLoggedIn={this.state.isLoggedIn}/>
                {/* <h1>{JSON.stringify(this.state.propertyObj)}</h1> */}
                <div class="propTop">
                <h2>{this.state.formAdd}</h2>
                <h3>Owner(s): {this.state.owner}</h3>
                {(this.state.LLlist !== undefined)?
                    (this.state.LLlist.length > 1)?
                        <div>
                            <h3>most recently suggested Landlord name(s): {this.state.LLlist[0]}</h3>
                            <h3>other suggested names: {this.state.LLlist.slice(1).join(", ")}</h3>
                        </div>
                    :(this.state.LLlist[0]!==undefined)?
                    <div>
                        <h3>most recently suggested Landlord name(s): {this.state.LLlist[0]}</h3>
                    </div>
                    :""
                : ""}
                {this._showPermits()}                       
                <button onClick={this._handleReviewClick}> submit a review </button>
                {(this.state.needLogin)?
                    <div>You must log in to write a review.</div>
                    : ""
                }
                <h2>Reviews:</h2>
                </div>
                <div>
                    {this._showData()}
                </div>
            </div>
        )
    }
}

export default PropertyPage