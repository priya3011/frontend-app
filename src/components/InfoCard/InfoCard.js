import React, { Component } from 'react'
import './InfoCard.scss'

export default class InfoCard extends Component {


    render() {

        const { label, value } = this.props;
        return (
            <div className="info-container">
                <div className="info-label">{label}</div>
                <div className="info-value">{value}</div>
            </div>
        )
    }
}
