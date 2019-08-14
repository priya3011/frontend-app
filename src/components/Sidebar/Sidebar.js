import React, { Component } from 'react';
import { UncontrolledCollapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Sidebar.scss';
import { fetchAllInvestments } from '../../actions/investmentActions'
//import Sidebar, {SidebarStyles} from 'react-sidebar';

class LeftSidebar extends Component {
    static propTypes={
        ref_code: PropTypes.string.isRequired,
        fetchAllInvestments: PropTypes.func.isRequired
    };

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

            return <div><li  className="nav-item" id={currency}>
                            <i className="fa fa-chevron-right"></i>
                            <span href="">{mapping.currency}</span>
                    </li>
                     <UncontrolledCollapse toggler={"#"+currency}>
                        {  investments.map(i => {
                            return  (<li className="nav-item" id={i.investment_id}>
                            <Link to="/dashboard" className="nav-link">{i.investment_name}</Link>
                            </li>)

                            })
                        }
                     </UncontrolledCollapse>

                     </div>




        });

        return investmentsMenu;

    }



// {/* <li className="nav-item">
//                     <i className="fa fa-chevron-right"></i>
//                     <span>CLAM</span>
//                 </li>
//                 <li className="nav-item">
//                     <i className="fa fa-chevron-right"></i>
//                     <span>BTC</span>
//                 </li>
//                 <li className="nav-item">
//                     <i className="fa fa-chevron-right"></i>
//                     <span>CAD</span>
//                 </li>
//                 <li className="nav-item">
//                     <i className="fa fa-chevron-right"></i>
//                     <span>USD</span>
//                 </li>
//                 <li className="nav-item">
//                     <i className="fa fa-chevron-right"></i>
//                     <span>GOLD</span>
//                 </li> */}
  render(){

    // console.log("mapping  ", this.getCurrencyInvestmentMapping());


    const InvestmentsMenu  = this.renderInvestmentsMenu();
    return (
        <div className="sidebar-container">
        <ul className="sidebar navbar-nav" >
                <div className="navigation-type">
                <li className="nav-item">
                    <i className="fa fa-home"></i>
                    <span>Dashboard</span>
                </li>

                <li className="nav-item">
                    <i className="fa fa-empire"></i>
                    {/* <i class="fas fa-steering-wheel"></i> */}
                    <span>Affiliates</span>
                </li>
                <li className="nav-item">
                    <i className="fa fa-clock-o"></i>
                    <span>Stats</span>
                </li>

                <li className="nav-item">
                <i className="fa fa-line-chart"></i>
                    <span>Exchange</span>
                </li>
                </div>
                <div className="Currency-type">
                    {InvestmentsMenu}
                </div>
                <div className="other-containt">
                <li className="nav-item">
                    <i className="fa fa-envelope-square"></i>
                    <span>Contact</span>
                </li>
                <li className="nav-item">
                    <i className="fa fa-sign-out"></i>
                    <span>Logout</span>
                </li>
                <li className="nav-item">
                    <span>Referral Code: {this.props.ref_code}</span>
                </li>
                </div>
            </ul>

    </div>
    );
  }
}

//map state of the store to the props
const mapStateToProps = state => ({
    //reducer name is post
    investments: state.investment.all_investments
    // user: state.user.user_details
});

export default connect(mapStateToProps, { fetchAllInvestments })(LeftSidebar);
