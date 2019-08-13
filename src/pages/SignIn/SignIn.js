import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchToken } from '../../actions/signInActions';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { Redirect } from "react-router-dom";

import './SignIn.scss';
import { FRONTEND_API } from "../../config/config";

class SignIn extends Component {


  constructor(props){
    super(props);

    this.state = {
      isAuthenticated: false,
      ref_code: '',
      username: '',
      password: '',
      className: 'needs-validation',  // When validation fails, add a boostrap class to display prompts.
      err_msg: { err: false, msg: ''}, // Held the failure state & messag returned from server.
      confirmation_msg:{show:false, msg:''} //if any confirmation message is required to be shown when redirected to Sign In
    }

    // console.log("SignIn props ",props);
    // if (props.location && props.location.state)
    //   this.setState({
    //     confirmation_msg: props.location.state.confirmation_msg
    //   })

  }

  handleInputChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e)=>{
    if(!e.target.checkValidity()){  // Add a Bootstrap class to show prompts if checkValidity is false.
      this.setState({ className: 'needs-validation was-validated'});
    }else{
      const { username, password } = this.state;
      axios.post(FRONTEND_API+'login', { username, password })
      .then((res1)=>{
        if(res1.data.code === "Login successful")
        return axios.get(FRONTEND_API+`user_data/${username}`);
      })
      .then((res2)=>{
        if(res2.data.code === "success")
          this.setState({
            isAuthenticated: true,
            ref_code: res2.data.ref_code
        });
      })
      .catch((err)=>{
        let msg = "";
        if(err.response.data.code)
          msg = `${err.response.data.code}: ${err.response.data.error}.`;
        else msg = `${err.response.data.msg}: ${err.response.data.err}.`;
          this.setState({
            err_msg: {err: true, msg},
            className: 'needs-validation'
          })
      });
    }
    e.preventDefault();
  }

  // {
  //   confirmation_msg.show &&
  //       <div className="alert alert-success alert-text" role="alert">
  //         {confirmation_msg.msg}
  //       </div>
  //
  // }
  render(){
    const { isAuthenticated, ref_code, username, password, className, err_msg, confirmation_msg } = this.state;

    if(!isAuthenticated)
      return (
        <div className="signin-container">
          <div >


            { err_msg.err &&
                <div className="alert alert-danger alert-text" role="alert">
                  {err_msg.msg}
                </div>
            }
            <form className={className} noValidate onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input name="username" type="text" className="form-control signin-form-control" id="userName" placeholder="Username" required autoFocus value={username} onChange={this.handleInputChange}></input>
                    <div className="invalid-feedback text-left ml-1">
                      Username cannot be empty.
                    </div>
                </div>
                <div className="form-group">
                    <input name="password" type="password" className="form-control signin-form-control" id="password" placeholder="Password" required value={password} onChange={this.handleInputChange}></input>
                    <div className="invalid-feedback text-left ml-1">
                      Password cannot be empty.
                    </div>
                </div>
                <div>
                    <button type="submit" name="signIn" className="btn btn-info signin-btn">Login</button>
                </div>
            </form>
          </div>
          <div className="signup-options-container">
              <NavLink to="/signup" className="signup-link">Sign Up</NavLink>
              <NavLink to="/forgotpassword" className="forgot-password-link">Forgot</NavLink>
          </div>
        </div>
      );
    else
      return <Redirect to={{ pathname: "/dashboard", state: { ref_code }}}/> // The "state" pass data to dashboard.
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
