import React from 'react';
import './TestimonialItem.css';


const TestimonialItem = (props) => (
    <div className="testimonial">
        <div className="name_el">
            <div className="initials" style={{backgroundColor: props.testimonialItem.initials_bg_color, color: props.testimonialItem.initials_color,}}>
                {props.testimonialItem.first_name.charAt(0)}{props.testimonialItem.last_name.charAt(0)}
            </div>
            <div className="name">
                {props.testimonialItem.first_name} {props.testimonialItem.last_name }
            </div>
        </div>
        <div className="testimonial_content">
            {props.testimonialItem.testimonial }
        </div>
        <div className="testimonial_time_el">
            {props.testimonialItem.city_val &&
                <div className="testimonial_city">
                    {props.testimonialItem.city },
                </div>
            }
            <div className="testimonial_time">
                {props.testimonialItem.createdAt }
            </div>

        </div>
    </div>
)


export default TestimonialItem;
