import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import { inviteUser } from '../../service/axios-service'

import {   
    LeftSidebar,
    Footer,
    CustomSnackbar,
    InfoCard } from './../../components';
import './Affiliates.scss'

class Affiliates extends Component {

    // static propTypes={
    //     ref_code: PropTypes.string.isRequired
       
    // };

    constructor(props){
        super(props);
        this.state ={
            isAlertVisible : false,
            alertType:'',
            alertMessage:'',
            email:''
        };

        this.dismissAlert = this.dismissAlert.bind(this);
        this.sendAffiliateInvite = this.sendAffiliateInvite.bind(this);
    }

    showAlert(message, type){
        this.setState({ alertMessage:message, alertType:type, isAlertVisible:true });
    }


    dismissAlert(){
        this.setState({ isAlertVisible: false });
    }

    handleInputChange = (e) =>{
        console.log([e.target.name], e.target.value);
        this.setState({
          [e.target.name]: e.target.value
        });

        
    }

    sendAffiliateInvite(e){
        e.preventDefault();

        const username = localStorage.getItem("username");
        const { email } = this.state;

        inviteUser({username, email})
        .then((res)=>{
            //triggers a state change which will refresh all components
            this.showAlert(res.data.code,'success');
        })
        .catch((err)=>{
            //triggers a state change which will refresh all components
            this.showAlert(err.response.data.code,'error');
        });


    }



    render() {
        // console.log("props ",);
        
        const { isAlertVisible, alertType, alertMessage, email } = this.state;
        const ref_code = localStorage.getItem("ref_code");

        return (
            <div className="main-container">
                <CustomSnackbar open={isAlertVisible} variant={alertType} message={alertMessage} onClose={this.dismissAlert}></CustomSnackbar>
                <div className="navigation">
                    <LeftSidebar history={this.props.history} />
                </div>
                <Container  className="content-wrapper" id="content-div">
                    <Row style={{marginTop: "10vw"}}>
                        <Col></Col>
                        <Col  lg={3} md={4} sm={4}><InfoCard label="Referral Code" value={ref_code}></InfoCard></Col>
                        <Col></Col>
                    </Row>
                    <Row style={{marginBottom: "auto"}}>
                    <Col></Col>
                    <Col  lg={5} md={6} sm={6}>
                        <form className="invite-form" onSubmit={this.sendAffiliateInvite}>
                            <div className="form-group">
                                <input type="email" className="form-control invite-form-control" id="email" name="email" placeholder="Email" value={email} required  onChange={this.handleInputChange}></input>
                            </div>
                        
                            <div>
                                <button type="submit" name="invite" className="btn btn-info invite-btn" >Invite</button>
                            </div>
                        </form>
                    </Col>
                    <Col></Col>
                    
                    </Row>
            
                    <Row><Col lg={12} md={12} sm={12} className="footer-container"><Footer history={this.props.history} /></Col></Row>

                </Container>
                
                
            </div>
        )
    }
}

// const mapStateToProps = state => ({
    
//     ref_code: state.user.ref_code
    
// });

// export default connect(mapStateToProps, null)(Affiliates);
export default Affiliates;
