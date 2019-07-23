import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {FormErrors} from './FormErrors' // Error function
import { Redirect } from 'react-router-dom'

import './SignUp.scss';

class SignUp extends Component {
/////////
constructor (props) {       // Declearing constructors 
    super(props);
    this.state = {
      user:{
        code: '',
        password: '',
        username: '',
        email: ''
      },
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      redirect: false   

    }
    //this.handleUserInput = this.handleUserInput.bind();
  }

  handleUserInput = (event) => {        // binding email/ password eith its value 
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
        user: {
            ...user,
            [name]: value},
            }, () => { this.validateField(name, value) }
            );
  // validation function
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i); //RE for email validation
        fieldValidationErrors.email = emailValid ? '' : ' is invalid'; //error 
        break;
      case 'password':
        passwordValid = value.length >= 6;      //setting password min length to 6
        fieldValidationErrors.password = passwordValid ? '': ' is too short'; //error
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
    
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid}); // setting state of formvalidation
   
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  onSubmit = (event) => {
    const{user}=this.state;
    event.preventDefault();
   // alert('Authentication coming soon!');
   fetch('http://178.128.233.31/frontend/signup', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.status === 200) {
      this.props.history.push(/signin);
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
  



////////
  render(){
    const {user} = this.state;
    return <div className="signin-container">
                <div >
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" id="userName" name ="username" placeholder="Uername"
                            value={user.username}
                            onChange={this.handleUserInput}></input>
                        </div>
                        <div className="form-group">
                        <input type="password" className="form-control" name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={this.handleUserInput}  />                      
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                        <input type="email" required className="form-control" name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={this.handleUserInput}  />
                        </div>
                        <div className="form-group">
                            <input type="text" class="form-control" id="code" name="code" placeholder="Referral code" value={user.code}
                            onChange={this.handleUserInput}></input>
                        </div>
                        <div >
                        
                            <button type="submit" name="signIn" class=" btn btn-info signup-btn" disabled={!this.state.formValid} onClick={this.setRedirect}>Sign Up</button>  
                        </div>
                    </form>
                </div>
                <div class="signup-options-container">
                    <NavLink to="/signIn" className="signup-link" >Sign In</NavLink>
                    <NavLink to="/forgotpassword" className="forgot-password-link">Forgot</NavLink>

                </div>
            </div>
  }
}

export default SignUp;
