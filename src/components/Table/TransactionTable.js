import React, { Component} from 'react';
import './Table.scss';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Pagination from './Pagination';

import PropTypes from 'prop-types';
import { transactionTable } from '../../service/extractData'


export default class TransactionTable extends Component {
    state = {
        entries: '10',
        search: ''
    }
    static propTypes = {
        data : PropTypes.object.isRequired
    }

    handleChange = (e)=>{
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        const { entries, search } = this.state;
        const { data }= this.props;
        const tableData = transactionTable(data, entries, search)
        const columns = [
            { id: 'date', Header: 'Date', 
                accessor:(data) => {
                    return new Date(data.time).toLocaleDateString();
                }
            },
            { Header: 'Investment??', accessor: 'type' },
            { Header: 'Description', accessor: 'description' },
            { id:'amount', Header: 'Amount', 
                accessor: (data) => {
                    return (+data.amount).toFixed(2);
                } 
            },
            { id: 'amountcad', Header: 'Amount in CAD',
                accessor: (data) => {
                    return '$' + (+data.account_balance).toFixed(2);
                }
        }]
       return(
            <div className="transactiontable-container">
                <div className="reacttable-container">
                    <div className="transaction-container">
                        <div className="table-title">Transaction History</div>
                        <div className="table-filters">
                            <div>
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
                            </div>
                        </div>
                    </div>
                    <div>
                       <ReactTable 
                        className="-striped"
                        PaginationComponent={Pagination}
                        data={tableData}
                        columns={columns}
                        pageSize={+entries}
                        showPagination={true}
                        resizable={true}
                        />
                    </div>
                </div>
            </div>
            );
        }
}
