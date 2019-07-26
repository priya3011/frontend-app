import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import './Dashboard.scss';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap'; //importing bootstrap lib
import { LeftSidebar, TransferModal, DoughnutChart, LineChart, ChartTable, TransactionTable, Footer } from './../../components';
import {SignIn} from '..'
class Dashboard extends React.Component{
    constructor(props){
        super(props)
          this.state ={
              refCode : "",
          }
    }
    componentDidMount() { // function called when page renders 
        const {user} = this.props.location;
    
        setTimeout(() => {  // using set timeout function for setting timer for session
            alert("Your session has been expired, Please Login Again..!");  // Informing user abou session timeout
            this.props.history.push("/") 
        }, 60*60000); // setting up timeout duration for an hour
        console.log(user);
        fetch('http://178.128.233.31/frontend/user_data/'+user) //fetching ref_code for loggedin user
.then(response => response.json())
.then(data => {
    let code = data.ref_code;
    this.setState({refCode : code});
 console.log(code);
 
})
.catch(error => console.error(error))

}
  
    render(){
      //  console.log(this.state.username);
      const {user} = this.props.location;
    //  const code = this.state.refCode;
  //  const {code} = code;
     // console.log(code);
//console.log(user);
         return (
            <div className="dashboard-container">
                <div className="navigation">
                    <LeftSidebar/>
                </div>
                <div className="content-wrapper" id="content-div">
                <Card className="m-5">
        <CardBody>  
          <CardTitle>Hello, {user}</CardTitle>
          <CardSubtitle>Your referance Code is :</CardSubtitle>
          <CardText className="text-info">{this.state.refCode}</CardText>
        </CardBody>
      </Card>
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

export default withRouter(Dashboard);
