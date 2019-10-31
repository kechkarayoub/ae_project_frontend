import ContactService from '../../services/ContactService';
import React, { Component } from 'react';
import ReactPhoneInput  from 'react-phone-input-2';
import { is_empty, is_valid_email } from '../../utils.js';
import 'react-phone-input-2/dist/style.css';
import './ContactCreate.scss'

const contactService = new ContactService();

class ContactCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                "first_name": "",
                "email": "",
                "last_name": "",
                "message": "",
                "object": "",
                "phone": ""
            },
            feedback_messages: [],
            feedback_success: true,
            object: props.object,
            property_id: props.property_id,
            showFeedback: false,
            title: props.title
        };
        this.handleCloseFeedback = this.handleCloseFeedback.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var contact_object = {
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "object": this.refs.object.value,
            "email": this.refs.email.value,
            "phone": this.refs.phone.value,
            "message": this.refs.message.value
        };
        if(this.refs.propertyUrl){
            contact_object.property_url = this.refs.propertyUrl.value;
        }
        this.handleValidate(contact_object);
    }

    handleCreate(object) {
        contactService.contact(object).then((result) => {
            if(result.data.success){
                var feedback_messages = [this.props.t('contact.contact_create.message_sent'), this.props.t('contact.contact_create.will_answer_client')];
                
                this.refs.firstName.value = "";
                this.refs.lastName.value = "";
                this.refs.email.value = "";
                this.refs.object = this.state.object || this.props.t('contact.contact_create.get_informations');
                this.refs.message.value = "";
                Array.from(this.refs.phone.parentNode.getElementsByTagName('input')).map(input => {
                    input.value = "";
                });
                this.setState({ 
                    errors: {},
                    feedback_messages: feedback_messages,
                    showFeedback: true,
                    feedback_success: true
                });
            }
        }).catch(() => {
            var feedback_messages = [this.props.t('contact.contact_create.feedback_message_1'), this.props.t('contact.contact_create.feedback_message_2')];
            this.setState({
                feedback_messages: feedback_messages,
                showFeedback: true,
                feedback_success: false
            });
        });
    }

    handleCloseFeedback() {
       this.setState({ showFeedback: false });
    }

    handleValidate(contact_object) {
        var errors = {};
        var valid_form = true;
        Object.keys(contact_object).forEach((key) => {
            var value = contact_object[key].trim();
            if (is_empty(value) && ["phone", "property_url"].indexOf(key) === -1) {
                errors[key] = this.props.t('global.field_required');
                valid_form = false;
            }
            else if(value){
                if (key === "phone" && !true){
                    errors[key] = this.props.t('global.invalid_phone');
                    valid_form = false;
                }
                else if(key === "email" && !is_valid_email(value)){
                    errors[key] = this.props.t('global.invalid_email');
                    valid_form = false;
                }
            }
        });
        if(valid_form){
            this.handleCreate(contact_object);
        }
        else{
            this.setState({ errors: errors });
        }
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
            else if(e.target.name === "object"){
                errors.object = "";
            }
            else if(e.target.name === "message"){
                errors.message = "";
            }
            this.setState({errors: errors});
        }
    };

    render() {
        const { property_id, errors, title, object, showFeedback, feedback_messages, feedback_success } = this.state;
        const property_url = property_id ? "/property/" + property_id : "";
        const reference_number = property_id ? this.props.t('contact.contact_create.reference_number') + property_id : "";
        const added_class = this.props.is_contact_page ? " contact_page" : " sell_page";
        return (
            <div className={"contact_sell_form" + added_class}>
                <div className="form_title">
                    {title || this.props.t('contact.contact_create.contact_form')}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <fieldset disabled={showFeedback}>
                        <div className="form-group">

                            <div className={"form_entry" + (errors.first_name ? " has_error" : "")}>
                                <label>{this.props.t('global.first_name')}</label>
                                <input className="form-control" type="text" ref='firstName' name='first_name' onClick={this.handleInputClicked}/>
                                {errors.first_name && <div className="field_required">{errors.first_name}</div>}
                            </div>

                            <div className={"form_entry" + (errors.last_name ? " has_error" : "")}>
                                <label>{this.props.t('global.last_name')}</label>
                                <input className="form-control" type="text" ref='lastName' name='last_name' onClick={this.handleInputClicked}/>
                                {errors.last_name && <div className="field_required">{errors.last_name}</div>}
                            </div>

                            <div className={"form_entry" + (errors.object ? " has_error" : "")}>
                                <label>{this.props.t('contact.contact_create.object')}</label>
                                <input className="form-control" type="text" ref='object' defaultValue={object || this.props.t('contact.contact_create.get_informations')} name='object' onClick={this.handleInputClicked} />
                                {errors.object && <div className="field_required">{errors.object}</div>}
                            </div>

                            <div className={"form_entry phone" + (errors.phone ? " has_error" : "")}>
                                <label>{this.props.t('global.phone')}</label>
                                <input className="form-control hidden" type="text" ref='phone' name='phone' onClick={this.handleInputClicked}/>
                                <ReactPhoneInput
                                    defaultCountry="ca"
                                    value={this.refs.phone ? this.refs.phone.value : ""}
                                    onChange={(value) =>
                                        this.refs.phone.value = value
                                    }
                                    onClick={this.handleInputClicked}
                                />
                                {errors.phone && <div className="field_required">{errors.phone}</div>}
                            </div>

                            <div className={"form_entry" + (errors.email ? " has_error" : "")}>
                                <label>{this.props.t('global.email')}</label>
                                <input className="form-control" type="text" ref='email' name='email' onClick={this.handleInputClicked} />
                                {errors.email && <div className="field_required">{errors.email}</div>}
                            </div>

                            <div className={"form_entry message" + (errors.message ? " has_error" : "")}>
                                <label>{this.props.t('contact.contact_create.message')}:</label>
                                <textarea className="form-control" ref='message' defaultValue={reference_number} name='message' onClick={this.handleInputClicked}></textarea>
                                {errors.message && <div className="field_required">{errors.message}</div>}
                            </div>
                            {property_url &&
                            <div className="form_entry hidden">
                                <input className="form-control" ref='propertyUrl' defaultValue={property_url} />
                            </div>
                            }
                            <div className="action">
                                <input className="btn btn-primary" type="submit" value={this.props.t('global.submit')} />
                            </div>
                        </div>
                    </fieldset>
                </form>
                <div className={showFeedback ? "feedback" : "feedback hidden"}>
                    <button className="close_feedback" onClick={this.handleCloseFeedback}>X</button>
                    <div className="content_">
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

export default ContactCreate;
