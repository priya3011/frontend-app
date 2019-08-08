import React, { Component } from 'react';
import Highcharts from 'highcharts';
import  HighchartsReact  from 'highcharts-react-official';
import PropTypes from 'prop-types';

import './LineChart.scss';
import { lineChart } from '../../service/extractData'

export default class LineChart extends Component {
    state = {
        showLineChart: true
    }

    static propTypes = {
        data : PropTypes.object.isRequired
    }

    handleChange = (e)=>{
        this.props.intervalChange(e);
    }

    handleClickLineChart = ()=>{
        this.setState({ showLineChart: true});
    }

    handleClickMountainChart = ()=>{
        this.setState({ showLineChart: false});
    }

    render(){
        const { data, interval } = this.props;
        const { showLineChart } = this.state;
        const chartData = lineChart(data, interval);

        const lineOptions={
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
                type: 'datetime',
                gridLineWidth: 1,
                max: Date.now(),
                min: Date.now()-interval*24*60*60*1000,
                endOnTick: true,
                dateTimeLabelFormats: {
                    /* millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M', */
                    day: '%y-%m-%d',
                    /* week: '%m-%d',
                    month: '%Y-%m',
                    year: '%Y' */
                }
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

            }
        }

        const mountainOptions={
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
                type: 'datetime',
                gridLineWidth: 1,
                max: Date.now(),
                min: Date.now()-interval*24*60*60*1000,
                endOnTick: true,
                dateTimeLabelFormats: {
                    /* millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M', */
                    day: '%y-%m-%d',
                    /* week: '%m-%d',
                    month: '%Y-%m',
                    year: '%Y' */
                }
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

            },
        }

        let showOne = <HighchartsReact
                        highcharts = { Highcharts }
                        options = { lineOptions }
                    />;
        if(!showLineChart) 
        showOne = <HighchartsReact
                    highcharts = { Highcharts }
                    options = { mountainOptions }
                />;

        return (
            <div className="line-chart-container">
                <div className="line-chart-wrapper">
                    <div className="line-chart-controls">
                        <div onClick={this.handleClickLineChart} style={{"color": showLineChart? "blue" : "black"}}>Line Chart View</div>
                        <div onClick={this.handleClickMountainChart} style={{"color": !showLineChart? "blue" : "black"}}>Mountain Chart View</div>
                        <div>
                            <select name="interval" value={ this.props.interval } onChange={ this.handleChange }>
                                <option value='30'>Last 30 Days</option>
                                <option value='60'>Last 60 Days</option>
                                <option value='90'>Last 90 Days</option>
                                <option value='180'>Last 180 Days</option>
                                <option value='365'>Last 1 year</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        { showOne}
                    </div>
                </div>
            </div>
        );
    }
}