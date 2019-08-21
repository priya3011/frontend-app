import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import {   
    LeftSidebar,
    Footer,
    CustomSnackbar,
    InfoCard } from './../../components';
import './Investment.scss'


export default class Investment extends Component {

    constructor(props){
        super(props);
        this.state ={
            //for notification
            isAlertVisible : false,
            alertType:'',
            alertMessage:'',

            //to display investment related info
            investment_id:'',
            investment_name:'',
            currency:'',
            account_id:''
        };

        this.dismissAlert = this.dismissAlert.bind(this);
        this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount(){
        //fetch currency detail and set the state
    }

    showAlert(message, type){
        this.setState({ alertMessage:message, alertType:type, isAlertVisible:true });
    }


    dismissAlert(){
        this.setState({ isAlertVisible: false });
    }

    render() {
        const { isAlertVisible, alertType, alertMessage } = this.state;

        return (
            <div className="main-container">
                <CustomSnackbar open={isAlertVisible} variant={alertType} message={alertMessage} onClose={this.dismissAlert}></CustomSnackbar>
                <div className="navigation">
                    <LeftSidebar history={this.props.history} />
                </div>
                <Container  className="content-wrapper" id="content-div">
                    <Row className="page-content">
                        <Col lg={4} md={4} sm={4}><InfoCard label="Referral Code" value={"test"}></InfoCard></Col>
                        <Col><InfoCard label="CAD" value={"test"}></InfoCard></Col>
                        <Col><InfoCard label="Referral Code" value={"test"}></InfoCard></Col>
                    </Row>
                    <Row >
                    {/* <Col></Col>
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
                    <Col></Col> */}
                    
                    </Row>
            
                    <Row><Col lg={12} md={12} sm={12} className="footer-container"><Footer history={this.props.history} /></Col></Row>

                </Container>
                
                
            </div>
        )
    }
}
