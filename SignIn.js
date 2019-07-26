import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchToken } from '../../actions/signInActions';
import { NavLink } from 'react-router-dom';


import './SignIn.scss';
import { Dashboard } from '..';

class SignIn extends React.Component {
//////////
constructor(props) {
  super(props)
  this.state = {
    username : '',
    password: '',
    isLoggedIn : false,
  };
  this.handleInputChange =this.handleInputChange.bind();
  this.onSubmit = this.onSubmit.bind();
}
handleInputChange = (event) => {
  const { value, name } = event.target;
  this.setState({
    [name]: value
  });
}

onSubmit = (event) => {
  event.preventDefault();
  //let data = this.state.username;
  //this.props.onUsernameChange(this.state.username);
 // alert('Authentication coming soon!');
 fetch('http://178.128.233.31/frontend/login', {
  method: 'POST',
  body: JSON.stringify(this.state),
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(res => {
  if (res.status === 200) {
    this.state.isLoggedIn = true;
    const user = this.state.username;
   
    this.props.history.push({
      pathname : '/dashboard',
      user : user,  //passing user data thruough history push
});

  } else {
    const error = new Error(res.error);
    throw error;
  }
})
.catch(err => {
  console.error(err);
  alert('Error logging in please try again');
});
}
//////////
  render(){
    

    const { username, password, submitted, loading, error } = this.state;
  //  var user = username;
    return (
      <div className="signin-container">
        <div >
            <form onSubmit={this.onSubmit}>

                <div className="form-group">

                    <input type="text" className="form-control" name="username" id="userName" placeholder="Username" 
                    value={username}
                    onChange={this.handleInputChange}
                    required>
                      
                    </input>
             
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" name="password" id="password" placeholder="Password"
                    value={password}
                    onChange={this.handleInputChange}
                    required></input>
                   
                </div>
                <div>
                    <button type="submit" name="signIn" className="btn btn-info signin-btn" >Login</button>
                    
                </div>
                
            </form>
        </div>
        <div className="signup-options-container">
            <NavLink to="/signup" className="signup-link">Sign Up</NavLink>
            <NavLink to="/forgotpassword" className="forgot-password-link">Forgot</NavLink>
        </div>
      <div>
    
      </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    UserStore: state.UserStore
  }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchToken,
            },
            dispatch
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)
