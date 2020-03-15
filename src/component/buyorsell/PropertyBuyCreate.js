import BuyOrSellService from '../../services/BuyOrSellService';
import DatePicker, { registerLocale } from "react-datepicker";
import fr from 'date-fns/locale/fr';
import React, { Component } from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import Select from 'react-select';
import store from 'store';
import { formated_select_options, is_empty, is_valid_email } from '../../utils.js';
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-input-2/lib/style.css';
import "./PropertyBuyCreate.css";

const current_langue = store.get('current_langue');
if(current_langue === "fr"){
    registerLocale('fr', fr)
}
const buyOrSellService = new BuyOrSellService();

class PropertyBuyCreate extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            errors: {
                "email": "",
                "first_name": "",
                "last_name": "",
                "phone": ""
            },
            feedback_messages: [],
            feedback_success: true,
            occupationDate: new Date(),
            selectedBathroomsNumber: { value: "", label: this.props.t('global.select_bathrooms_number_choice_0') },
            selectedBedroomsNumber: { value: "", label: this.props.t('global.select_bedrooms_number_choice_0') },
            selectedBuildingType: { value: "", label: this.props.t('global.select_building_type_choice_0') },
            selectedCity: { value: "montreal", label: "Montreal" },
            selectedConstructionAge: { value: "", label: this.props.t('global.select_construction_age_choice_0') },
            selectedPriceRange: { value: "", label: this.props.t('global.select_price_ranges_choice_0') },
            selectedPropertyType: { value: "", label: this.props.t('global.select_property_type_choice_0') },
            selectedStatus: { value: "", label: this.props.t('global.select_choice_0') },
            showFeedback: false
        };
    }

    handleCityChange = selectedOption => {
        this.setState({ selectedCity: selectedOption });
    };

    handlePropertyTypeChange = selectedOption => {
        this.setState({ selectedPropertyType: selectedOption });
    };

    handleStatusChange = selectedOption => {
        this.setState({ selectedStatus: selectedOption });
    };

    handleBuildingTypeChange = selectedOption => {
        this.setState({ selectedBuildingType: selectedOption });
    };

    handleConstructionAgeChange = selectedOption => {
        this.setState({ selectedConstructionAge: selectedOption });
    };

    handleBedroomsNumberChange = selectedOption => {
        this.setState({ selectedBedroomsNumber: selectedOption });
    };

    handleBathroomsNumberChange = selectedOption => {
        this.setState({ selectedBathroomsNumber: selectedOption });
    };

    handlePriceRangeChange = selectedOption => {
        this.setState({ selectedPriceRange: selectedOption });
    };

    handleOccupationDateChange = value => {
        this.setState({ occupationDate: value });
    };

    handleSubmit(event) {
        var property_buy_object = {
            "first_name": this.refs.firstName.value,
            "last_name": this.refs.lastName.value,
            "email": this.refs.email.value,
            "phone": this.refs.phone.value
        };
        this.handleValidate(property_buy_object);
        event.preventDefault();
    }

    handleValidate(property_buy_object) {
        var errors = {};
        var valid_form = true;
        Object.keys(property_buy_object).forEach((key) => {
            var value = property_buy_object[key];
            if(is_empty(value) && key !== "phone"){
                errors[key] = this.props.t('global.field_required');
                valid_form = false;
            }
            else if(value){
                if(key === "phone" && !true){
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
            this.handleCreate();
        }
        else{
            this.setState({ errors: errors });
        }
    }

    handleCloseFeedback() {
       this.setState({ showFeedback: false });
    }

    removeError = key => {
        var {errors} = this.state;
        errors[key] = "";
        this.setState({errors: errors});
    }

    handleCreate() {
        buyOrSellService.wanttobuy(
            {
                "first_name": this.refs.firstName.value,
                "last_name": this.refs.lastName.value,
                "email": this.refs.email.value,
                "phone": this.refs.phone.value,
                "city": this.state.selectedCity.value,
                "city_text": this.state.selectedCity.label,
                "occupation_date": this.state.occupationDate.getDate() + "-" + 
                    this.state.occupationDate.getMonth() + "-" + this.state.occupationDate.getFullYear(),
                "property_type": this.state.selectedPropertyType.value,
                "property_type_text": this.state.selectedPropertyType.label,
                "building_type": this.state.selectedBuildingType.value,
                "building_type_text": this.state.selectedBuildingType.label,
                "construction_age": this.state.selectedConstructionAge.value,
                "construction_age_text": this.state.selectedConstructionAge.label,
                "item_status": this.state.selectedStatus.value,
                "item_status_text": this.state.selectedStatus.label,
                "bedrooms_number": this.state.selectedBedroomsNumber.value,
                "bedrooms_number_text": this.state.selectedBedroomsNumber.label,
                "bathrooms_number": this.state.selectedBathroomsNumber.value,
                "bathrooms_number_text": this.state.selectedBathroomsNumber.label,
                "lot_size_min": this.refs.lotSizeMin.value,
                "lot_size_max": this.refs.lotSizeMax.value,
                "price_range": this.state.selectedPriceRange.value,
                "price_range_text": this.state.selectedPriceRange.label,
                "has_dining_room": this.refs.hasDiningRoom.checked,
                "has_fireplace": this.refs.hasFireplace.checked,
                "has_garage": this.refs.hasGarage.checked,
                "has_swimming_pool": this.refs.hasSwimmingPool.checked,
                "has_garden": this.refs.hasGarden.checked,
                "other_characteristics": this.refs.otherCharacteristics.value
            }).then((result) => {
                var feedback_messages = [this.props.t('contact.contact_create.message_sent'), this.props.t('contact.contact_create.will_answer_client')];
                this.setState({ 
                    errors: {},
                    feedback_messages: feedback_messages,
                    showFeedback: true,
                    feedback_success: true
                }, () => {
                    this.refs.form.reset();
                });
            }).catch(() => {
                var feedback_messages = [this.props.t('contact.contact_create.feedback_message_1'), this.props.t('contact.contact_create.feedback_message_2')];
                this.setState({
                    feedback_messages: feedback_messages,
                    showFeedback: true,
                    feedback_success: false
                });
            });
    }

    render() {
        const { selectedCity, selectedPropertyType, selectedStatus, selectedBuildingType, selectedConstructionAge, selectedBedroomsNumber, selectedBathroomsNumber, selectedPriceRange, errors,  showFeedback, feedback_messages, feedback_success} = this.state;
        return (
            <div className="contact_buy_form">
                <form onSubmit={this.handleSubmit}  ref='form'>
                <fieldset disabled={this.state.showFeedback}>
                    <div className="left-side">
                        <div className="coordinates">
                            <h2>{this.props.t('buyorsell.buy_create.coordinates')}</h2>
                            <div className={"form_entry" + (errors.first_name ? " has_error" : "")}>
                                <label>{this.props.t('global.first_name')}</label>
                                <input className="form-control" type="text" ref='firstName' onFocus={() => this.removeError("first_name")}/>
                                {errors.first_name && <div className="field_required">{errors.first_name}</div>}
                            </div>

                            <div className={"form_entry" + (errors.last_name ? " has_error" : "")}>
                                <label>{this.props.t('global.last_name')}</label>
                                <input className="form-control" type="text" ref='lastName' onFocus={() => this.removeError("last_name")} />
                                {errors.last_name && <div className="field_required">{errors.last_name}</div>}
                            </div>

                            <div className={"form_entry" + (errors.phone ? " has_error" : "")}>
                                <label>{this.props.t('global.phone')}</label>
                                <input className="form-control hidden" type="text" ref='phone'  onFocus={() => this.removeError("phone")}/>
                                <ReactPhoneInput
                                    country={"ca"}
                                    value={this.refs.phone ? this.refs.phone.value : ""}
                                    onChange={(value) =>
                                        this.refs.phone.value = value
                                    }
                                />
                                {errors.phone && <div className="field_required">{errors.phone}</div>}
                            </div>

                            <div className={"form_entry" + (errors.email ? " has_error" : "")}>
                                <label>{this.props.t('global.email')}</label>
                                <input className="form-control" type="text" ref='email'  onFocus={() => this.removeError("email")}/>
                                {errors.email && <div className="field_required">{errors.email}</div>}
                            </div>
                        </div>
                        <div className="general_information">
                            <h2>{this.props.t('property.general_information')}</h2>

                            <div className="form_entry">
                                <label>{this.props.t('global.city')}</label>
                                <Select className="select_container" options={formated_select_options(this.props.selects_choices.CITIES)} value={selectedCity} onChange={this.handleCityChange}/>
                            </div>

                            <div className="form_entry">
                                <label>{this.props.t('properties.property_type')}:</label>
                                <Select className="select_container" options={formated_select_options(this.props.selects_choices.PROPERTIES_TYPES)} value={selectedPropertyType} onChange={this.handlePropertyTypeChange} />
                            </div>

                            <div className="form_entry">
                                <label>{this.props.t('properties.status')}:</label>
                                <Select className="select_container" options={formated_select_options(this.props.selects_choices.ITEMS_STATUS, true)} value={selectedStatus} onChange={this.handleStatusChange} />
                            </div>

                            <div className="form_entry">
                                <label>{this.props.t('properties.building_type')}:</label>
                                <Select className="select_container" options={formated_select_options(this.props.selects_choices.BUILDINGS_TYPES)} value={selectedBuildingType} onChange={this.handleBuildingTypeChange} />
                            </div>

                            <div className="form_entry">
                                <label>{this.props.t('properties.construction_age')}:</label>
                                <Select className="select_container" options={formated_select_options(this.props.selects_choices.CONSTRUCTION_AGE)} value={selectedConstructionAge} onChange={this.handleConstructionAgeChange} />
                            </div>

                            <div className="form_entry">
                                <label>{this.props.t('properties.price_ranges')}:</label>
                                <Select className="select_container" options={formated_select_options(this.props.selects_choices.PRICES_RANGES)} value={selectedPriceRange} onChange={this.handlePriceRangeChange} />
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="details">
                            <h2>{this.props.t('buyorsell.buy_create.details')}</h2>
                            <div className="form_entry">
                                <label>{this.props.t('properties.bedrooms_number')}:</label>
                                <Select className="select_container" options={formated_select_options(this.props.selects_choices.BEDROOMS_NUMBER)} value={selectedBedroomsNumber} onChange={this.handleBedroomsNumberChange} />
                            </div>

                            <div className="form_entry">
                                <label>{this.props.t('properties.bathrooms_number')}:</label>
                                <Select className="select_container" options={formated_select_options(this.props.selects_choices.BATHROOMS_NUMBER)} value={selectedBathroomsNumber} onChange={this.handleBathroomsNumberChange} />
                            </div>

                            <div className="form_entry">
                                <label>{this.props.t('property.lot_size')} min(m²):</label>
                                <input className="form-control" type="number" min="0" ref='lotSizeMin' />
                            </div>

                            <div className="form_entry">
                                <label>{this.props.t('property.lot_size')} max(m²):</label>
                                <input className="form-control" type="number" min="0" ref='lotSizeMax' />
                            </div>

                            <div className="form_entry">
                                <label>{this.props.t('properties.occupation_date')}:</label>
                                <DatePicker 
                                    locale={current_langue}
                                    dateFormat={current_langue === "en" ? "MM/dd/yyyy" : "dd/MM/yyyy"}
                                    selected={this.state.occupationDate} 
                                    onChange={this.handleOccupationDateChange}
                                />
                                {/* <input className="form-control" type="text" ref='occupationDate' /> */}
                            </div>

                            <div className="form_entry">
                                <label>{this.props.t('properties.card_item.dining_room')}:</label>
                                <input className="form-control" type="checkbox" ref='hasDiningRoom' />
                                <span className="checkmark"></span>
                            </div>

                            <div className="form_entry">
                                <label>{this.props.t('properties.card_item.fireplace')}:</label>
                                <input className="form-control" type="checkbox" ref='hasFireplace' />
                                <span className="checkmark"></span>
                            </div>

                            <div className="form_entry">
                                <label>{this.props.t('properties.card_item.garage')}:</label>
                                <input className="form-control" type="checkbox" ref='hasGarage' />
                                <span className="checkmark"></span>
                            </div>

                            <div className="form_entry">
                                <label>{this.props.t('properties.card_item.swimming_pool')}:</label>
                                <input className="form-control" type="checkbox" ref='hasSwimmingPool' />
                                <span className="checkmark"></span>
                            </div>

                            <div className="form_entry">
                                <label>{this.props.t('properties.card_item.garden')}:</label>
                                <input className="form-control" type="checkbox" ref='hasGarden' />
                                <span className="checkmark"></span>
                            </div>

                            <div className="form_entry message">
                                <label>{this.props.t('properties.card_item.other_characteristics')}:</label>
                                <textarea className="form-control" ref='otherCharacteristics' rows="5"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="action_buy">
                        <input className="btn btn-primary" type="submit" value={this.props.t('global.submit')} />
                    </div>
                </fieldset>
                </form>
                <div className={showFeedback ? "feedback" : "feedback hidden"}>
                    <button className="close_feedback" onClick={() => this.handleCloseFeedback()}>X</button>
                    <div className="content_">
                        <div className="message" style={{color: feedback_success ? "#05b305" : "#d7362d"}}>
                            {feedback_messages.map((message, idx) => (
                                <p key={idx}>{message}</p>
                            ))}
                        </div>
                        <div className="action">
                            <button className="default-btn" onClick={() => this.handleCloseFeedback()}>Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PropertyBuyCreate;
