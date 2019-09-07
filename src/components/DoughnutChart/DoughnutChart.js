import React, { Component } from 'react';
/* import { Doughnut } from 'react-chartjs-2'; */
import Highcharts from 'highcharts';
import  HighchartsReact  from 'highcharts-react-official';
import PropTypes from 'prop-types';

import './DoughnutChart.scss';
import { doughnutChart } from '../../service/extractData'
import { formatAmount } from '../../util/util'
import { COLORS } from '../../config/config'

export default class DoughnutChart extends Component {
    static propTypes = {
        data : PropTypes.object.isRequired
    }

    constructor(props){
        super(props);

    }

    componentDidMount(){
    }

    render(){
        const { data } = this.props;

        //console.log("DATA:" + JSON.stringify(data))
        const chartData = doughnutChart(data)
        //console.log("DATA:" + JSON.stringify(chartData))
        const options={
            colors: COLORS,
            chart: {
                events: { redraw:true},
                type: 'pie',
                /* width: 560,
                height: 399.74,
                className: 'highcharts-img'  */
                // spacingBottom: 15,
                // spacingTop: 20,
                // spacingLeft: 10,
                // spacingRight: 10,
                margin: null,
                width: null,
                height: "auto",
                style: { 'font-family': 'Lato', 'font-size': '0.6771vw'}
            },
            credits: { enabled: false},
            title: {
                text: "<b>Total</b><br/><b>Investments</b>",
                verticalAlign: 'middle',
                style: { "font-size": "0.8rem"},
                y: -5
            },
            series: [ {showInLegend: false, size: "80%", innerSize: '50%', data: chartData, name:""} ],
            tooltip: {
                enabled: true,
                valueDecimals: 2,
                valuePrefix: '$'
            },
            plotOptions:{
                pie:{
                    dataLabels:{
                        enabled: true,
                        formatter:function(){
                            return '<b style="color:'+ this.color+'">'+ this.point.name +'</b><br><b style="color:'+ this.color+'">$'+ formatAmount((this.point.y).toFixed(2),true)+' CAD</b>';
                        }
                    },
                    
                }
            },
           
            responsive: {
                rules:[
                    {
                        condition: {
                            maxWidth: 360
                        },
                        chartOptions:{
                            plotOptions:{
                                pie:{
                                    dataLabels:{
                                        enabled: false,
                                    }
                                }
                            },
                            series: [ {showInLegend:true , size: "100%", innerSize: '50%'} ],
                            legend: {
                                enabled: true,
                                //layout: 'horizontal',
                                align: 'center',
                                //alignColumn:false,
                                verticalAlign: 'bottom',
                                //labelFormatter: (obs) => {return obs} 
                            },
                            title: {
                                text: "<b>Total</b><br/><b>Investments</b>",
                                verticalAlign: 'middle',
                                style: { "font-size": "0.8rem"},
                                y: -60
                            },
                        }
                        
                     }
                ]
            }
        }
        return (
            <div className="doughnut-container pt-sm-5 pt-lg-0 pt-md-3 pt-1">
                <div className="doughnut-wrapper">
                    <HighchartsReact
                        highcharts = { Highcharts }
                        options = { options }
                    />
                </div>
            </div>
        );
    }


    getData(){
        return {
            datasets: [{
                data: [10, 20, 30],
                backgroundColor: Object.values(this.getLabelsAndColors())
            }],
            labels: Object.keys(this.getLabelsAndColors())
        };
    }

    getOptions(){
        return {
            responsive: true,
            maintainAspectRatio: true
        }
    }

    getLegend(){
        return {
            position: 'bottom'
        };
    }

    getLabelsAndColors() {
        return {
            'Red': '#FF6384',
            'Blue': '#36A2EB',
            'Yellow': '#FFCE56'
        }
    }
}
