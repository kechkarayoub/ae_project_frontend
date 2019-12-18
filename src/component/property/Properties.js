import ItemsList from './ItemsList';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import './Properties.css';


class Properties extends Component {
    constructor(props){
        super(props);
        document.title = props.t('header.nav.properties');
    }
    render() {
        return (
            <ItemsList {...this.props} />
        );
    }
}

export default withTranslation('common')(Properties);
