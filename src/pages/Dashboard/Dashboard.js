import React, { Component } from 'react';
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

        const ChartTableMin = FetchDataMin(ChartTable, getOverviewTableData, user);
        const DoughnutChartMin = FetchDataMin(DoughnutChart, getOverviewTableData, user);
        const LineChartMin = FetchDataMin(LineChart, getBalanceHistory, balance, interval);
        const TransactionTableMin = FetchDataMin(TransactionTable, getTransactionHistory, account);

         return (
            <div className="dashboard-container">
                <div className="navigation">
                    <LeftSidebar  ref_code={this.props.location.state.ref_code}/>
                </div>
                <div className="content-wrapper" id="content-div">
                    <div className="overview-container">
                        <div className="overview-table"><ChartTableMin/></div>
                        <div className="overview-graph"><DoughnutChartMin/></div>
                    </div>
                    <div className="graph-container"><LineChartMin intervalChange={this.handleChange} interval={interval}/></div>
                    <div className="table-container"><TransactionTableMin/></div>
                    <div className="transfer-modal-container"><TransferModal/></div>
                    <div className="footer-container"><Footer/></div>
                </div>
            </div>
        );
    }
}