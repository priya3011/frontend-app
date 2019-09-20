import React, { Component } from 'react';
import { UncontrolledCollapse } from 'reactstrap';
import { Button, Collapse } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Sidebar.scss';
import { fetchAllInvestments } from '../../actions/investmentActions'
import { reset, logout } from '../../actions/userActions'
//import Sidebar, {SidebarStyles} from 'react-sidebar';

class LeftSidebar extends Component {
    static propTypes={
        ref_code: PropTypes.string.isRequired,
        fetchAllInvestments: PropTypes.func.isRequired,
        investments: PropTypes.array.isRequired,
        logout: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired
    };

    constructor(props){
      super(props);
    //   this.logout = this.logout.bind(this);

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

                            console.log("idx", idx);
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




  render(){

    // console.log("mapping  ", this.getCurrencyInvestmentMapping());
    const InvestmentsMenu  = this.renderInvestmentsMenu();
    const ref_code = localStorage.getItem("ref_code");

    return (
       
        <div className="sidebar-container">
        <ul className="sidebar navbar-nav scroll" >
                <div className="navigation-type">

                <li className="nav-item">
                    <i className="fa fa-home"></i>
                    <Link to="/dashboard" className="nav-link-top">Dashboard</Link>

                </li>
                
                <li className="nav-item">
                    <i className="fa fa-empire"></i>
                    {/* <i class="fas fa-steering-wheel"></i> */}
                    <Link to="/affiliate" className="nav-link-top">Affiliate</Link>
                </li>
                <li className="nav-item">
                    <i className="fa fa-clock-o"></i>
                    <Link to="/stats" className="nav-link-top">Stats</Link>
                </li>

                <li className="nav-item">
                <i className="fa fa-line-chart"></i>
                    <Link to="/exchange" className="nav-link-top">Exchange</Link>
                </li>
                </div>
                <div className="Currency-type">
                    {InvestmentsMenu}
                </div>
                <div className="other-containt">
                <li className="nav-item">
                    <i className="fa fa-envelope-square"></i>
                    <Link to="/contact" className="nav-link-top">Contact</Link>
                </li>
                <li className="nav-item" onClick={this.props.logout}>
                    <i className="fa fa-sign-out"></i>
                    <a href="#" className="nav-link-top">Logout</a>
                </li>
                <li className="nav-item">
                    <span>Referral Code: {ref_code}</span>
                </li>
                </div>
            </ul>
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

export default connect(mapStateToProps, { fetchAllInvestments, reset, logout })(LeftSidebar);
