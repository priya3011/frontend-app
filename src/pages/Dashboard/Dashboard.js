import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';

import { LeftSidebar, TransferModal, DoughnutChart, LineChart, ChartTable, TransactionTable, Footer } from './../../components';

class Dashboard extends Component{
    static propTypes={
        location: PropTypes.object.isRequired
    };

    render(){
         return (
            <div className="dashboard-container">
                <div className="navigation">
                    <LeftSidebar  ref_code={this.props.location.state.ref_code}/> {/** Pass the referral code to LeftSidebar component*/}
                </div>
                <div className="content-wrapper" id="content-div">
                    <div className="overview-container">
                        <div className="overview-table"><ChartTable/></div>
                        <div className="overview-graph"><DoughnutChart /></div>
                    </div>
                    <div className="graph-container"><LineChart /></div>
                    <div className="table-container"><TransactionTable /></div>
                    <div className="transfer-modal-container"><TransferModal/></div>
                    <div className="footer-container"><Footer/></div>
                </div>
            </div>
        );
    }



}

export default Dashboard;
