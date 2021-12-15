import React from "react";
import "./Review.css";

class Review extends React.Component {
    constructor(){
        super();
        this.state={
            id : "",
            test : 1,
            pics : []
        }
        this._handleClick = this._handleClick.bind(this);
        this._formatSelect = this._formatSelect.bind(this);
    }

    componentDidMount(){
        console.log("obj props " + JSON.stringify(this.props.review_object))
        console.log("type props " + JSON.stringify(this.props.type))
        // this.setState({id: this.props.id})
        // console.log(this.state.id)
        fetch(`http://localhost:1995/getImg/${this.props.review_object._id}`)
            .then(response => response.json())
            .then(result =>{
                if(result[0]!== undefined){
                    console.log("EEEEEE "+ result[0].URL.length)
                    this.setState({pics : result[0].URL})
                }
            })
        fetch(`http://localhost:1995/reviews/${this.props.review_object._id}`)
            .then(response => response.json())
            .then(result =>{
                // console.log("reSULT "+typeof result)
                console.log("reviews "+JSON.stringify(result))
                // console.log(result.length)
                // this.setState({reviewList : result})
            })

    }

    _handleClick(){
        console.log(this.state.test)
        window.location.href = `/search/${this.state.id}`
    }

    _formatSelect(input){
        if(input === "lessHour"){
            return "Less than an hour"
        }
        if(input === "fewHours"){
            return "A few hours"
        }
        if(input === "sameDay"){
            return "Within the same day"
        }
        if(input === "fewDays"){
            return "A few days"
        }
        if(input === "more"){
            return "More than a few days"
        }
        return ""
    }

    render(){
        return(
            <div class="rev">
                <p>Property rating: {this.props.review_object.propRating}</p>
                <p>Monthly rent: {this.props.review_object.rent}</p>
                {(this.props.review_object.propRev !== "")?
                    <p>Property review: {this.props.review_object.propRev}</p>
                    : ""
                }
                <p>Landlord rating: {this.props.review_object.LLrating}</p>
                <p>Response time: {this._formatSelect(this.props.review_object.rTime)}</p>
                {(this.props.review_object.LLRev !== "")?
                    <p>Landlord review: {this.props.review_object.LLRev}</p>
                    : ""
                }
                {/* WILL PROBABLY HAVE TO CHANGE THIS TO NOT LOOK FOR EMPTY STRING */}
                {(this.state.pics !== [])?
                    <img src={this.state.pics} alt=""/>
                    : "no pix"
                }
            </div>
        )
    }
}


export default Review