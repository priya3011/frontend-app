import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


import './ForgotPassword.scss';
/////////
class ForgotPassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      resetEmail:{email:''},                   
      showError: false,//initializing showError var  
      messageFromServer: '',
      emailValid: false,
    };
  }
  handleChange = (event) =>{//On change function for email field
    
    const { value, name } = event.target;
    const { resetEmail } = this.state;
    this.setState({
        resetEmail: {
            ...resetEmail,
            [name]: value},
            }
            );
  }
  validateEmail(value){ // validation function
    let emailValid = this.state.emailValid;
    emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i); //RE for email validation
    return emailValid;
  }
  onSubmit = (event) => {
    event.preventDefault();
   const {resetEmail} = this.state; 
   this.validateEmail(resetEmail.email); //validating eamil
    //alert('Authentication coming soon!');
   fetch('http://178.128.233.31/frontend/reset_password', { // fetching reset password API
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({resetEmail}), //Passing email as request to API
   
  })
  .then(res => {
    if (res.status === 200) { // possitive response
      alert('Recovery email sent, Please check your email ID.!');
     
       // this.props.history.push('/');
    } else {
      alert('email error!');
      const error = new Error(res.error);
      throw error;
    }
  })
  .catch(err => {
    console.error(err);
    alert('Error logging in please try again');
  });
  }
///////
  render(){
    const {resetEmail}= this.state;
    return <div className="signin-container">
        <div >
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="email" className="form-control" name="email" value={resetEmail.email} onChange={this.handleChange} placeholder="Email"></input>
            </div>
            <div >
              <button type="submit" name="signIn" className=" btn btn-info fogotpwd btn">Forgot Password</button>
            </div>
          </form>
         
        </div>
        <div className="signup-options-container">
          <NavLink to="/signIn" className="signup-link">Sign In</NavLink>
          <NavLink to="/signUp" className="forgot-password-link">Sign Up</NavLink>

        </div>
      </div>
  }
}

export default ForgotPassword;
