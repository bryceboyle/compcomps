import React from "react";
import "./TenResource.css";
import {withRouter} from "react-router"

class TenResource extends React.Component {


    _handleChange(e){
        this.setState({
            selected: e.target.value
        })
    }

    render(){
        return(
            <div>
                <div>
                    <div>
                        <h2>Resources</h2>
                        <p> STUFFFF</p>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withRouter(TenResource);