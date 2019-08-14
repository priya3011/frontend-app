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

    render(){
        const { data } = this.props;
        const chartData = doughnutChart(data)
        const options={
            colors: COLORS,
            chart: {
                type: 'pie',
                /* width: 560,
                height: 399.74,
                className: 'highcharts-img'  */
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
            title: {
                text: "<b>Total</b><br/><b>Investments</b>",
                verticalAlign: 'middle',
                style: { "font-size": "0.8rem"},
                y: -5
            },
            series: [ { size: '80%', innerSize: '50%', data: chartData} ],
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
                            return '<b style="color:'+ this.color+'">'+ this.point.name +'</b><br><b style="color:'+ this.color+'">$'+ formatAmount((this.point.y).toFixed(2))+' CAD</b>';
                        }
                    }
                }
            }
        }
        return (
            <div className="doughnut-container">
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
