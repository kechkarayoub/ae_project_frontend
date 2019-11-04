import React, { Component } from 'react';
import ItemsList from './ItemsList';
import './Properties.scss';


class Properties extends Component {

    render() {
        return (
            <ItemsList {...this.props} />
        );
    }
}

export default Properties;
