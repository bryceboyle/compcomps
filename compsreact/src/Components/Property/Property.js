import React from "react";
import "./Property.css";

class Property extends React.Component {
    constructor(){
        super();
        this.state={
            id : "",
            test : 1,
            formattedAddress : ""
        }
        this._handleClick = this._handleClick.bind(this);
    }

    componentDidMount(){
        this._formatAddress()
        console.log("id props " + this.props.id)
        this.setState({id: this.props.id})
        console.log(this.state.id)
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
        window.location.href = `/search/${this.state.id}`
    }

    render(){
        return(
            <div>
                {/* <h2>{this.props.converted_case_type}</h2>
                <h3>{this.props.date}</h3>
                <h4>{this.props.address}</h4> */}
                <h2> {this.state.formattedAddress}</h2>
                <h4> {JSON.stringify(this.props.whole_object)}</h4>
                <button onClick={this._handleClick}> deeetailz </button>
            </div>
        )
    }
}


export default Property