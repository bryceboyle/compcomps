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
    }

    componentDidMount(){
        console.log("obj props " + JSON.stringify(this.props.review_object))
        console.log("type props " + JSON.stringify(this.props.type))
        // this.setState({id: this.props.id})
        // console.log(this.state.id)
        fetch(`http://localhost:1995/getImg/61b91d017a140ec3d83179ee`)
            .then(response => response.json())
            .then(result =>{
                const temp = []
                for(let i=0;i<result.length;i++){
                    temp.push(result[0])
                }
                console.log("EEEEEE"+typeof temp)
                // this.setState({pics : temp})
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

    render(){
        return(
            <div>
                <h2>review:</h2>
                <p>property rating: {this.props.review_object.propRating}</p>
                <p>rent: {this.props.review_object.rent}</p>
                {(this.props.review_object.propRev !== "")?
                    <p>property review: {this.props.review_object.propRev}</p>
                    : ""
                }
                <p>landlord rating: {this.props.review_object.LLrating}</p>
                <p>response time: {this.props.review_object.rTime}</p>
                {(this.props.review_object.LLRev !== "")?
                    <p>landlord review: {this.props.review_object.LLRev}</p>
                    : ""
                }
                {/* WILL PROBABLY HAVE TO CHANGE THIS TO NOT LOOK FOR EMPTY STRING */}
                {(this.state.pics !== [])?
                    <p>pictures: {this.state.pics[0]}</p>
                    : "no pix"
                }
            </div>
        )
    }
}


export default Review