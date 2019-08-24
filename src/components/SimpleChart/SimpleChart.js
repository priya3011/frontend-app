import React, { Component } from 'react';
import Highcharts from 'highcharts';
import  HighchartsReact  from 'highcharts-react-official';
import { lineChartSingleSeries } from '../../service/extractData';

import { COLORS } from '../../config/config'
import './SimpleChart.scss';



export default class SimpleChart extends Component {

    constructor(props){
        
        super(props);
        this.state = {
            interval:this.props.interval.toString(),
            data: this.props.data}
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange = (e)=>{

        console.log(e.target.value);
        let newInterval = e.target.value;
        this.setState({interval:newInterval},
        this.props.refreshData(newInterval));

        

    }



    render() {

        const { data, investment_name, index} = this.props;
        const { interval } = this.state;
        const chartData = lineChartSingleSeries(investment_name, data, interval);

        console.log(COLORS[index%COLORS.length])

        let startDate = new Date().setHours(0,0,0,0) -(interval)*24*60*60*1000;
        let endDate = new Date().setHours(0,0,0,0);

        const lineOptions={
            colors: [COLORS[index%COLORS.length]],
            chart: {
                type: 'line',
                spacingBottom: 15,
                spacingTop: 10,
                spacingLeft: 10,
                spacingRight: 10,
                margin: null,
                width: null,
                height: null,
                style: { 'font-family': 'Lato', 'font-size': '0.6771vw'}
            },
            credits: { enabled: false},
            title: { text: null },
            series: chartData,
            tooltip: {
                enabled: true,
                valueDecimals: 2,
                valuePrefix: '$'
            },
            xAxis: {
                tickmarkPlacement:"on",
                showFirstLabel:true,
                showLastLabel:true,
                // labels :{step:interval-1},
                type: 'datetime',
                gridLineWidth: 1,
                // max: endDate,
                // min: startDate,
                // startOnTick: false,
                // endOnTick: false,
                // dateTimeLabelFormats: {
                //     /* millisecond: '%H:%M:%S.%L',
                //     second: '%H:%M:%S',
                //     minute: '%H:%M',
                //     hour: '%H:%M', */
                //     // day: '%d-%m-%y',
                //     /* week: '%m-%d',
                //     month: '%Y-%m',
                //     year: '%Y' */
                // }
            },
            yAxis: [{
                lineWidth: 1,
                title: {
                    text: null
                }
            }, {
                lineWidth: 1,
                opposite: true,
                title: {
                    text: null
                }
            }],
            plotOptions: {

                series:{pointStart: startDate},

            }
        }


        return (
            <div className="simple-chart-container">
            <div className="simple-chart-wrapper">
                <div className="simple-chart-controls">
                    <div style={{display: 'inline-flex'}}>
                      <div onClick={this.handleClickLineChart} className="chart-title">{investment_name}</div>
                     
                    </div>
                  <div>
                        <select name="interval" className="chart-dropdown" value={ this.state.interval } onChange={ this.handleChange }>
                            <option value='30'>Last 30 Days</option>
                            <option value='60'>Last 60 Days</option>
                            <option value='90'>Last 90 Days</option>
                            <option value='180'>Last 180 Days</option>
                            <option value='365'>Last 1 year</option>
                        </select>
                    </div>
                </div>
                <div>
                <HighchartsReact
                        highcharts = { Highcharts }
                        options = { lineOptions }
                        
                    />
                </div>
            </div>
        </div>
        )
    }
}
