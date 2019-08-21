import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Dashboard.scss';


import FetchDataMin from '../../HOC/FetchDataMin'
import {    getOverviewTableData,
            getBalanceHistory,
            getTransactionHistory } from '../../service/axios-service'
import { user, balance, account} from '../../service/body-data'

import {    LeftSidebar,
            TransferModal,
            DoughnutChart,
            LineChart,
            ChartTable,
            TransactionTable,
            Footer,
            CustomSnackbar } from './../../components';

export default class Dashboard extends Component{
    /**
     * This state is lifted up from TransactionTable for creating Http request body data which
     *  will be passed to HOC FetchDataMin as "interval" argument.
     */

    static propTypes={
        location: PropTypes.object.isRequired
    };
    

    constructor(props){
        super(props);
        this.state = {
            refresh_interval_sec: 60,
            linechart_time_days: 180,
            isAlertVisible : false,
            alertType:'',
            alertMessage:''
        };

       this.showAlert = this.showAlert.bind(this);
       this.dismissAlert = this.dismissAlert.bind(this);
    }

    showAlert(message, type){
        this.setState({ alertMessage:message, alertType:type, isAlertVisible:true });
    }

    dismissAlert(){
        this.setState({ isAlertVisible: false });
    }




    // handleChange = (e)=>{
    //     this.setState({interval: e.target.value});
    // }



    render(){
        const { refresh_interval_sec, linechart_time_days, isAlertVisible, alertType, alertMessage} = this.state;
        const ref_code = localStorage.getItem("ref_code");
        const username = localStorage.getItem("username");
        // console.log("username ", localStorage.getItem("username"))

        const ChartTableMin = FetchDataMin(ChartTable, getOverviewTableData, {"key":"username", "value":username});
        const DoughnutChartMin = FetchDataMin(DoughnutChart, getOverviewTableData, {"key":"username", "value":username});
        const LineChartMin = FetchDataMin(LineChart, getBalanceHistory, {username , time_period_days:linechart_time_days });
        const TransactionTableMin = FetchDataMin(TransactionTable, getTransactionHistory, {username});

         return (
            <div className="dashboard-container">
                <CustomSnackbar open={isAlertVisible} variant={alertType} message={alertMessage} onClose={this.dismissAlert}></CustomSnackbar>
                <div className="navigation">
                    <LeftSidebar history={this.props.history} />
                </div>
                <Container fluid={true} className="content-wrapper" id="content-div">
                    <Container>
                    <Row >
                        <Col></Col>
                        <Col></Col>
                    </Row>
                    <Row style={{marginTop:50}} >
                        <Col lg={6} md={6} sm={12} ><ChartTableMin/></Col>
                        <Col lg={6} md={6} sm={12} ><DoughnutChartMin/></Col>
                    </Row>
                    <Row ><Col lg={12} md={12} sm={12}><LineChartMin interval={linechart_time_days} /></Col></Row>
                    <Row ><Col lg={12} md={12} sm={12}><TransactionTableMin></TransactionTableMin></Col></Row>
                    <Row ><Col lg={12} md={12} sm={12}><TransferModal  showAlert={this.showAlert}></TransferModal></Col></Row>
                    </Container>
                    
                    <Row><Col lg={12} md={12} sm={12} className="footer-container"><Footer history={this.props.history} /></Col></Row>

                </Container>
                
                
            </div>
        );
    }
}

// <Row className="table-container"><TransactionTableMin/></Row>
// <Row className="transfer-modal-container"><TransferModal/></Row>
// <Row className="footer-container"><Footer/></Row>
// <Container>
//   <Row>
//     <Col sm={8}>sm=8</Col>
//     <Col sm={4}>sm=4</Col>
//   </Row>
//   <Row>
//     <Col sm>sm=true</Col>
//     <Col sm>sm=true</Col>
//     <Col sm>sm=true</Col>
//   </Row>
// </Container>



        //  return (
        //     <div className="dashboard-container">
        //         <div className="navigation">
        //             <LeftSidebar  />
        //         </div>
        //         <div className="content-wrapper" id="content-div">
        //             <div className="overview-container">
        //                 <div className="overview-table"><ChartTableMin/></div>
        //                 <div className="overview-graph"><DoughnutChartMin/></div>
        //             </div>
        //             <div className="graph-container"><LineChartMin intervalChange={this.handleChange} interval={interval}/></div>
        //             <div className="table-container"><TransactionTableMin/></div>
        //             <div className="transfer-modal-container"><TransferModal/></div>
        //             <div className="footer-container"><Footer/></div>
        //         </div>
        //     </div>
        // );
