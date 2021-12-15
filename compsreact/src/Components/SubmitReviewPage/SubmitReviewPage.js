import React from "react";
import "./SubmitReviewPage.css";
// import leak from "../../TestImages/janesLeakingDishwasher.png"

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
            isValid : false,
            userid : "",
            LLrating : "",
            propRating :"",
            image : "",
            source : "",
            file : null,
            dataURLs : [],
            uploadCount : 0
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
        this._handleLLRatingChange = this._handleLLRatingChange.bind(this);
        this._handlePropRatingChange = this._handlePropRatingChange.bind(this);
        this._changeURI = this._changeURI.bind(this);
        this._previewFile = this._previewFile.bind(this)
        this._preview2 = this._preview2.bind(this)
    }

    _previewFile(){
        console.log("im changin")
        if(this.state.file !== null){
            // let reader = new FileReader();
            // reader.readAsDataURL(this.state.file)
            // console.log("result "+reader.result)
            // this.setState({source:leak})
            console.log("im not null")
        }
    }

    _preview2(){
        if(document !== null){
            if(document.querySelector('input[type=file]') !== null && this.state.uploadCount <6){
                const b = this.state.uploadCount + 1
                this.setState({uploadCount:b})
                console.log("im changin")
                const preview = document.querySelector('img');
                const file = document.querySelector('input[type=file]').files[0];
                console.log("file "+file)
                const reader = new FileReader();
                // this is awful and javascript is silly
                const self = this
                reader.addEventListener("load", function () {
                // convert image file to base64 string dataURL
                // console.log("reader ressize : "+reader.result.length);
                let tempList = self.state.dataURLs
                tempList.push(reader.result)
                self.setState({dataURLs:tempList});
                preview.src = reader.result;
                }, false);
            
                if (file) {
                    console.log("have a file")
                    reader.readAsDataURL(file);
                }
            }

        }
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

    _handleLLRatingChange(e){
        this.setState({
            LLrating: e.target.value
        })
    }
    _handlePropRatingChange(e){
        this.setState({
            propRating: e.target.value
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
        let uri = window.location.href
        let uri_id = ""
        let uri_user = ""
        if(uri.lastIndexOf("-") === -1){
            // jk this will never happen lol
            uri_id = decodeURI(uri.substring(uri.lastIndexOf("/") + 1))
        }
        else{
            uri_id = decodeURI(uri.substring(uri.lastIndexOf("/") + 1, uri.lastIndexOf("-")))
            uri_user = decodeURI(uri.substring(uri.lastIndexOf("-") + 1))
        }
        console.log(uri_user)
        this.setState({userid : uri_user})
        fetch(`http://localhost:1995/properties/${uri_id}`)
            .then(response => response.json())
            .then(result =>{
                console.log(JSON.stringify(result))
                this.setState({propertyObj:result, formAdd:result[0].formattedAddress, owner:result[0].owner})
            })
        fetch(`http://localhost:1995/userID/${uri_user}`)
            .then(response => response.json())
            .then(result =>{
                console.log("user "+JSON.stringify(result))
                this.setState({userEmail : result[0].email})
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
            if(!Number.isInteger(parseInt(this.state.LLrating)) || !Number.isInteger(parseInt(this.state.propRating))){
                return "Rating must be a whole number between 1 and 5"
            }
            if(parseInt(this.state.LLrating) < 1 || parseInt(this.state.LLrating) > 5 || parseInt(this.state.propRating) < 1 || parseInt(this.state.propRating) > 5){
                return "Rating must be a whole number between 1 and 5"
            }
            if(!this.state.isValid){
                this.setState({isValid : true});
                console.log("goin in isvalid if")
            }
            return ""
    }

    _handleCancelClick(){
        this._changeURI()
    }
    
    _handleSubmitClick(){
        console.log("is valid? " + this.state.isValid)
        this.setState({hasSubmitted:true});
        console.log("result: " +this._getReviewResponse())
        console.log("is valid? " + this.state.isValid)
        // post to db!
    
        if(this._getReviewResponse() === ""){
                // console.log("response time: " + this.state.selected)
                // console.log("LL: " + this.state.LLname)
                // console.log("LL rev: " + this.state.generalLLReview)
                // console.log("rent: " + this.state.rentInput)
                // console.log("prop rev: " + this.state.generalPropReview)
                // window.location.href = `/search/${this.state.propertyObj[0]._id}`
                console.log("is valid")

                // CHECK TO SEE IF SOMEONE HAS ALREADY SUGGESTED LL NAME beofre pushing to db

                let revObj = {
                    userID : this.state.userid,
                    propID : this.state.propertyObj[0]._id,
                    rTime : this.state.selected,
                    LLName : this.state.LLname,
                    LLRev : this.state.generalLLReview,
                    rent : this.state.rentInput,
                    propRev : this.state.generalPropReview,
                    pics : this.state.pictureLink,
                    LLrating : this.state.LLrating,
                    propRating : this.state.propRating
                };
                console.log("email: "+this.state.userEmail)
                console.log("dataURLs: " + this.state.dataURLs)
                // console.log("size: " + this.state.dataURLs[0].length)
                fetch(`http://localhost:1995/postReview/${this.state.userid}`, {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        reviewObj : revObj,
                        imageList : this.state.dataURLs
                       })
                 })
                console.log("name: "+this.state.LLname)
                if(this.state.LLname !== ""){
                    fetch(`http://localhost:1995/LLsug/${this.state.propertyObj[0]._id}`, {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            LL : this.state.LLname
                           })
                     })
                }
                fetch(`http://localhost:1995/properties/${this.state.propertyObj[0]._id}`)
                    .then(response => response.json())
                    .then(result =>{
                        // console.log(JSON.stringify("updated prop " + JSON.stringify(result)))
                        this._changeURI();
                })
                
        }
        else{
            console.log("something is hecked")
        }              
    }

    _changeURI(){
        window.location.href = `/property/${this.state.propertyObj[0]._id}-${this.state.userid}`
    }


    render(){
        return(
            <div class="subRevPage">
                <h2>Submit a review for {this.state.formAdd}</h2>
                <div class="reviewInfoContainer">
                    <div class="revQ">On average, how long does it take for your landlord to respond to your calls or messages? (required)
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
                    </div>
                    <div class="revQ">If the property's owner {this.state.owner} is not your landlord or leasing manager, please enter their name below. If you have multiple landlords, enter their names separated by ampersands.
                    <div><input class="longer" type = "text" value = {this.state.LLname} placeholder = "" onChange = {this._handleLLChange}></input></div></div>
                    <div class="revQ">Enter any other landlord-specific information you want to include below!
                    <div><textarea class="bigBox" type = "text" value = {this.state.generalLLReview} placeholder = "" onChange = {this._handleGeneralLLRevChange}></textarea></div></div>
                    <div class="revQ">How would you rate your overall experience with this landlord between 1 and 5? (1 being terrible, 5 being excellent) (required)
                    <div><input type = "text" value = {this.state.LLrating} placeholder = "" onChange = {this._handleLLRatingChange}></input></div></div>
                    <div>--------------------------------------------------------------------------------</div>
                    <div class="revQ">How much do you pay in monthly rent? (required)
                    <div>$<input type = "text" value = {this.state.rentInput} placeholder = "" onChange = {this._handleRentChange}></input></div></div>
                    <div class="revQ">Enter any other property-specific information you want to include below!
                    <div><textarea class="bigBox" type = "text" value = {this.state.generalPropReview} placeholder = "" onChange = {this._handleGeneralPropRevChange}></textarea></div></div>
                    <div class="revQ">How would you rate your experience living at this property between 1 and 5? (required)
                    <div><input type = "text" value = {this.state.propRating} placeholder = "" onChange = {this._handlePropRatingChange}></input></div></div>
                    <div class="revQLast">If you want to include pictures of the property, please upload them here.
                    <div><input type="file" onChange={this._preview2}/></div></div>
                </div>
                {(this.state.hasSubmitted)?
                        <div class="res" >{this._getReviewResponse()}</div>
                        :""
                    }
                <div class="revButtonContainer">
                    <button class="subRevButtons" onClick={this._handleCancelClick}> Cancel </button>
                    <button class="subRevButtons" onClick={this._handleSubmitClick}> Submit Review </button>
                </div>
                {(this.state.image !=="")?
                    <p>Last uploaded image:</p>
                    :""
                }
                <img src={this.state.image} alt=""/>
                    
            </div>
        )
    }
}

export default SubmitReviewPage