import React, { Component } from 'react';
import TestimonialList from './TestimonialsList';
import { withTranslation } from 'react-i18next';
import './Testimonial.css';


class Testimonial extends Component {
    constructor(props){
        super(props);
        document.title = props.t('header.nav.testimonial');
    }
    render() {
        return (

            <div>
                <TestimonialList {...this.props}/>
            </div>
        );
    }
}

export default withTranslation('common')(Testimonial);
