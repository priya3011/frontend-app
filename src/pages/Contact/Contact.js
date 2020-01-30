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


export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        }
    }

    onHandleChange(event) {
        this.setState({
            name: event.target.value.name,
            email: event.target.value.email,
            message: event.target.value.message
        })
        console.log(event.target.value);
        console.log("on handle change")
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event.target);
        Axios({
            method: "POST",
            url: "http://localhost:3000/email",
            data: this.state
        }).then((response) => {
            if (response.data.status === "success") {
                alert("email sent!!!");
                this.resetForm();
            } else if (response.data.status === "fail") {
                alert("email not sent");
            }
        })
    }

    resetForm() {
        this.setState({
            name: '',
            email: '',
            message: ''
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
                                        <div>
                                            Got a question? We would love to hear from you! Email us at
                                            <a href="mailto: uppercanadacoins@gmail.com"> uppercanadacoins@gmail.com</a>
                                            and we will respond as soon as possible.
                                            </div>
                                        <div className="contact">
                                            <Container>
                                                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Name</label>
                                                        <input type="text" className="form-control" value={this.state.name} onChange={this.onHandleChange.bind(this)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                                        <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.onHandleChange.bind(this)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="message">Message</label>
                                                        <textarea className="form-control" rows="5" value={this.state.message} onChange={this.onHandleChange.bind(this)} />
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">Submit</button>
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
