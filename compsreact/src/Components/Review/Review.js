import React from "react";
import "./Review.css";

class Review extends React.Component {
    constructor(){
        super();
        this.state={
            id : "",
            test : 1
        }
        this._handleClick = this._handleClick.bind(this);
    }

    componentDidMount(){
        console.log("obj props " + JSON.stringify(this.props.review_object))
        console.log("type props " + JSON.stringify(this.props.type))
        // this.setState({id: this.props.id})
        // console.log(this.state.id)

    }

    _handleClick(){
        console.log(this.state.test)
        window.location.href = `/search/${this.state.id}`
    }

    render(){
        return(
            <div>
                <h2> review: </h2>
                <p>overall rating: {this.props.review_object.overallRating}</p>
                <p>rent: {this.props.review_object.rent}</p>
                <p>property review: {this.props.review_object.propRev}</p>
                <p>response time: {this.props.review_object.rTime}</p>
                <p>landlord review: {this.props.review_object.LLRev}</p>
                <p>pictures: {this.props.review_object.pics}</p>
            </div>
        )
    }
}


export default Review