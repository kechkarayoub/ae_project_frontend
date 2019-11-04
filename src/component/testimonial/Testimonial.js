import React, { Component } from 'react';
import TestimonialList from './TestimonialsList';
import './Testimonial.scss';


class Testimonial extends Component {
    render() {
        return (

            <div>
                <TestimonialList {...this.props}/>
            </div>
        );
    }
}

export default Testimonial;
