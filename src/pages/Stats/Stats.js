import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {  
    ResponsiveSidebar, 
    LeftSidebar,
    Footer,
    CustomSnackbar,
    InfoCard,
    TransactionTable,
    SimpleChart,
    DoughnutChart,
    ExchangeTable,
    ChartTable } from './../../components';
import { getTransactionHistory, getTotalUser, getDailyRegisteredUsers, getOverviewTableData} from '../../service/axios-service';
import { INVESTMENT_USER } from '../../config/config';
import { getRatesInCAD } from '../../service/axios-service'
import './Stats.scss'


export default class Stats extends Component {

    constructor(props){
        super(props);
        this.state={
            rates_in_cad:[],
            user_history:[],
            tx_history:{},
            overall_balance:{},
            user_count:0,
            time_period_chart:365
        }

        this.updateInfo = this.updateInfo.bind(this);
        this.updateTxHistory = this.updateTxHistory.bind(this);
        this.updateUserCount = this.updateUserCount.bind(this);
        this.updateRegisteredUserHistory = this.updateRegisteredUserHistory.bind(this);
        this.updataOverallBalance = this.updataOverallBalance.bind(this);
        this.fetchRatesInCAD = this.fetchRatesInCAD.bind(this);

    }

    componentDidMount(){
        this.updateInfoTimer = setInterval(() => this.updateInfo(), 60*1000);
        this.updateInfo();
    }

    componentWillUnmount(){
        clearInterval(this.updateInfoTimer);
    }

    fetchRatesInCAD(){
        getRatesInCAD()
        .then((res)=>{
            console.log(res.data.rates);
            this.setState({rates_in_cad: res.data.rates});
        })
        .catch((err)=>{
            //triggers a state change which will refresh all components
            // this.showAlert(err.response.data.code,'error');
        });
    }
    updateInfo(){
        this.updateUserCount();
        this.updateTxHistory();
        this.updateRegisteredUserHistory();
        this.fetchRatesInCAD();
        this.updataOverallBalance();
    }

    updataOverallBalance(){
        getOverviewTableData({key:"username", value:INVESTMENT_USER})
        .then((res)=>{
            this.setState({overall_balance: res.data});
        })
        .catch((err)=>{
            //triggers a state change which will refresh all components
            // this.showAlert(err.response.data.code,'error');
        });
    }

    updateUserCount(){
        getTotalUser()
        .then((res)=>{
            this.setState({user_count: res.data.user_count});
        })
        .catch((err)=>{
            //triggers a state change which will refresh all components
            // this.showAlert(err.response.data.code,'error');
        });
    }
    updateTxHistory(){
        getTransactionHistory()
        .then((res)=>{
            
            this.setState({tx_history: res.data});
        })
        .catch((err)=>{
            //triggers a state change which will refresh all components
            // this.showAlert(err.response.data.code,'error');
        });
    }

    updateRegisteredUserHistory(newInterval){

        let time_period_days = this.state.time_period_chart;

        if(newInterval)
            time_period_days = parseInt(newInterval);
            this.setState({time_period_chart:time_period_days});
        
        getDailyRegisteredUsers({time_period_days})
        .then((res)=>{
            
            this.setState({user_history: res.data.stats});
        })
        .catch((err)=>{
            //triggers a state change which will refresh all components
            // this.showAlert(err.response.data.code,'error');
        });
    }

    render() {

        // const { isAlertVisible, alertType, alertMessage, account_details, account_tx_history, account_balance_history, linechart_time_days } = this.state;
        const { tx_history, user_count, user_history, overall_balance,  time_period_chart, rates_in_cad} = this.state;

        return (
            <div>

            <div className="navigation d-md-none d-sm">
                    <ResponsiveSidebar  history={this.props.history} />
            </div>

            <div className="dashboard-container">
               
                <div className="navigation  d-none d-md-block">
                    <LeftSidebar history={this.props.history} />
                </div>
                <Container fluid={true}  className="content-wrapper" id="content-div">
                    <Container >
                    <div className="page-content">
                        <Row style={{marginTop:"10px"}}>
                            <Col lg={6} md={12} sm={12} style={{paddingLeft:0}}><ChartTable data={overall_balance}></ChartTable></Col>
                            <Col lg={6} md={12} sm={12} className="hidescroll"><DoughnutChart data={overall_balance}></DoughnutChart></Col>
                        </Row>
                        <Row>
                            <ExchangeTable data={rates_in_cad}></ExchangeTable>
                        </Row>
                        <Row>
                            <TransactionTable data={tx_history} title={"Site Wide Transactions"} mask={true}></TransactionTable>
                        </Row>
                        <Row>
                            <SimpleChart chartTitle={"Total Users"} data={user_history} dataType="users" chartType="area" index={0} refreshData={this.updateRegisteredUserHistory} interval={time_period_chart}></SimpleChart>
                        </Row>
                        <Row style={{justifyContent:"space-between", height: "fit-content", marginTop:"10px", marginBottom:"30px"}}>
                            <Col lg={4} md={4} sm={4} className="auto-height" style={{paddingLeft:0}} ><InfoCard label={"Total Users"} value={user_count+" Users"}></InfoCard></Col>
                            <Col lg={8} md={8} sm={8} className="auto-height" ></Col>
                        </Row>
                    </div>
                    </Container>
                    <Row><Col lg={12} md={12} sm={12} className="footer-container"><Footer history={this.props.history} /></Col></Row>

                </Container>
                
                
            </div>
            </div>

        )
    }
}
