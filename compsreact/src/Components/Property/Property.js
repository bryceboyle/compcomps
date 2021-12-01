import React from "react";
import "./Property.css";

class Property extends React.Component {
    constructor(){
        super();
        this.state={
            id : "placeholder",
            test : 1
        }
        this._handleClick = this._handleClick.bind(this);
    }

    componentDidMount(){
        console.log("id props " + this.props.id)
        this.setState({id: this.props.id})
        console.log(this.state.id)

    }

    _handleClick(){
        console.log(this.state.test)
        window.location.href = `/search/${this.state.id}`
    }

    render(){
        return(
            <div>
                {/* <h2>{this.props.converted_case_type}</h2>
                <h3>{this.props.date}</h3>
                <h4>{this.props.address}</h4> */}
                <h2> {this.props.id}</h2>
                <h2> type {typeof this.props.id}</h2>
                <h4> {JSON.stringify(this.props.whole_object)}</h4>
                <button onClick={this._handleClick}> deeetailz </button>
            </div>
        )
    }
}


export default Property