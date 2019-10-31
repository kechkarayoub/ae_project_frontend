import FeedbackServer from '../utils/FeedbackServer';
import React, { Component } from 'react';
import Select from 'react-select';
import TestimonialService from '../../services/TestimonialService';
import { is_empty, formated_select_options } from '../../utils.js';
import './TestimonialCreate.scss';

const testimonialService = new TestimonialService();


class TestimonialCreate extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            errors: {
                "first_name": "",
                "last_name": "",
                "testimonial": ""
            },
            feedback_messages: [],
            selectedCity: { value: "montreal", label: "Montreal" },
            showFeedback: false
        };
    }
    componentWillReceiveProps(newProps){
        if(!newProps.collapse){
            this.setState({errors: {}});
        }
    }

    handleCityChange = selectedOption => {
        this.setState({ selectedCity: selectedOption });
    };

    handleSubmit(event) {
        var testimonial_object = {
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "testimonial": this.refs.testimonial.value,
        };
        this.handleValidate(testimonial_object);
        event.preventDefault();
    }

    handleCreate() {
        var self = this;
        testimonialService.create_testimonial({
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "city": this.state.selectedCity.label,
            "city_val": this.state.selectedCity.value,
            "testimonial": this.refs.testimonial.value
        }).then((result) => {
            self.props.handleTestimonialAdded(result.data);
        }).catch(() => {
            var feedback_messages = [this.props.t('contact.contact_create.feedback_message_1'), this.props.t('contact.contact_create.feedback_message_2')];
            this.setState({showFeedback: true, feedback_messages: feedback_messages});
        });
    }

    handleValidate(testimonial_object) {
        var errors = {};
        var valid_form = true;
        Object.keys(testimonial_object).forEach(function(key) {
            var value = testimonial_object[key];
            if(is_empty(value)){
                errors[key] = "This field is required!";
                valid_form = false;
            }
        });
        if(valid_form){
            this.handleCreate();
        }
        else{
            this.setState({ errors: errors });
        }
    }

    handleCloseFeedback() {
       this.setState({ showFeedback: false });
    }

    handleRemoveError(key) {
        var {errors} = this.state;
        errors[key] = "";
        this.setState({ errors: errors });
    }

    render() {
        const {selectedCity, errors, showFeedback, feedback_messages} = this.state;
        return (
            <div className="testimonial_form">
                <div className="form_title">
                    {this.props.t('testimonial.add_testimonial')}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <fieldset disabled={showFeedback}>
                        <div className="form-group">
                            <div className={"form_entry" + (errors.first_name ? " has_error" : "")}>
                                <label>{this.props.t('global.first_name')}</label>
                                <input className="form-control" type="text" ref='firstName' onFocus={() => this.handleRemoveError("first_name")}/>
                                {errors.first_name && <div className="field_required">{errors.first_name}</div>}
                            </div>

                            <div className={"form_entry" + (errors.last_name ? " has_error" : "")}>
                                <label>{this.props.t('global.last_name')}</label>
                                <input className="form-control" type="text" ref='lastName'  onFocus={() => this.handleRemoveError("last_name")}/>
                                {errors.last_name && <div className="field_required">{errors.last_name}</div>}
                            </div>

                            <div className="form_entry city">
                                <label>{this.props.t('global.city')}:</label>
                                <Select className="city_select" options={formated_select_options(this.props.cities)} value={selectedCity} onChange={this.handleCityChange} />
                            </div>

                            <div className={"form_entry message" + (errors.testimonial ? " has_error" : "")}>
                                <label>{this.props.t('testimonial.testimonial')}:</label>
                                <textarea className="form-control" ref='testimonial'  onFocus={() => this.handleRemoveError("testimonial")}></textarea>
                                {errors.testimonial && <div className="field_required">{errors.testimonial}</div>}
                            </div>
                            <div className="action">
                                <input className="btn btn-primary" type="submit" value={this.props.t('global.submit')} />
                                <button onClick={this.props.toggleCollapse}>{this.props.t('global.cancel')}</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <FeedbackServer showFeedback={showFeedback} feedback_success={false} feedback_messages={feedback_messages} handleCloseFeedback={() => this.handleCloseFeedback()}/>
            </div>
        );
    }
}

export default TestimonialCreate;
