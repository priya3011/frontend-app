import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import {   
    LeftSidebar,
    Footer,
    CustomSnackbar,
    InfoCard,
    TransferModal } from './../../components';
import './Investment.scss'

//TODO: 
//1. Connect it to the user investments store -- currency, investment name, 
//2. Create an API to get the user investment details -- account balance, exchange rate
//3. API to get the investment balance history
//4. Modify Transfer modal if investment id is passed, dont show the dropdown , otherwise do show the dropdown 

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
        const { isAlertVisible, alertType, alertMessage, investment_id} = this.state;

        return (
            <div className="main-container">
                <CustomSnackbar open={isAlertVisible} variant={alertType} message={alertMessage} onClose={this.dismissAlert}></CustomSnackbar>
                <div className="navigation">
                    <LeftSidebar history={this.props.history} />
                </div>
                <Container  className="content-wrapper" id="content-div">
                    <Row className="page-content">
                        <Col lg={4} md={4} sm={4}><InfoCard label="Cash Investment Balance" value={"50,000"}></InfoCard></Col>
                        <Col><InfoCard label="CAD / CAD" value={"1.00"}></InfoCard></Col>
                        <Col><InfoCard label="CAD VALUE" value={"50,000.00"}></InfoCard></Col>
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
                    <Row>
                        <TransferModal showAlert={this.showAlert} investment_id={investment_id}></TransferModal>
                    </Row>
            
                    <Row><Col lg={12} md={12} sm={12} className="footer-container"><Footer history={this.props.history} /></Col></Row>

                </Container>
                
                
            </div>
        )
    }
}
