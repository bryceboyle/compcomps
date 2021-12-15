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
        this._formatAddress = this._formatAddress.bind(this);
        this._formatOwner = this._formatOwner.bind(this);
    }

    componentDidMount(){
        this._formatOwner()
        this._formatAddress()
        console.log("id props " + this.props.id)
        this.setState({id: this.props.id})
        console.log(this.state.id)

        let names = (this.props.whole_object.owner).split(";")
        console.log("test name: "+names)

        fetch(`http://localhost:1995/reviews/${this.props.id}`)
            .then(response => response.json())
            .then(result =>{
                // console.log(JSON.stringify(result))
                // go through results and get the rating for all then average them and display
                let tempRating1 = 0;
                let tempRating2 = 0;
                let totalRating = 0;
                if(result.length === 0){
                    this.setState({rating:-1})
                }
                else{
                    for(let i=0; i<result.length; i++){
                        tempRating1 += parseInt(result[i].LLrating)
                    }
                    tempRating1 = (tempRating1/result.length).toFixed(2);

                    for(let i=0; i<result.length; i++){
                        tempRating2 += parseInt(result[i].propRating)
                    }
                    tempRating2 = (tempRating2/result.length).toFixed(2);
                    totalRating = (tempRating1+tempRating2)/2
                    this.setState({rating:totalRating})
                }
                
            })
    }

    _formatOwner(){
        // reordering not working consistently. also not done yet
        // need to put spaces in and push formattedOwner to DB
        // also ones with numbers shouldn't be reformatted (big if checking isALpha)
        let fixedOwner = "";
        // split names if there are multiple owners listed
        let names = (this.props.whole_object.owner).split(";")
        console.log("len "+names.length)
        for(let i=0;i<names.length;i++){
            // split one person's name into first, last, MI
            let tempList = [];
            let fixedName = ""
            console.log("name1 "+names[i])
            if(names[i].charAt(0)=== " "){
                tempList = names[i]
                tempList = tempList.substring(1)
                tempList = tempList.split(" ");
                console.log("space temp "+tempList)
            }
            else{
                tempList = names[i].split(" ");
            }
            // rearrange into first middle last and fix capitalization
            let temp1 = tempList[0]
            tempList.splice(0, 1)
            tempList.push(temp1)
            console.log("firstlist "+tempList)
            for(let j=0;j<tempList.length;j++){
                let first = tempList[j].charAt(0)
                if(tempList[j].length > 1){
                    first = first + (tempList[j].toLowerCase()).substring(1)
                    // tempList[j] = first
                }
                else{
                    fixedName += first
                }
                if(j<tempList.length-1){
                    fixedName += " "
                }
            }
            console.log("fixed "+fixedName)

        }
        
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
        // adding and updating formattedAddress field
//         fetch(`http://localhost:1995/update/${this.props.id}`, {
//             method: "POST",
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({"newAddress":fixedAddy})
//          })
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
                <h2> {this.props.whole_object.formattedAddress}</h2>
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