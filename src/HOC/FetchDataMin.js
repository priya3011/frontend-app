import React, { Component } from 'react';
import { FETCH_DATA_INTERVAL } from '../config/config'

export default function FetchDataMin(WrappedComponents, axios_services, data, interval){
    /**
     * Accept "interval" argument and modify body data for LineChart Component
     */
    if(interval){
        let username = data.username;
        data = { username, time_period_days:+interval };
    }
    return class extends Component{
        state = { data: {}};
        
        getData = ()=>axios_services(data)
                        .then((res)=>{
                            console.log(res.data)
                            this.setState({data: res.data})
                        })
                        .catch((err)=>{
                            alert(`No data available.`)
                        });

        setFetchDataInterval = ()=>setInterval(this.getData, FETCH_DATA_INTERVAL);
        
        componentDidMount(){
            this.getData();
            this.setFetchDataInterval();
        }
        
        render(){
            return <WrappedComponents data = {this.state.data} { ...this.props}/>
        }
    }
}