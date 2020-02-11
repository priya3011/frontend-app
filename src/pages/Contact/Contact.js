import React, { Component } from 'react'
import {
    LeftSidebar,
    Footer,
    CustomSnackbar,
    InfoCard,
    ResponsiveSidebar
} from './../../components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Contact.scss'
import Axios from 'axios';
import { FRONTEND_API, BACKEND_API } from "../../config/config";
import { getContactDetails } from "../../service/axios-service";


export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            email: '',
            body: ''
        }
        this.onHandleChange = this.onHandleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onHandleChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
            subject: value.subject,
            email: value.email,
            body: value.body
        })
        console.log(event.target.value);
        // console.log("on handle change");
        console.log(this.state);
    }

    handleSubmit(event) {
        // console.log(event.target);
        // console.log(this.state);
        let data = this.state;
        getContactDetails(data).then((response) => {
            if (response.data.status === "success") {
                alert("email sent!!!");
                // this.resetForm();
            } else if (response.data.status === "fail") {
                alert("email not sent");
            }
        })
        event.preventDefault();
    }

    resetForm() {
        this.setState({
            subject: '',
            email: '',
            body: ''
        })
    }
    render() {
        return (

            <div style={{ height: "inherit" }}>
                <div className="navigation d-lg-none d-sm">
                    <ResponsiveSidebar history={this.props.history} />
                </div>
                <div className="main-container ">
                    <div className="navigation d-none d-lg-block">
                        <LeftSidebar history={this.props.history} />
                    </div>
                    <Container className="content-wrapper" id="content-div" style={{ paddingTop: "70px" }}>

                        <Row style={{ marginBottom: "auto" }} className="justify-content-center">
                            <Col lg={12} md={12} xs={12}>
                                <div>
                                    <Container>
                                        <Col lg={12}>
                                            <div className="contactUs">
                                                <h2>Contact Us</h2>
                                            </div>
                                        </Col>
                                        <div className="contact">
                                            <Container>
                                                <form id="contact-form" onSubmit={this.handleSubmit} method="POST">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control contact-form-control"
                                                            placeholder="Subject" value={this.state.subject} onChange={this.onHandleChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="email" className="form-control contact-form-control"
                                                            placeholder="Email" value={this.state.email} onChange={this.onHandleChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <textarea className="form-control contact-form-control" rows="8"
                                                            placeholder="Message" value={this.state.body} onChange={this.onHandleChange} />
                                                    </div>
                                                    <button type="submit" className="btn btn-info" className="submitBtn">Submit</button>
                                                </form>
                                            </Container>
                                        </div>
                                    </Container>
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
