import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchToken } from '../../actions/signInActions';
import { NavLink } from 'react-router-dom';
import {userService} from '../../components/_services'

import './SignIn.scss';

class SignIn extends Component {
//////////
constructor(props) {
  super(props)
  this.state = {
    username : '',
    password: ''
  };
}
handleInputChange = (event) => {
  const { value, name } = event.target;
  this.setState({
    [name]: value
  });
}

onSubmit = (event) => {
  event.preventDefault();
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
    this.props.history.push('/dashboard');
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
    

    //const { username, password, submitted, loading, error } = this.state;

    return (
      <div className="signin-container">
        <div >
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" name="username" id="userName" placeholder="Username" 
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    required></input>
                
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" name="password" id="password" placeholder="Password"
                    value={this.state.password}
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
