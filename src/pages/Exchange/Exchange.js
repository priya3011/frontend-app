import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import {   
    LeftSidebar,
    Footer,
    CustomSnackbar,
    ExchangeTable,
    ExchangeForm,
    SimpleChart } from './../../components';

import { getExchangeRates, getRatesInCAD } from '../../service/axios-service'
import './Exchange.scss'



//TODO:
//1, Set a timer to update the exchange rates ---done 
//2. Pass exchange rates as props to components ---done
//3. Add a snackbar  

export default class Exchange extends Component {

    constructor(props){
        super(props);
        this.state = {
            exchange_rates:[],
            rates_in_cad:[],
            rates_history:[],
            isAlertVisible : false,
            alertType:'',
            alertMessage:'',
            time_period_chart:30
        };

        this.fetchFxQuotedRates = this.fetchFxQuotedRates.bind(this);
        this.fetchRatesInCAD = this.fetchRatesInCAD.bind(this);
        this.updateRateHistory = this.updateRateHistory.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
    }

    componentDidMount(){
    
        this.updateInfoTimer = setInterval(() => this.updateInfo(), 60*1000);
        this.updateInfo();
    }

    componentWillUnmount(){

        clearInterval(this.updateInfoTimer);
    }

    showAlert(message, type){
        this.setState({ alertMessage:message, alertType:type, isAlertVisible:true });
    }

    dismissAlert(){
        this.setState({ isAlertVisible: false });
    }

    updateInfo(){
        this.fetchFxQuotedRates();
        this.fetchRatesInCAD();
        this.updateRateHistory();
    }

    updateRateHistory(){

    }


    fetchRatesInCAD(){
        getRatesInCAD()
        .then((res)=>{
            this.setState({rates_in_cad: res.data.rates});
        })
        .catch((err)=>{
            //triggers a state change which will refresh all components
            // this.showAlert(err.response.data.code,'error');
        });
    }


    fetchFxQuotedRates(){

        getExchangeRates()
        .then((res)=>{
            this.setState({exchange_rates: res.data.rates});
        })
        .catch((err)=>{
            //triggers a state change which will refresh all components
            // this.showAlert(err.response.data.code,'error');
        });
    }


    render() {

        const { exchange_rates, rates_in_cad, rates_history, isAlertVisible, alertType, alertMessage, time_period_chart } = this.state;

        return (
            <div className="main-container">
                <CustomSnackbar open={isAlertVisible} variant={alertType} message={alertMessage} onClose={this.dismissAlert}></CustomSnackbar>
                <div className="navigation">
                    <LeftSidebar history={this.props.history} />
                </div>
                <Container  className="content-wrapper" id="content-div">
                    <div className="page-content">
                        <Row >
                            <ExchangeForm exchange_rates={exchange_rates} showAlert={this.showAlert} ></ExchangeForm>
                        </Row>

                        <Row>
                            <ExchangeTable data={rates_in_cad}></ExchangeTable>
                        </Row>
                        <Row>
                            <SimpleChart chartTitle={"Currency"} data={rates_history} dataType="rates" chartType="line"  refreshData={this.updateRateHistory} interval={time_period_chart}></SimpleChart>
                        </Row>
                           

                        
                    </div>

            
                    <Row><Col lg={12} md={12} sm={12} className="footer-container"><Footer history={this.props.history} /></Col></Row>

                </Container>
                
                
            </div>
        )
    }
}
