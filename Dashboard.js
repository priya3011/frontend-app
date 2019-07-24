import React, { Component } from 'react';
import './Dashboard.scss';
import { LeftSidebar, TransferModal, DoughnutChart, LineChart, ChartTable, TransactionTable, Footer } from './../../components';

class Dashboard extends Component{
    constructor(props) {
        super(props);
         
    }
    componentDidMount() { // function called when page renders 
        setTimeout(() => {  // using set timeout function for setting timer for session
            alert("Your session has been expired, Please Login Again..!");  // Informing user abou session timeout
            this.props.history.push("/") 
        }, 60*60000); // setting up timeout duration for an hour
      }
  
    render(){
     

         return (
            <div className="dashboard-container">
                <div className="navigation">
                    <LeftSidebar/>
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
