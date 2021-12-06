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
                <h2> im a review! </h2>
                <p>rent: {this.props.review_object.rent}</p>
            </div>
        )
    }
}


export default Review