import CheckCecle from '../images/CheckCercle.png';
import Doc from '../pdfcontainer/DocService';
import ItemsService from "../../services/ItemsService";
import MiniCardContact from '../utils/MiniCardContact';
import PdfContainer from '../pdfcontainer/PdfContainer';
import React, { Component } from 'react';
import StaticMapContainer from '../map/StaticMapContainer';
import {isMobile} from 'react-device-detect';
import './PropertyDetailsPrint.scss';

const itemsService = new ItemsService();
class PropertyDetailsPrint extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_maps_active: props.is_maps_active,
            property: [],
            property_id: props.match.params.id,
            ready: false,
            realtor_data: props.realtor_data,
            selects_choices_dict: props.selects_choices_dict
        };
    }

    componentDidMount() {
        var self = this;
        itemsService.getItemDetails(self.state.property_id).then(function (result) {
            self.setState({ property:  result.data, ready: true})
        });
    }

    createPdf = (html, filename) => Doc.createPdf(html, filename);
    printPdf = (html) => Doc.printPdf(html);

    render() {
        const { property, ready, selects_choices_dict, is_maps_active, realtor_data } = this.state;
        return (
            <div className="property_container_print">
                {ready ?
                    <PdfContainer 
                        createPdf={this.createPdf} 
                        printPdf={this.printPdf} 
                        filename={property.label} 
                        isMobile={isMobile}
                        t={this.props.t}
                    >
                        <React.Fragment>
                            <div id="property_details_to_print" className="property_details">
                                <div className="property_details_to_print-header">
                                    <div className="contact_card">
                                        <div className="title">{this.props.t('property_details_print.contact')}</div>
                                        <MiniCardContact realtor_data={realtor_data} />
                                    </div>
                                    <div className="property_id">
                                        <div>ID: <b>{property.pk}</b></div>
                                    </div>
                                </div>
                                <div className="property_details_to_print-content">
                                    <div className="title">{property.label}</div>
                                    <div className="address_price">
                                        <div className="address">{property.address}</div>
                                        <div className="price">{property.price}$</div>
                                    </div>
                                    <div className="property_details_to_print_map-information">
                                        {is_maps_active && property.image_map &&
                                            <div className="image_maps">
                                                <img className="image_map" src={property.image_map} alt={this.props.t('property_details_print.front_view_alt')} />
                                            </div>
                                        }
                                        {is_maps_active && property.with_map &&
                                            <div className={"card_maps" + (property.image_map ? "" : " full_width")}>
                                                <StaticMapContainer latitude={property.gps_latitude} longitude={property.gps_longitude}/>
                                            </div>
                                        }
                                    </div>
                                    <div className="property_details_to_print_information">
                                        <div className="property_description">
                                            <div className="d_title">{this.props.t('property.description')}</div>
                                            <div className="description">{property.description}</div>
                                        </div>
                                        <div className="property_general_information">
                                            <div className="d_title">{this.props.t('property.general_information')}</div>
                                            <div className="property_short_description">
                                                {property.short_description}
                                            </div>
                                            <div className="property_type">
                                                <div className="key">{this.props.t('properties.property_type')}: </div>
                                                <div className="value">{selects_choices_dict.PROPERTIES_TYPES[property.property_type]}</div>
                                            </div>
                                            <div className="item_status">
                                                <div className="key">{this.props.t('properties.status')}: </div>
                                                <div className="value">{selects_choices_dict.ITEMS_STATUS[property.status]}</div>
                                            </div>
                                            {property.building_type &&
                                            <div className="building_type">
                                                <div className="key">{this.props.t('properties.building_type')}: </div>
                                                <div className="value">{selects_choices_dict.BUILDINGS_TYPES[property.building_type]}</div>
                                            </div>
                                            }
                                            {property.construction_age &&
                                            <div className="property_construction_age">
                                                <div className="key">{this.props.t('properties.construction_age')}: </div>
                                                <div className="value">{selects_choices_dict.CONSTRUCTION_AGE[property.construction_age]}</div>
                                            </div>
                                            }
                                            {property.lot_size ?
                                            <div className="property_lot_size">
                                                <div className="key">{this.props.t('property.lot_size')}: </div>
                                                <div className="value">{property.lot_size}</div>
                                            </div>
                                            :
                                            null
                                            }
                                            {property.bedrooms_number &&
                                            <div className="property_bedrooms_number">
                                                <div className="key">{this.props.t('properties.bedrooms_number')}: </div>
                                                <div className="value">{this.props.selects_choices_dict.BEDROOMS_NUMBER[property.bedrooms_number]}</div>
                                            </div>
                                            }
                                            {property.bathrooms_number &&
                                            <div className="property_bedrooms_number">
                                                <div className="key">{this.props.t('properties.bathrooms_number')}: </div>
                                                <div className="value">{this.props.selects_choices_dict.BATHROOMS_NUMBER[property.bathrooms_number]}</div>
                                            </div>
                                            }
                                            {property.has_dining_room &&
                                            <div className="property_has_dining_room">
                                                <div className="key">{this.props.t('properties.card_item.dining_room')}: </div>
                                                <div className="value"><img src={CheckCecle} alt="Yes" /></div>
                                            </div>
                                            }
                                            {property.has_fireplace &&
                                            <div className="property_has_fireplace">
                                                <div className="key">{this.props.t('properties.card_item.firepmace')}: </div>
                                                <div className="value"><img src={CheckCecle} alt="Yes" /></div>
                                            </div>
                                            }
                                            {property.has_garage &&
                                            <div className="property_has_garage">
                                                <div className="key">{this.props.t('properties.card_item.garage')}: </div>
                                                <div className="value"><img src={CheckCecle} alt="Yes" /></div>
                                            </div>
                                            }
                                            {property.has_swimming_pool &&
                                            <div className="property_has_swimming_pool">
                                                <div className="key">{this.props.t('properties.card_item.swimming_pool')}: </div>
                                                <div className="value"><img src={CheckCecle} alt="Yes" /></div>
                                            </div>
                                            }
                                            {property.has_garden &&
                                            <div className="property_has_garden">
                                                <div className="key">{this.props.t('properties.card_item.garden')}: </div>
                                                <div className="value"><img src={CheckCecle} alt="Yes" /></div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                    {property.images.length > 0 &&
                                        <div className="property_details_to_print_photos">
                                            <div className="p_title">{this.props.t('property_details_print.photos')}</div>
                                            <div className="photos">
                                                {property.images.map((image, i) =>
                                                    <div className="property_photo" key={i}>
                                                        <img className="photo" src={image.image} alt="Property" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    </PdfContainer>
                :
                    <div></div>
                }
            </div >
        );
    }
}
export default PropertyDetailsPrint;
