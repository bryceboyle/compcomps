import React from "react";
import "./PropertyPage.css";
import GoogleBtn from "../GoogleLogin/GoogleBtn"
import Review from "../Review/Review"

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
            reviewList : []
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
                this.setState({propertyObj:result, formAdd:result[0].formattedAddress, owner:result[0].owner, quality:result[0].quality})
            })
        fetch(`http://localhost:1995/reviews/${uri_id}`)
            .then(response => response.json())
            .then(result =>{
                console.log("reviews "+JSON.stringify(result))
                console.log(result.length)
                this.setState({reviewList : result})
            })
        // fetch(`http://localhost:1995/test/lessHour`)
        //     .then(response => response.json())
        //     .then(result =>{
        //         console.log(JSON.stringify(result))
        //     })
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
        this.setState({ userEmail : value, needLogin : false})
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
        if(this.state.userEmail === ""){
            this.setState({needLogin : true})
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
                {/* <h1>{JSON.stringify(this.state.propertyObj)}</h1> */}
                <h2>address: {this.state.formAdd}</h2>
                <h3>owner: {this.state.owner}</h3>
                <h3>quality**: {this.state.quality}</h3>
                <button onClick={this._handleReviewClick}> submit a review </button>
                {(this.state.needLogin)?
                    <div>You must log in to write a review.</div>
                    : ""
                }
                <div>
                    {this._showData()}
                </div>
            </div>
        )
    }
}

export default PropertyPage