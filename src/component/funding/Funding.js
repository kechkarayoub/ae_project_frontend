import FundingList from './FundingList';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import './Funding.css';


class Funding extends Component {
    constructor(props){
        super(props);
        document.title = props.t('header.nav.funding');
    }
    render() {
        return (

            <div>
                <FundingList {...this.props}/>
            </div>
        );
    }
}

export default withTranslation('common')(Funding);
