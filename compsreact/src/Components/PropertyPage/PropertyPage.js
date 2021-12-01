import React from "react";
import { useParams } from "react-router-dom";
import "./PropertyPage.css";

class PropertyPage extends React.Component {


    constructor(){
        super();
        this.state={
            id : "",
            propertyObj : null
        }
        this._handleBackClick = this._handleBackClick.bind(this);
        // this._showResults = this._showResults.bind(this);
        // this._handleStateChange = this._handleStateChange.bind(this);
    }

    componentDidMount(){
        let uri_id = window.location.href
        uri_id = decodeURI(uri_id.substring(uri_id.lastIndexOf("/") + 1))
        this.setState({id:uri_id})

        fetch(`http://localhost:1995/properties/${uri_id}`)
            .then(response => response.json())
            .then(result =>{
                console.log(JSON.stringify(result))
                this.setState({propertyObj:result})
            })
        // let propertyID = encodeURI(this.props.match.params.id);
        // this.setState({id:propertyID})

        // fetch(`http://localhost:5000/stations/${stationAdd}`)
        // .then(response => response.json())
        // .then(result =>{
        //     this.setState({
        //         resultList : result
        //     })
        //     this.setState({
        //         url : this.state.resultList[0]["imageURL"],
        //         address : this.state.resultList[0]["address"],
        //         brand : this.state.resultList[0]["brand"]
        //     })
        //     console.log(this.state.url)
        // })
    }

    // _showResults(){
    //     const displayList = this.state.resultList
    //     console.log(this.state.userEM)
    //     return(
    //         displayList.map(r =>{
    //             return(
    //               <Station email={this.state.userEM} key={r._id} stationInfo={r}/>
    //             );
    //           })
    //     )
    // }

    // _handleStateChange(value){
    //     this.setState({ userEM : value })
    // }

    _handleBackClick(){
        window.location.href = "/search"
    }


    render(){
        return(
            <div>
                <button onClick={this._handleBackClick}> back </button> 
                <h1>{JSON.stringify(this.state.propertyObj)}</h1>
            </div>
        )
    }
}

export default PropertyPage