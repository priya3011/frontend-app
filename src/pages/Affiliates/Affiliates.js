import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import { inviteUser } from '../../service/axios-service'

import {   
    LeftSidebar,
    Footer,
    CustomSnackbar,
    InfoCard,
    ResponsiveSidebar } from './../../components';
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
          
            <div>
            <div className="navigation d-md-none d-sm">
                    <ResponsiveSidebar  history={this.props.history} />
            </div>
            <div className="main-container ">
                <CustomSnackbar open={isAlertVisible} variant={alertType} message={alertMessage} onClose={this.dismissAlert}></CustomSnackbar>
                <div className="navigation d-none d-md-block">
                    <LeftSidebar history={this.props.history} />
                </div>
                <Container  className="content-wrapper" id="content-div" style={{paddingTop:"70px"}}>
                    
                    <Row style={{marginBottom: "auto"}} className="justify-content-center">
                    <Col  lg={12} md={12} xs={12}>
                        <Row style={{marginTop: "10vw"}} className="justify-content-center">
                            <Col  lg={4} md={4} xs={10}><InfoCard label="Referral Code" value={ref_code}></InfoCard></Col>
                        </Row>
                        <form className="invite-form" onSubmit={this.sendAffiliateInvite}>
                            <Row className="justify-content-center"><Col xs={10} md={6} lg={6}>
                            <div className="form-group">
                                <input type="email" className="form-control invite-form-control" id="email" name="email" placeholder="Email" value={email} required  onChange={this.handleInputChange}></input>
                            </div>
                            </Col></Row>
                            
                            <Row className="justify-content-center"><Col xs={10} md={6} lg={4}>
                            <div>
                                <button type="submit" name="invite" className="btn btn-info invite-btn" >Invite</button>
                            </div>
                            </Col></Row>
                        </form>
                    </Col>                    
                    </Row>
            
                    <Row><Col lg={12} md={12} sm={12} className="footer-container"><Footer history={this.props.history} /></Col></Row>

                </Container>
                
                
            </div>
            </div>    

        )
    }
}

// const mapStateToProps = state => ({
    
//     ref_code: state.user.ref_code
    
// });

// export default connect(mapStateToProps, null)(Affiliates);
export default Affiliates;
