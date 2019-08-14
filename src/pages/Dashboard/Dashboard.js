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
            Footer } from './../../components';

export default class Dashboard extends Component{
    /**
     * This state is lifted up from TransactionTable for creating Http request body data which
     *  will be passed to HOC FetchDataMin as "interval" argument.
     */
    state = {
        interval: '180'
    }

    static propTypes={
        location: PropTypes.object.isRequired
    };

    handleChange = (e)=>{
        this.setState({interval: e.target.value});
    }



    render(){
        const { interval } = this.state;
        const ref_code = localStorage.getItem("ref_code");
        const username = localStorage.getItem("username");
        // console.log("username ", localStorage.getItem("username"))

        const ChartTableMin = FetchDataMin(ChartTable, getOverviewTableData, {"key":"username", "value":username});
        const DoughnutChartMin = FetchDataMin(DoughnutChart, getOverviewTableData, {"key":"username", "value":username});
        const LineChartMin = FetchDataMin(LineChart, getBalanceHistory, balance, interval);
        const TransactionTableMin = FetchDataMin(TransactionTable, getTransactionHistory, account);

         return (
            <div className="dashboard-container">
                <div className="navigation">
                    <LeftSidebar history={this.props.history} />
                </div>
                <Container className="content-wrapper" id="content-div">
                    <Row style={{marginTop:50}}>
                        <Col lg={6} md={6} sm={12} ><ChartTableMin/></Col>
                        <Col lg={6} md={6} sm={12} ><DoughnutChartMin/></Col>
                    </Row>
                    <Row ><Col lg={12} md={12} sm={12}><LineChartMin intervalChange={this.handleChange} interval={interval}/></Col></Row>

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
