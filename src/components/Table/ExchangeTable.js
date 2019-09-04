import React, { Component } from 'react'
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import { formatAmount } from '../../util/util'

import './Table.scss';
import 'react-table/react-table.css';


export default class ExchangeTable extends Component {

    static propTypes = {
        data : PropTypes.object.isRequired
    }


    render() {

        const { data, title }= this.props;

        const columns = [
            { 
                Header: 'Currency',
                id:'currency',
                accessor: 'currency',
            },
            {
                Header:'Bid',
                id:'bid',
                accessor: (data)=> formatAmount(+data.rate_in_cad.bid, true),
            },
            {
                Header:'Ask',
                id:'ask',
                accessor: (data)=> formatAmount(+data.rate_in_cad.ask, true),
            },
            // { 
            //    Header:'Rate in CAD',
            //    id:'rate_in_cad',
            //    accessor: (data)=> formatAmount(+data.rate_in_cad, true),
              
            // }
        ];

        if(JSON.stringify(data) === '{}')
            return <div className="transactiontable-container"></div> ;

        //else
        return (
            <div className="transactiontable-container marginTop-1vw">
                <div className="reacttable-container">
                    <div className="transaction-container">
                        <div className="table-title">{ title || "Currency Value"}</div>
                    </div>
                
                <div>
                    <ReactTable
                            className="-striped"
                            data={data}
                            columns={columns}
                            pageSize={data.length}
                            showPagination={false}
                            minRows={4}
                            noDataText={'No rates found'}
                            defaultSorted={[
                                {
                                  id: "currency",
                                  desc: false
                                }
                              ]}
                        />
                </div>
                </div>
            </div>
            
        )
    }
}
