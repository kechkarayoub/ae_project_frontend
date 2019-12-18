import NewsletterService from '../../services/NewsletterService';
import React, { Component } from 'react';
import { is_valid_email, is_empty } from '../../utils.js';
const newsletterService = new NewsletterService();

class NewsletterCreate extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            errors: {
                "first_name": "",
                "last_name": "",
                "email": ""
            },
            showFeedback: false,
            feedback_messages: [],
            feedback_success: true
        };
        this.handleInputClicked = this.handleInputClicked.bind(this);
        this.handleCloseFeedback = this.handleCloseFeedback.bind(this);
    }

    handleSubmit(event) {
        var newsletter_object = {
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value
        };
        this.handleValidate(newsletter_object);
        event.preventDefault();
    }

    handleCreate(object) {
        newsletterService.subscribe(object).then((result) => {
            var response_type = result.data.response_type;
            var feedback_messages = [this.props.t('footer.newsletter.create.welcome_message_1'), this.props.t('footer.newsletter.create.welcome_message_2')];
            if(response_type === "updated"){
                feedback_messages = [this.props.t('footer.newsletter.create.information_updated_message_1'), this.props.t('footer.newsletter.create.information_updated_message_2')];
            }
            else if(response_type === "reactivated"){
                feedback_messages = [this.props.t('footer.newsletter.create.reactivated_message_1'), this.props.t('footer.newsletter.create.reactivated_message_2')];
            }
            
            this.refs.firstName.value = "";
            this.refs.lastName.value = "";
            this.refs.email.value = "";
            this.setState({ 
                errors: {},
                feedback_messages: feedback_messages,
                showFeedback: true
            });
        }).catch((result) => {
            var errors = {};
            Object.keys(result.response.data).forEach((key) => {
                var value = result.response.data[key][0];
                errors[key] = value;
            });
            this.setState({ errors: errors });
        });
    }

    handleInputClicked = (e) => {
        if(e.target.parentNode.getElementsByClassName("field_required").length){
            var errors = this.state.errors;
            if(e.target.name === "first_name"){
                errors.first_name = "";
            }
            else if(e.target.name === "last_name"){
                errors.last_name = "";
            }
            else if(e.target.name === "email"){
                errors.email = "";
            }
            this.setState({errors: errors});
        }
    };

    handleCloseFeedback() {
       this.setState({ showFeedback: false });
    }

    handleValidate(newsletter_object) {
        var errors = {};
        var valid_form = true;
        Object.keys(newsletter_object).forEach((key) => {
            var value = newsletter_object[key].toString().trim();
            if (is_empty(value)) {
                errors[key] = this.props.t('global.field_required');
                valid_form = false;
            }
            else if(value){
                if(key === "email" && !is_valid_email(value)){
                    errors[key] = this.props.t('global.invalid_email');
                    valid_form = false;
                }
            }
        });
        if(valid_form){
            this.handleCreate(newsletter_object);
        }
        else{
            this.setState({ errors: errors });
        }
    }

    render() {
        const { errors, showFeedback, feedback_messages, feedback_success } = this.state;
        return (
            <div className="newsletter_form">
                <div className="form_title">
                    {this.props.t('footer.newsletter.create.title')}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">

                        <div className="form_entry">
                            <label>{this.props.t('global.first_name')}</label>
                            <input className="form-control" type="text" name="first_name" ref='firstName' style={{"borderColor": errors.first_name ? "red" : "#ced4da"}} onClick={this.handleInputClicked}/>
                            {errors.first_name && <div className="field_required">{errors.first_name}</div>}
                        </div>

                        <div className="form_entry">
                            <label>{this.props.t('global.last_name')}</label>
                            <input className="form-control" type="text" name="last_name" ref='lastName' style={{"borderColor": errors.last_name ? "red" : "#ced4da"}} onClick={this.handleInputClicked} />
                            {errors.last_name && <div className="field_required">{errors.last_name}</div>}
                        </div>

                        <div className="form_entry">
                            <label>{this.props.t('global.email')}</label>
                            <input className="form-control" type="text" name="email" ref='email'  style={{"borderColor": errors.email ? "red" : "#ced4da"}} onClick={this.handleInputClicked}/>
                            {errors.email && <div className="field_required">{errors.email}</div>}
                        </div>
                        <div className="action">
                            <input className="btn btn-primary" type="submit" value={this.props.t('global.submit')} />
                        </div>
                    </div>
                </form>
                <div className={showFeedback ? "feedback" : "feedback hidden"}>
                    <button className="close_feedback" onClick={this.handleCloseFeedback}>X</button>
                    <div className="content">
                        <div className="message" style={{color: feedback_success ? "#05b305" : "#d7362d"}}>
                            {feedback_messages.map((message, idx) => (
                                <p key={idx}>{message}</p>
                            ))}
                        </div>
                        <div className="action">
                            <button className="default-btn" onClick={this.handleCloseFeedback}>Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsletterCreate;
