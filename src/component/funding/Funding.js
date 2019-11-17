import React, { Component } from 'react';
import FundingList from './FundingList';
import './Funding.css';


class Funding extends Component {
    render() {
        return (

            <div>
                <FundingList {...this.props}/>
            </div>
        );
    }
}

export default Funding;
