import React, { Component } from 'react'
import {   
    LeftSidebar,
    Footer,
    CustomSnackbar,
    InfoCard,
    ResponsiveSidebar } from './../../components';
import { Container, Row, Col } from 'react-bootstrap';
import './Contact.scss'


export default class Contact extends Component {
    render() {
            return (
          
                <div style={{height:"inherit"}}>
                <div className="navigation d-lg-none d-sm">
                        <ResponsiveSidebar  history={this.props.history} />
                </div>
                <div className="main-container ">
                    <div className="navigation d-none d-lg-block">
                        <LeftSidebar history={this.props.history} />
                    </div>
                    <Container  className="content-wrapper" id="content-div" style={{paddingTop:"70px"}}>
                        
                        <Row style={{marginBottom: "auto"}} className="justify-content-center">
                        <Col  lg={12} md={12} xs={12}>
                            <div>
                                Got a question? We would love to hear from you! Email us at <a href="mailto: admin@qoinify.com">admin@qoinify.com</a> and we will respond as soon as possible.
                            </div>
                        </Col>                    
                        </Row>
                
                        <Row><Col lg={12} md={12} sm={12} className="footer-container"><Footer history={this.props.history} /></Col></Row>
    
                    </Container>
                    
                    
                </div>
                </div>
           
        )
    }
}
