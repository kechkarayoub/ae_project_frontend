import  React, { Component } from  'react';
import ItemsService from "../../services/ItemsService";
import Item from './Item';
import './ItemsList.scss';
import SearchField from "react-search-field";
import Select from 'react-select';
import { formated_select_options } from '../../utils.js';
import TitlePage from '../utils/TitlePage';
import { withTranslation, Trans } from 'react-i18next';
const itemsService = new ItemsService();

class ItemsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            filter_collapsed: true,
            selectedCity: { value: "", label: this.props.t('global.select_city_choice_0') },
            selectedPropertyType: { value: "", label: this.props.t('global.select_property_type_choice_0') },
            selectedStatus: { value: "", label: this.props.t('global.select_choice_0') },
            selectedBuildingType: { value: "", label: this.props.t('global.select_building_type_choice_0') },
            selectedConstructionAge: { value: "", label: this.props.t('global.select_construction_age_choice_0') },
            selectedBedroomsNumber: { value: "", label: this.props.t('global.select_bedrooms_number_choice_0') },
            selectedBathroomsNumber: { value: "", label: this.props.t('global.select_bathrooms_number_choice_0') },
            selectedPriceRange: { value: "", label: this.props.t('global.select_price_ranges_choice_0') },
            properties_params: {
                searched_txt: "",
                city: "",
                property_type: "",
                building_type: "",
                construction_age: "",
                item_status: "",
                bedrooms_number: "",
                bathrooms_number: "",
                price_range: "",
                has_dining_room: "",
                has_fireplace: "",
                has_garage: "",
                has_swimming_pool: "",
                has_garden: ""
            },
            properties_params_values: {
                searched_txt: "",
                city: "",
                property_type: "",
                building_type: "",
                construction_age: "",
                item_status: "",
                bedrooms_number: "",
                bathrooms_number: "",
                price_range: "",
                has_dining_room: "",
                has_fireplace: "",
                has_garage: "",
                has_swimming_pool: "",
                has_garden: ""
            },
            current_page: 0,
            items: [],
            nextPageURL: '',
            prevPageURL: '',
            selects_choices_dict: props.selects_choices_dict,
            selects_choices: props.selects_choices,
            count: 0
        };
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.toggleFilterCollapse = this.toggleFilterCollapse.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.refreshProperties = this.refreshProperties.bind(this);
        this.handleHasDiningRoomYesChange = this.handleHasDiningRoomYesChange.bind(this);
        this.handleHasDiningRoomNoChange = this.handleHasDiningRoomNoChange.bind(this);
        this.handleHasFireplaceYesChange = this.handleHasFireplaceYesChange.bind(this);
        this.handleHasFireplaceNoChange = this.handleHasFireplaceNoChange.bind(this);
        this.handleHasGarageYesChange = this.handleHasGarageYesChange.bind(this);
        this.handleHasGarageNoChange = this.handleHasGarageNoChange.bind(this);
        this.handleHasSwimmingPoolYesChange = this.handleHasSwimmingPoolYesChange.bind(this);
        this.handleHasSwimmingPoolNoChange = this.handleHasSwimmingPoolNoChange.bind(this);
        this.handleHasGardenYesChange = this.handleHasGardenYesChange.bind(this);
        this.handleHasGardenNoChange = this.handleHasGardenNoChange.bind(this);
        this.handleBodyScrollBottom = this.handleBodyScrollBottom.bind(this);
        this.renderNoItemsMessage = this.renderNoItemsMessage.bind(this);
    }


    async componentDidMount() {
        var self = this;
        await itemsService.getItems(self.state.properties_params).then(function (result) {
            self.setState({ ready: true, items:  result.data, count: result.count, current_page: result.current_page, nextPageURL:  result.nextLink, prevPageURL:  result.prevLink})
        });
        window.addEventListener('scroll', this.handleBodyScrollBottom, true);
    }

    componentWillUnmount() {
        // window.getElementsByTagName('html')[0].removeEventListener('scroll', this.handleBodyScrollBottom);
    }

    handleBodyScrollBottom(e) {
        let element = e.target.scrollingElement;
        if (element.scrollHeight - element.scrollTop === element.clientHeight + document.getElementsByTagName('footer')[0].scrollHeight + 40) {
            if(this.state.count > this.state.items.length){
                this.refreshProperties(true);
            }
        }
    }

    handleCityChange = selectedOption => {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        properties_params.city = selectedOption.value;
        properties_params_values.city = selectedOption.label;
        this.setState({ properties_params: properties_params,  properties_params_values: properties_params_values, selectedCity: selectedOption });
        this.refreshProperties();
    };


    handlePropertyTypeChange = selectedOption => {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        properties_params.property_type = selectedOption.value;
        properties_params_values.property_type = selectedOption.label;
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values, selectedPropertyType: selectedOption });
        this.refreshProperties();
    };

    handleStatusChange = selectedOption => {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        properties_params.item_status = selectedOption.value;
        properties_params_values.item_status = selectedOption.label;
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values, selectedStatus: selectedOption });
        this.refreshProperties();
    };


    handleBuildingTypeChange = selectedOption => {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        properties_params.building_type = selectedOption.value;
        properties_params_values.building_type = selectedOption.label;
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values, selectedBuildingType: selectedOption });
        this.refreshProperties();
    };


    handleConstructionAgeChange = selectedOption => {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        properties_params.construction_age = selectedOption.value;
        properties_params_values.construction_age = selectedOption.label;
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values, selectedConstructionAge: selectedOption });
        this.refreshProperties();
    };


    handleBedroomsNumberChange = selectedOption => {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        properties_params.bedrooms_number = selectedOption.value;
        properties_params_values.bedrooms_number = selectedOption.label;
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values, selectedBedroomsNumber: selectedOption });
        this.refreshProperties();
    };


    handleBathroomsNumberChange = selectedOption => {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        properties_params.bathrooms_number = selectedOption.value;
        properties_params_values.bathrooms_number = selectedOption.label;
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values, selectedBathroomsNumber: selectedOption });
        this.refreshProperties();
    };


    handlePriceRangeChange = selectedOption => {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        properties_params.price_range = selectedOption.value;
        properties_params_values.price_range = selectedOption.label;
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values, selectedPriceRange: selectedOption });
        this.refreshProperties();
    };

    refreshProperties(is_paginator) {
        var self = this;
        var params = self.state.properties_params;
        params.current_page = is_paginator ? self.state.current_page : 0;
        itemsService.getItems(params).then(function (result) {
            var new_items = is_paginator ? self.state.items.concat(result.data) : result.data;
            self.setState({ ready: true, items: new_items, count: result.count, current_page: result.current_page, nextPageURL: result.nextLink, prevPageURL: result.prevLink })
        });
    }

    nextPage(){
        var  self  =  this;
        itemsService.getItemsByURL(this.state.nextPageURL, this.state.properties_params).then((result) => {
            self.setState({ items:  result.data, nextPageURL:  result.nextLink, prevPageURL:  result.prevLink})
        });
    }

    toggleFilterCollapse() {
        this.setState({
            filter_collapsed: !this.state.filter_collapsed,
        });
    }

    handleSearchInput(input_text) {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        properties_params.searched_txt = input_text;
        properties_params_values.searched_txt = input_text;
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values });
        this.refreshProperties();
    }

    handleHasDiningRoomYesChange(event) {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        if (event.target.checked) {
            properties_params.has_dining_room = true;
            properties_params_values.has_dining_room = true;
        }
        else {
            properties_params.has_dining_room = "";
            properties_params_values.has_dining_room = "";
        }
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values, });
        this.refreshProperties();
    }

    handleHasDiningRoomNoChange(event) {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        if (event.target.checked) {
            properties_params.has_dining_room = false;
            properties_params_values.has_dining_room = false;
        }
        else {
            properties_params.has_dining_room = "";
            properties_params_values.has_dining_room = "";
        }
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values });
        this.refreshProperties();
    }

    handleHasFireplaceYesChange(event) {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        if (event.target.checked) {
            properties_params.has_fireplace = true;
            properties_params_values.has_fireplace = true;
        }
        else {
            properties_params.has_fireplace = "";
            properties_params_values.has_fireplace = "";
        }
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values });
        this.refreshProperties();
    }

    handleHasFireplaceNoChange(event) {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        if (event.target.checked) {
            properties_params.has_fireplace = false;
            properties_params_values.has_fireplace = false;
        }
        else {
            properties_params.has_fireplace = "";
            properties_params_values.has_fireplace = "";
        }
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values });
        this.refreshProperties();
    }

    handleHasGarageYesChange(event) {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        if (event.target.checked) {
            properties_params.has_garage = true;
            properties_params_values.has_garage = true;
        }
        else {
            properties_params.has_garage = "";
            properties_params_values.has_garage = "";
        }
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values });
        this.refreshProperties();
    }

    handleHasGarageNoChange(event) {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        if (event.target.checked) {
            properties_params.has_garage = false;
            properties_params_values.has_garage = false;
        }
        else {
            properties_params.has_garage = "";
            properties_params_values.has_garage = "";
        }
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values });
        this.refreshProperties();
    }

    handleHasGardenYesChange(event) {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        if (event.target.checked) {
            properties_params.has_garden = true;
            properties_params_values.has_garden = true;
        }
        else {
            properties_params.has_garden = "";
            properties_params_values.has_garden = "";
        }
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values });
        this.refreshProperties();
    }

    handleHasGardenNoChange(event) {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        if (event.target.checked) {
            properties_params.has_garden = false;
            properties_params_values.has_garden = false;
        }
        else {
            properties_params.has_garden = "";
            properties_params_values.has_garden = "";
        }
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values });
        this.refreshProperties();
    }

    handleHasSwimmingPoolYesChange(event) {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        if (event.target.checked) {
            properties_params.has_swimming_pool = true;
            properties_params_values.has_swimming_pool = true;
        }
        else {
            properties_params.has_swimming_pool = "";
            properties_params_values.has_swimming_pool = "";
        }
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values });
        this.refreshProperties();
    }

    handleHasSwimmingPoolNoChange(event) {
        let properties_params = this.state.properties_params;
        let properties_params_values = this.state.properties_params_values;
        if (event.target.checked) {
            properties_params.has_swimming_pool = false;
            properties_params_values.has_swimming_pool = false;
        }
        else {
            properties_params.has_swimming_pool = "";
            properties_params_values.has_swimming_pool = "";
        }
        this.setState({ properties_params: properties_params, properties_params_values: properties_params_values });
        this.refreshProperties();
    }

    prevPage(){
        var  self  =  this;
        itemsService.getItemsByURL(this.state.prevPageURL, this.state.properties_params).then((result) => {
            self.setState({ items:  result.data, nextPageURL:  result.nextLink, prevPageURL:  result.prevLink})
        });
    }

    renderNoItemsMessage(){
        var message = this.props.t('properties.search_result.message_no_items_exist');
        var selected_properties = [];
        const properties_params_values = this.state.properties_params_values;
        if(properties_params_values.searched_txt){
            selected_properties.push([this.props.t('properties.search_result.searched_word'), properties_params_values.searched_txt + "."]);
        }
        if(properties_params_values.city){
            selected_properties.push([this.props.t('properties.search_result.searched_city'), properties_params_values.city + "."]);
        }
        if(properties_params_values.property_type){
            selected_properties.push([this.props.t('properties.search_result.property_type'), properties_params_values.property_type + "."]);
        }
        if(properties_params_values.building_type){
            selected_properties.push([this.props.t('properties.search_result.building_type'), properties_params_values.building_type + "."]);
        }
        if(properties_params_values.construction_age){
            selected_properties.push([this.props.t('properties.search_result.construction_age'), properties_params_values.construction_age + "."]);
        }
        if(properties_params_values.item_status){
            selected_properties.push(["this.props.t('properties.search_result.status'): ", properties_params_values.item_status + "."]);
        }
        if(properties_params_values.bedrooms_number){
            selected_properties.push([this.props.t('properties.search_result.bedrooms_number'), properties_params_values.bedrooms_number + "."]);
        }
        if(properties_params_values.bathrooms_number){
            selected_properties.push([this.props.t('properties.search_result.bathrooms_number'), properties_params_values.bathrooms_number + "."]);
        }
        if(properties_params_values.price_range){
            selected_properties.push([this.props.t('properties.search_result.price_ranges'), properties_params_values.price_range + "."]);
        }
        if(properties_params_values.has_dining_room){
            selected_properties.push([this.props.t('properties.search_result.with_dining_room')]);
        }
        if(properties_params_values.has_fireplace){
            selected_properties.push([this.props.t('properties.search_result.with_fireplace')]);
        }
        if(properties_params_values.has_garage){
            selected_properties.push([this.props.t('properties.search_result.with_garage')]);
        }
        if(properties_params_values.has_swimming_pool){
            selected_properties.push([this.props.t('properties.search_result.with_swimming_pool')]);
        }
        if(properties_params_values.has_garden){
            selected_properties.push([this.props.t('properties.search_result.with_garden')]);
        }
        if(selected_properties.length){
            message = this.props.t('properties.search_result.message_no_result_matches');
        }
        return <div className="empty_page">
            <div>{this.props.t('properties.search_result.nothing_found')}</div>
            <p>{message}</p>
            {selected_properties.map((criteria, idx) => (
                <p key={idx} className="child">{criteria[0]}<b>{criteria.length > 0 && criteria[1]}</b></p>
            ))}
            {selected_properties.length > 0 &&
                <p>{this.props.t('properties.search_result.message_try_with_other_criteria')}</p>
            }
        </div>
    }

    render() {
        const {
            ready, filter_collapsed, items, nextPageURL, prevPageURL, selects_choices_dict, selectedCity,
            selectedPropertyType, selectedStatus, selectedBuildingType, selectedConstructionAge, selectedBedroomsNumber,
            selectedBathroomsNumber, selectedPriceRange, properties_params
        } = this.state;
        return (
            <div>
                {ready ?
                    <div className="items--container">
                        <TitlePage title={this.props.t('global.title_page.properties')}/>
                        <div className="section_search_and_filter" >
                            <div className="section_search" >
                                <div className="search_field">
                                    <SearchField
                                        placeholder={this.props.t('global.search_placeholder')}
                                        onChange={this.handleSearchInput}
                                        classNames="search_input"
                                    />
                                    <div className="select city-filter">
                                        <label>{this.props.t('global.city')}:</label>
                                        <Select
                                            options={formated_select_options(this.props.selects_choices.CITIES)}
                                            value={selectedCity} 
                                            onChange={this.handleCityChange}
                                            className="cities_select"
                                        />
                                    </div>
                                </div>
                                <div className="advanced_filter">
                                    <button
                                        data-toggle="collapse"
                                        data-target="#advanced_filter_options"
                                        onClick={this.toggleFilterCollapse}
                                    >
                                        {this.props.t('properties.advanced_filter')}
                                        <div className=" css-1g48xl4-IndicatorsContainer">
                                            <div aria-hidden="true" className=" css-tlfecz-indicatorContainer">
                                                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-tj5bde-Svg">
                                                    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                </div >
                            </div >
                            <div id="advanced_filter_options" className={filter_collapsed ? "section_filter collapse" : "section_filter"} >

                                <div className="item_filter select property_type-filter">
                                    <label>{this.props.t('properties.property_type')}:</label>
                                    <Select
                                        options={formated_select_options(this.props.selects_choices.PROPERTIES_TYPES)}
                                        value={selectedPropertyType}
                                        onChange={this.handlePropertyTypeChange}
                                    />
                                </div>
                                <div className="item_filter select item_status-filter">
                                    <label>{this.props.t('properties.status')}:</label>
                                    <Select
                                        options={formated_select_options(this.props.selects_choices.ITEMS_STATUS, true)}
                                        value={selectedStatus}
                                        onChange={this.handleStatusChange}
                                    />
                                </div>
                                <div className="item_filter select building_type-filter">
                                    <label>{this.props.t('properties.building_type')}:</label>
                                    <Select
                                        options={formated_select_options(this.props.selects_choices.BUILDINGS_TYPES)}
                                        value={selectedBuildingType}
                                        onChange={this.handleBuildingTypeChange}
                                    />
                                </div>
                                <div className="item_filter select construction_age-filter">
                                    <label>{this.props.t('properties.construction_age')}:</label>
                                    <Select
                                        options={formated_select_options(this.props.selects_choices.CONSTRUCTION_AGE)}
                                        value={selectedConstructionAge}
                                        onChange={this.handleConstructionAgeChange}
                                    />
                                </div>
                                <div className="item_filter select bedrooms_number-filter">
                                    <label>{this.props.t('properties.bedrooms_number')}:</label>
                                    <Select
                                        options={formated_select_options(this.props.selects_choices.BEDROOMS_NUMBER)}
                                        value={selectedBedroomsNumber}
                                        onChange={this.handleBedroomsNumberChange}
                                    />
                                </div>
                                <div className="item_filter select bathrooms_number-filter">
                                    <label>{this.props.t('properties.bathrooms_number')}:</label>
                                    <Select
                                        options={formated_select_options(this.props.selects_choices.BATHROOMS_NUMBER)}
                                        value={selectedBathroomsNumber}
                                        onChange={this.handleBathroomsNumberChange}
                                    />
                                </div>
                                <div className="item_filter select price_range-filter">
                                    <label>{this.props.t('properties.price_ranges')}:</label>
                                    <Select
                                        options={formated_select_options(this.props.selects_choices.PRICES_RANGES)}
                                        value={selectedPriceRange}
                                        onChange={this.handlePriceRangeChange}
                                    />
                                </div>
                                <div className="item_filter checkbox dining_room-filter">
                                    <div className="label">
                                        <label>{this.props.t('properties.has_dining_room')}</label>
                                    </div>
                                    <div className="choices">
                                        <div className="choice_true a_choice">
                                            <div className="container">
                                                <label>{this.props.t('global.yes')}</label>
                                                <input
                                                    type="checkbox"
                                                    className="dining_room_yes"
                                                    checked={properties_params.has_dining_room && properties_params.has_dining_room !== ""}
                                                    onChange={this.handleHasDiningRoomYesChange}
                                                />
                                                <span className="checkmark"></span>
                                            </div>
                                        </div>
                                        <div className="choice_no a_choice">
                                            <div className="container">
                                                <label>{this.props.t('global.no')}</label>
                                                <input
                                                    type="checkbox"
                                                    className="dining_room_no"
                                                    checked={properties_params.has_dining_room !== "" && !properties_params.has_dining_room}
                                                    onChange={this.handleHasDiningRoomNoChange}
                                                />
                                                <span className="checkmark"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item_filter checkbox fireplace-filter">
                                    <div className="label">
                                        <label>{this.props.t('properties.has_fireplace')}</label>
                                    </div>
                                    <div className="choices">
                                        <div className="choice_true a_choice">
                                            <div className="container">
                                                <label>{this.props.t('global.yes')}</label>
                                                <input
                                                    type="checkbox"
                                                    className="fireplace_yes"
                                                    checked={properties_params.has_fireplace && properties_params.has_fireplace !== ""}
                                                    onChange={this.handleHasFireplaceYesChange}
                                                />
                                                <span className="checkmark"></span>
                                            </div>
                                        </div>
                                        <div className="choice_no a_choice">
                                            <div className="container">
                                                <label>{this.props.t('global.no')}</label>
                                                <input
                                                    type="checkbox"
                                                    className="fireplace_no"
                                                    checked={properties_params.has_fireplace !== "" && !properties_params.has_fireplace}
                                                    onChange={this.handleHasFireplaceNoChange}
                                                />
                                                <span className="checkmark"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item_filter checkbox garage-filter">
                                    <div className="label">
                                        <label>{this.props.t('properties.has_garage')}</label>
                                    </div>
                                    <div className="choices">
                                        <div className="choice_true a_choice">
                                            <div className="container">
                                                <label>{this.props.t('global.yes')}</label>
                                                <input
                                                    type="checkbox"
                                                    className="garage_yes"
                                                    checked={properties_params.has_garage && properties_params.has_garage !== ""}
                                                    onChange={this.handleHasGarageYesChange}
                                                />
                                                <span className="checkmark"></span>
                                            </div>
                                        </div>
                                        <div className="choice_no a_choice">
                                            <div className="container">
                                                <label>{this.props.t('global.no')}</label>
                                                <input
                                                    type="checkbox"
                                                    className="garage_no"
                                                    checked={properties_params.has_garage !== "" && !properties_params.has_garage}
                                                    onChange={this.handleHasGarageNoChange}
                                                />
                                                <span className="checkmark"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item_filter checkbox swimming_pool-filter">
                                    <div className="label">
                                        <label>{this.props.t('properties.has_swimming_pool')}</label>
                                    </div>
                                    <div className="choices">
                                        <div className="choice_true a_choice">
                                            <div className="container">
                                                <label>{this.props.t('global.yes')}</label>
                                                <input
                                                    type="checkbox"
                                                    className="swimming_pool_yes"
                                                    checked={properties_params.has_swimming_pool && properties_params.has_swimming_pool !== ""}
                                                    onChange={this.handleHasSwimmingPoolYesChange}
                                                />
                                                <span className="checkmark"></span>
                                            </div>
                                        </div>
                                        <div className="choice_no a_choice">
                                            <div className="container">
                                                <label>{this.props.t('global.no')}</label>
                                                <input
                                                    type="checkbox"
                                                    className="swimming_pool_no"
                                                    checked={properties_params.has_swimming_pool !== "" && !properties_params.has_swimming_pool}
                                                    onChange={this.handleHasSwimmingPoolNoChange}
                                                />
                                                <span className="checkmark"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item_filter checkbox garden-filter">
                                    <div className="label">
                                        <label>{this.props.t('properties.has_garden')}</label>
                                    </div>
                                    <div className="choices">
                                        <div className="choice_true a_choice">
                                            <div className="container">
                                                <label>{this.props.t('global.yes')}</label>
                                                <input
                                                    type="checkbox"
                                                    className="garden_yes"
                                                    checked={properties_params.has_garden && properties_params.has_garden !== ""}
                                                    onChange={this.handleHasGardenYesChange}
                                                />
                                                <span className="checkmark"></span>
                                            </div>
                                        </div>
                                        <div className="choice_no a_choice">
                                            <div className="container">
                                                <label>{this.props.t('global.no')}</label>
                                                <input
                                                    type="checkbox"
                                                    className="garden_no"
                                                    checked={properties_params.has_garden !== "" && !properties_params.has_garden}
                                                    onChange={this.handleHasGardenNoChange}
                                                />
                                                <span className="checkmark"></span>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div >
                        <div className="items--list">
                            {items.length ?
                                items.map((item, i) =>
                                    <Item item={item} key={i} selects_choices_dict={selects_choices_dict} t={this.props.t} />
                                )
                            :
                                <div className="empty_page_container">{this.renderNoItemsMessage()}</div>
                            }
                        </div>
                        {/* <div className="actions">
                            {prevPageURL && <button className="btn btn-primary" onClick={this.prevPage}>Prev</button>}
                            {nextPageURL && <button className="btn btn-primary" onClick={this.nextPage}>Next</button>}
                        </div> */}
                    </div >
                :
                    <div></div>
                }
            </div>
        );
    }
}
export default withTranslation('common')(ItemsList);