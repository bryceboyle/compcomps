import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import "./GoogleBtn.css"

const CLIENT_ID = '803809234110-kk791i6j59kquo46snha5ocjdr8p6m1i.apps.googleusercontent.com';

class GoogleBtn extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoggedIn : false,
            accessToken: '',
            isSignedIn : false,
            userEmail : '',
            loginCounter : 0
        };

        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
        this._handleLogin = this._handleLogin.bind(this);
    }

    componentDidMount(){
        console.log("PROPS: " + this.props.isLoggedIn)
        // if(this.props.isLoggedIn){
        //     this.setState({isLoggedIn:true, isSignedIn:true})
        // }
    }

    _handleLogin(){
        let temp = this.state.loginCounter;
        if(!this.state.isLoggedIn && temp < 1){
            console.log("LOGGIN IN")
            temp += 1;
            this.setState({isLoggedIn:true, isSignedIn:true, loginCounter:temp})
        }
        else{
            console.log("called but not goin in")
        }
    }

    login(response){
        var profile = response.getBasicProfile();
        if(response.accessToken){
            this.setState(state => ({
                isLoggedIn : true,
                isSignedIn : true,
                accessToken : response.accessToken,
                userEmail : profile.getEmail()
            }));
        }
        this.props._handleStateChange(this.state.userEmail)

        
        console.log(this.state.userEmail);
        
    }

    logout(response){
        this.setState(state => ({
            isLoggedIn : false,
            isSignedIn :false,
            accessToken : "",
            userEmail : ""
        }));
        this.props._handleStateChange(this.state.userEmail)
    }

    handleLoginFailure(response){
        alert('Failed to log in')
    }

    handleLogoutFailure(response){
        alert('Failed to log out')
    }

    render(){
        return(
            <div class="right">
                {this.props.isLoggedIn ?
                    this._handleLogin()
                    : ""
                }
                {this.state.isLoggedIn ?
                    <GoogleLogout
                    clientId={CLIENT_ID}
                    buttonText='Logout'
                    onLogoutSuccess={this.logout}
                    onFailure={this.handleLogoutFailure}
                    >
                    </GoogleLogout>: <GoogleLogin
                    clientId={CLIENT_ID}
                    buttonText='Login'
                    onSuccess={this.login}
                    onFailure={this.handleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    responseType='code,token'
                    />
                }
            </div>
        )
    }
}

export default GoogleBtn;