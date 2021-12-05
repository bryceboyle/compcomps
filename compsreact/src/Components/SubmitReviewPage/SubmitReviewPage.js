import React from "react";
import "./SubmitReviewPage.css";

class SubmitReviewPage extends React.Component {
    constructor(){
        super();
        this.state={
            propertyObj : null,
            userEmail : "",
            formAdd : "",
            owner : "",
            id : "",
            LLname : "",
            selected : "select",
            generalLLReview : "",
            generalPropReview : "",
            rentInput : "",
            pictureLink : "",
            hasSubmitted : false,
            isValid : false
        }
        this._handleCancelClick = this._handleCancelClick.bind(this);
        this._handleSubmitClick = this._handleSubmitClick.bind(this);
        this._handleSelectChange = this._handleSelectChange.bind(this);
        this._handleGeneralLLRevChange = this._handleGeneralLLRevChange.bind(this);
        this._handleLLChange = this._handleLLChange.bind(this);
        this._handleRentChange = this._handleRentChange.bind(this);
        this._handleGeneralPropRevChange = this._handleGeneralPropRevChange.bind(this);
        this._getReviewResponse = this._getReviewResponse.bind(this);
        this._handlePictureChange = this._handlePictureChange.bind(this);
    }

    _handleRentChange(e){
        this.setState({
            rentInput: e.target.value
        })
    }

    _handlePictureChange(e){
        this.setState({
            pictureLink: e.target.value
        })
    }

    _handleGeneralPropRevChange(e){
        this.setState({
            generalPropReview: e.target.value
        })
    }

    _handleLLChange(e){
        this.setState({
            LLname: e.target.value
        })
    }

    _handleGeneralLLRevChange(e){
        this.setState({
            generalLLReview: e.target.value
        })
    }

    _handleSelectChange(e){
        this.setState({
            selected: e.target.value,
        })
    }

    componentDidMount(){
        let uri_id = window.location.href
        uri_id = decodeURI(uri_id.substring(uri_id.lastIndexOf("/") + 1))
        fetch(`http://localhost:1995/properties/${uri_id}`)
            .then(response => response.json())
            .then(result =>{
                console.log(JSON.stringify(result))
                this.setState({propertyObj:result, formAdd:result[0].formattedAddress, owner:result[0].owner})
            })
    }

    _getReviewResponse(){
        if(this.state.selected === "select"){
            return "Please select a landlord response time"
        }
        if(this.state.rentInput === ""){
            return "Please enter a rent price"
        }
        if(!Number.isInteger(parseInt(this.state.rentInput))){
            return "Rent price can only be a whole number"
        }
        if(!this.state.isValid){
            this.setState({isValid : true});
        }
        
        return ""
    }

    _handleCancelClick(){
        window.location.href = `/search/${this.state.propertyObj[0]._id}`
    }
    
    _handleSubmitClick(){
        console.log(typeof this.state.rentInput)
        this.setState({hasSubmitted:true});
        // post to db!
        if(this.state.isValid){
                console.log("response time: " + this.state.selected)
                console.log("LL: " + this.state.LLname)
                console.log("LL rev: " + this.state.generalLLReview)
                console.log("rent: " + this.state.rentInput)
                console.log("prop rev: " + this.state.generalPropReview)
                window.location.href = `/search/${this.state.propertyObj[0]._id}`
        }
        else{
            console.log("something is hecked")
        }              
    }


    render(){
        return(
            <div>
                <h2>Submit a review for {this.state.formAdd}</h2>
                <div>On average, how long does it take for your landlord to resopnd to your calls or messages?</div>
                <div>
                    <select onChange={this._handleSelectChange}>
                        {/* make sure that they can't submit if "select" is selected */}
                        <option value="select">select</option>
                        <option value="lessHour">Less than an hour</option>
                        <option value="fewHours">A few hours</option>
                        <option value="sameDay">Within the same day</option>
                        <option value="fewDays">A few days</option>
                        <option value="more">More than a few days</option>
                    </select>
                </div>
                <div>If the property's owner {this.state.owner} is not your landlord or leasing manager, please enter their name below. If you have multiple landlords, enter their names separated by commas.</div>
                <div><input type = "text" value = {this.state.LLname} placeholder = "" onChange = {this._handleLLChange}></input></div>
                <div>Enter any other landlord-specific information you want to include below!</div>
                <div><input type = "text" value = {this.state.generalLLReview} placeholder = "" onChange = {this._handleGeneralLLRevChange}></input></div>
                <div>--------------------</div>
                <div>How much do you pay in monthly rent?</div>
                <div>$<input type = "text" value = {this.state.rentInput} placeholder = "" onChange = {this._handleRentChange}></input></div>
                <div>If you want to include pictures, please enter google drive?? links separated by commas</div>
                <div><input type = "text" value = {this.state.pictureLink} placeholder = "" onChange = {this._handlePictureChange}></input></div>
                <div>Enter any other property-specific information you want to include below!</div>
                <div><input type = "text" value = {this.state.generalPropReview} placeholder = "" onChange = {this._handleGeneralPropRevChange}></input></div>
                <div>
                    <button onClick={this._handleSubmitClick}> submit </button>
                    <button onClick={this._handleCancelClick}> cancel </button>
                </div>
                {(this.state.hasSubmitted)?
                    <div>{this._getReviewResponse()}</div>
                : ""
                }   
            </div>
        )
    }
}

export default SubmitReviewPage