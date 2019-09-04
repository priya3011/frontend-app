import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import {   
    LeftSidebar,
    Footer,
    CustomSnackbar,
    InfoCard,
    TransferModal,
    TransactionTable,
    SimpleChart } from './../../components';
import { getAccountDetails, getTransactionHistory, getAccountBalanceHistory} from '../../service/axios-service';
import { formatAmount } from '../../util/util'
import { INVESTMENT_USER } from '../../config/config'
import './Investment.scss'

//TODO: 
//1. Connect it to the user investments store -- currency, investment name, 
//2. Create an API to get the user investment details -- account balance, exchange rate
//3. API to get the investment balance history
//4. Modify Transfer modal if investment id is passed, dont show the dropdown , otherwise do show the dropdown 

export default class Investment extends Component {

    constructor(props){
        super(props);
        this.state ={
            //for notification
            isAlertVisible : false,
            alertType:'',
            alertMessage:'',

            //to display investment related info
            investment_id:'',
            investment_name:'',
            currency:'',
            account_id:'',
            account_details : [],
            account_tx_history:[],
            account_balance_history:{ balance_history:[]},

            linechart_time_days: 180
        };

        this.dismissAlert = this.dismissAlert.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.updateAccountInfo = this.updateAccountInfo.bind(this);
        this.updateTransactionHistory = this.updateTransactionHistory.bind(this);
        this.updateAccountBalanceHistory = this.updateAccountBalanceHistory.bind(this);
    }

    componentDidMount(){

        //TODO: set a timer for update
        this.updateInfoTimer = setInterval(() => this.updateAccountInfo(), 60*1000);
        this.updateAccountInfo();
    }

    componentDidUpdate(prevProps, prevState){

        if(prevProps.match.params.investment_id != this.props.match.params.investment_id)
            this.updateAccountInfo();
    }

    componentWillUnmount() {
        clearInterval(this.updateInfoTimer);
      }

    updateAccountInfo(){
        
        console.log("update balance")
        //fetch the account details
        
        const { investment_id } = this.props.match.params

        const level =  localStorage.getItem("user_level");
        const username = level == 0? INVESTMENT_USER :localStorage.getItem("username");
        

        getAccountDetails({username, investment_id})
        .then((res)=>{
            
            this.setState({account_details: res.data.account},

                ()=>{
                    this.updateTransactionHistory(res.data.account.account_id);
                    this.updateAccountBalanceHistory(this.state.linechart_time_days);
                }
                );
           
        })
        .catch((err)=>{
            //triggers a state change which will refresh all components
            this.showAlert(err.response.data.code,'error');
        });



    }

    updateTransactionHistory(account_id){
        
        const level =  localStorage.getItem("user_level");
        let requestData = level == 0 ? { investment_id : this.props.match.params.investment_id} : { account_id}
        getTransactionHistory(requestData)
        .then((res)=>{
            
            this.setState({account_tx_history: res.data});
        })
        .catch((err)=>{
            //triggers a state change which will refresh all components
            this.showAlert(err.response.data.code,'error');
        });

    }

    updateAccountBalanceHistory(time_period_days){

        
        if(time_period_days)
            this.setState({linechart_time_days: time_period_days},
            ()=>{   
                const { linechart_time_days } = this.state;
                const { account_id } = this.state.account_details;
                getAccountBalanceHistory({account_id, time_period_days:parseInt(linechart_time_days), chart:true})
                .then((res)=>{
                
                    this.setState({account_balance_history: res.data});
                })
                .catch((err)=>{
                    //triggers a state change which will refresh all components
                    this.showAlert(err.response.data.code,'error');
                });
                
            });
    }


    showAlert(message, type){
        this.setState({ alertMessage:message, alertType:type, isAlertVisible:true });
    }


    dismissAlert(){
        this.setState({ isAlertVisible: false });
    }

    render() {

        
        
        const { investment_id } = this.props.match.params
        const { investment_name, currency, index } = this.props.location.state;
        const { isAlertVisible, alertType, alertMessage, account_details, account_tx_history, account_balance_history, linechart_time_days } = this.state;

        console.log("investment_id ",investment_id)

        console.log("account_balance_history",account_balance_history.balance_history)
        return (
            <div className="main-container">
                <CustomSnackbar open={isAlertVisible} variant={alertType} message={alertMessage} onClose={this.dismissAlert}></CustomSnackbar>
                <div className="navigation">
                    <LeftSidebar history={this.props.history} />
                </div>
                <Container  className="content-wrapper" id="content-div">
                    <div className="page-content">
                        <Row style={{justifyContent:"space-between", height: "fit-content"}}>
                            <Col lg={4} md={4} sm={12} className="auto-height" ><InfoCard label={investment_name+" Balance"} value={formatAmount(account_details.account_balance)}></InfoCard></Col>
                            <Col lg={4} md={4} sm={12} className="auto-height" ><InfoCard label={currency+" / CAD"} value={formatAmount(account_details.exchange_rate,true)}></InfoCard></Col>
                            <Col lg={4} md={4} sm={12} className="auto-height" ><InfoCard label="CAD VALUE" value={"$"+formatAmount(account_details.account_balance_cad, true)}></InfoCard></Col>
                        </Row>

                        <Row>
                            <SimpleChart chartType="line" dataType="balance" data={account_balance_history} index={index}  investmentName={investment_name} chartTitle={investment_name} refreshData={this.updateAccountBalanceHistory} interval={linechart_time_days}></SimpleChart>
                        </Row>

                        <Row>
                            <TransactionTable data={account_tx_history} mask={false}></TransactionTable>
                        </Row>

                        <Row>
                            <TransferModal showAlert={this.showAlert} investment_id={investment_id} onSuccess={this.updateAccountInfo}></TransferModal>
                        </Row>
                    </div>

            
                    <Row><Col lg={12} md={12} sm={12} className="footer-container"><Footer history={this.props.history} /></Col></Row>

                </Container>
                
                
            </div>
        )
    }
}
