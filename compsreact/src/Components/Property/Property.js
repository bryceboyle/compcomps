import React from "react";
import "./Property.css";

class Property extends React.Component {
    constructor(){
        super();
        this.state={
            id : "",
            test : 1,
            formattedAddress : "",
            rating : 0
        }
        this._handleClick = this._handleClick.bind(this);
    }

    componentDidMount(){
        this._formatAddress()
        console.log("id props " + this.props.id)
        this.setState({id: this.props.id})
        console.log(this.state.id)

        let names = (this.props.whole_object.owner).split(";")
        console.log("test name: "+names)

        fetch(`http://localhost:1995/reviews/${this.props.id}`)
            .then(response => response.json())
            .then(result =>{
                console.log(JSON.stringify(result))
                // go through results and get the rating for all then average them and display
                let totalRating = 0;
                if(result.length === 0){
                    this.setState({rating:-1})
                }
                else{
                    for(let i=0; i<result.length; i++){
                        totalRating += parseInt(result[i].overallRating)
                    }
                    totalRating = (totalRating/result.length).toFixed(2);
                    this.setState({rating:totalRating})
                }
                
            })
    }

    _formatAddress(){
        let fixedAddy = "";
        if(this.props.whole_object.houseNum != null){
            fixedAddy = fixedAddy + this.props.whole_object.houseNum
        }
        if(this.props.whole_object.streetDirPre != null){
            fixedAddy = fixedAddy + " " + this.props.whole_object.streetDirPre
        }
        if(this.props.whole_object.streetName != null){
            fixedAddy = fixedAddy + " " + this.props.whole_object.streetName
        }
        if(this.props.whole_object.streetSfx != null){
            fixedAddy = fixedAddy + " " + this.props.whole_object.streetSfx
        }
        if(this.props.whole_object.streetDirPost != null){
            fixedAddy = fixedAddy + " " + this.props.whole_object.streetDirPost
        }
        if(this.props.whole_object.zip != null){
            fixedAddy = fixedAddy + " " + this.props.whole_object.zip
        }
        this.setState({formattedAddress : fixedAddy})
    }

    _handleClick(){
        console.log(this.state.test)
        if(this.props.userID === ""){
            window.location.href = `/property/${this.state.id}`
        }
        else{
            window.location.href = `/property/${this.state.id}-${this.props.userID}` 
        }
        
    }

    render(){
        return(
            <div>
                {/* <h2>{this.props.converted_case_type}</h2>
                <h3>{this.props.date}</h3>
                <h4>{this.props.address}</h4> */}
                <h2> {this.state.formattedAddress}</h2>
                <h4> {this.props.whole_object.owner}</h4>
                {(this.state.rating === -1)?
                    <h4>no reviews</h4>
                    : <h4> rating: {this.state.rating}</h4>                
                }
                <button onClick={this._handleClick}> details </button>
            </div>
        )
    }
}


export default Property