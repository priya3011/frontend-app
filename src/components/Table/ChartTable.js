import React, { Component} from 'react';
import './Table.scss';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import PropTypes from 'prop-types';

class ChartTable extends Component {
    static propTypes = {
        data : PropTypes.object.isRequired
    }

    render(){
        const { data }= this.props;

        var CADSum = 0;
        if(JSON.stringify(data) !== '{}'){
            for(let i=0; i<data.user_balance.length; i++){        
                CADSum += +(data.user_balance[i].balance_cad);
            }
        }        
        const columns = [
            { accessor: 'investment_id',
              Footer: <span>{'Total in CAD'}</span>}, 
            { id: 'balance',
              accessor: (data)=> (+data.balance).toFixed(2)},
            { id: 'balance_cad',
              accessor: (data) =>'$' + (+data.balance_cad).toFixed(2),
              Footer: <span>{`$${CADSum.toFixed(2)}`}</span>}
        ]

        if(JSON.stringify(data) === '{}')
            return <div className="Charttable-container"></div> ;
        else  if(typeof(data.code) !== 'undefined')
            if( data.code === "Success" )
                return(
                    <div className="Charttable-container">
                        <ReactTable 
                            className="-striped"
                            data={data.user_balance}
                            columns={columns}
                            pageSize={data.user_balance.length}
                            showPagination={false}
                        />
                    </div>
                )
    }
}
export default ChartTable;
