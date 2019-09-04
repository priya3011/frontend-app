import React, { Component } from 'react';
import { UncontrolledCollapse } from 'reactstrap';
import { Row, Col, Navbar,  Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ResponsiveSidebar.scss';
import { fetchAllInvestments } from '../../actions/investmentActions'
import { reset } from '../../actions/userActions'
//import Sidebar, {SidebarStyles} from 'react-sidebar';

import {    LeftSidebar } from './../../components'

class ResponsiveSidebar extends Component {
    static propTypes={
        ref_code: PropTypes.string.isRequired,
        fetchAllInvestments: PropTypes.func.isRequired,
        investments: PropTypes.array.isRequired
    };

    constructor(props){
      super(props);
      this.logout = this.logout.bind(this);

      this.state = {
          open: false
      }
    }

    componentWillMount(){
        
        this.props.fetchAllInvestments();
        

    }

    getCurrencyInvestmentMapping(){

        console.log("getCurrencyInvestmentMapping: ",this.props);
        let { investments } = this.props;
        let currencySet = new Set();

        investments.forEach(investment => {

            currencySet.add(investment.currency)
        });

        //sort the set
        currencySet = Array.from(currencySet).sort();

        let currencyInvestmentMapping = [];
        currencySet.forEach( currency => {

            let currencyInvestments = investments.filter( investment =>{
                return investment['currency']==currency;
            });

            currencyInvestmentMapping.push({
                currency: currency,
                investments: currencyInvestments

            });

        });

        return currencyInvestmentMapping
    }




    renderInvestmentsMenu(){



        // rearrange the investments
        const currencyInvestmentMapping = this.getCurrencyInvestmentMapping();



        const investmentsMenu = currencyInvestmentMapping.map( mapping =>{

            const { currency, investments } = mapping;

            

            return <div key={currency}><a href="" className="nav-link-top"><li  className="nav-item" id={currency} >
                            <i className="fa fa-chevron-right"></i>
                            <span href="">{mapping.currency}</span>
                    </li></a>
                     <UncontrolledCollapse toggler={"#"+currency}>
                        {  investments.map((i, idx) => {
                            return  (<li className="nav-item" key={i.investment_id} >
                            <Link to={{
                                    pathname: "/investment/"+i.investment_id,
                                    state:{
                                        
                                        investment_name: i.investment_name,
                                        currency:currency,
                                        index:idx
                                    }
                                    }} 
                                className="nav-link">{i.investment_name}</Link>
                            </li>)

                            })
                        }
                     </UncontrolledCollapse>

                     </div>




        });

        return investmentsMenu;

    }

  logout(){

    this.props.reset();
    this.props.history.push('/signin');
  }


  toggle(){
    this.setState({open: !this.state.open});
    if(this.state.open){
        document.body.style.overflow = "visible";
    } else {
        document.body.style.overflow = "hidden";

    }
  }

  render(){

    // console.log("mapping  ", this.getCurrencyInvestmentMapping());


    const InvestmentsMenu  = this.renderInvestmentsMenu();
    const ref_code = localStorage.getItem("ref_code");
    const username = localStorage.getItem("username");

    return (
        <div>
            <Navbar bg="dark" variant="dark" sticky="top" style={{top: 0, position: "fixed", width: "100%"}}>
                    <Col xs={6}>
                    <Navbar.Brand>
                        <Button variant="dark" onClick={()=>{this.toggle()}}>
                            <i className="fa fa-bars"></i>
                        </Button>
                    </Navbar.Brand>
                    </Col>
                    <Col xs={6}>
                    <Navbar.Brand>
                    <Navbar.Text>
                          Signed in as: <a >{`${username}`}</a>
                    </Navbar.Text>                    
                    </Navbar.Brand>
                    
                    </Col>
            </Navbar>
            
            { this.state.open &&
            <div id="overlay" onClick={()=>{this.setState({open: !this.state.open}); document.body.style.overflow = "hidden";}}>
                <div id="overlay-content">
                     <LeftSidebar  history={this.props.history} />
                </div>
            </div>
            }
           
        </div>
        
    );
  }
}

//map state of the store to the props
const mapStateToProps = state => ({
    
    investments: state.investment.all_investments,
    ref_code: state.user.ref_code
    // user: state.user.user_details
});

export default connect(mapStateToProps, { fetchAllInvestments, reset })(ResponsiveSidebar);
