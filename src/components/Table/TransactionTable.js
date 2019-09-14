import React, { Component} from 'react';
import './Table.scss';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Pagination from './Pagination';

import PropTypes from 'prop-types';
import { transactionTable } from '../../service/extractData'
import { formatAmount } from '../../util/util'

import {Row, Col, } from 'react-bootstrap'


export default class TransactionTable extends Component {
    state = {
        entries: 10,
        search: ''
    }
    static propTypes = {
        data : PropTypes.object.isRequired
    }

    handleChange = (e)=>{
        let { name, value } = e.target;

        if(name == 'entries')
            value = parseInt(value)

        this.setState({ [name]: value });
    }

    render(){
        const { entries, search } = this.state;
        const { data , title, mask }= this.props;
        const tableData = transactionTable(data, search);
        
        // console.log(tableData && tableData.length < entries)
        // let pageSize = entries;
        // if(tableData && tableData.length < entries)
        //     pageSize=entries;

        const columns = [
            { 
                id: 'date', 
                Header: 'Date', 
                Cell: row => (
                    <div style={{whiteSpace:"normal", wordBreak:"normal"}}>
                        {row.value.toLocaleDateString()}
                    </div>
                    ),
                accessor:(data) => {
                    return new Date(data.time)
                },

            },
            { Header: 'Investment', accessor: 'investment_name' },
            { Header: 'Description', accessor: mask? 'transaction_type': 'description' },
            { id:'amount', Header: 'Amount', 
                accessor: (data) => {
                    return formatAmount(+data.amount);
                } ,
                sortMethod: (a, b) => {

                    console.log("cad: ",a,b)
                    let numericA = parseFloat(a.replace(/[^0-9.]+/g,''));
                    let numericB = parseFloat(b.replace(/[^0-9.]+/g,''));

                    return numericA > numericB ? 1 : -1;
                }
            },
            { id: 'amountcad', Header: 'Amount in CAD',
                accessor: (data) => {
                    return '$' + formatAmount((+data.amount_cad).toFixed(2),true);
                },
                sortMethod: (a, b) => {

                    console.log("cad: ",a,b)
                    let numericA = parseFloat(a.replace(/[^0-9.]+/g,''));
                    let numericB = parseFloat(b.replace(/[^0-9.]+/g,''));

                    return numericA > numericB ? 1 : -1;

                }
        }]
       return(
            <div className="transactiontable-container">
                <div className="reacttable-container">
                    <div className="transaction-container">
                        <div className="table-title">{ title || "Transaction History"}</div>
                        <div className="table-filters">
                            <Row style={{width:"100%", justifyContent: "space-between"}}>
                                <Col xs={6} md={6} lg={6}>
                                <div>
                                <form className="form-inline">
                                    <label>Show&nbsp;</label>
                                    <select name="entries" style={{width: "auto"}} className="custom-select my-1 mr-sm-2 transaction-select-control" value={entries} onChange={this.handleChange}>
                                        <option value='10'>10</option>
                                        <option value='20'>20</option>
                                        <option value='30'>30</option>
                                        <option value='40'>40</option>
                                        <option value='50'>50</option>
                                    </select>
                                    <label>&nbsp;entries</label>
                                </form>                                
                                </div>
                                </Col>
                                <Col xs={6} md={4} lg={3}>
                                <div className="search-container">
                                <div className="form-group">
                                    <input name="search" style={{width:"100%"}} className="form-control trasaction-input-control" placeholder="Search" value={search} onChange={this.handleChange}></input>
                                </div>
                                </div>
                                </Col>

                            </Row>
                            {/* <div>
                                <form className="form-inline">
                                    <label>Show&nbsp;</label>
                                    <select name="entries" className="custom-select my-1 mr-sm-2 transaction-select-control" value={entries} onChange={this.handleChange}>
                                        <option value='10'>10</option>
                                        <option value='20'>20</option>
                                        <option value='30'>30</option>
                                        <option value='40'>40</option>
                                        <option value='50'>50</option>
                                    </select>
                                    <label>&nbsp;entries</label>
                                </form>                                
                            </div>
                            <div className="search-container">
                                <div className="form-group">
                                    <input name="search" className="form-control trasaction-input-control" placeholder="Search" value={search} onChange={this.handleChange}></input>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div>
                       <ReactTable 
                        className="-striped"
                        PaginationComponent={Pagination}
                        data={tableData}
                        columns={columns}
                        pageSize={entries}
                        showPagination={true}
                        resizable={true}
                        minRows={0}
                        />
                    </div>
                </div>
            </div>
            );
        }
}
  // pageSize={ (entries > tableData.length) ? tableData.length : entries}