import ImageGallery from 'react-image-gallery';
import ItemsService from "../../services/ItemsService";
import MapContainer from '../map/MapContainer';
import no_image from '../images/item/no_image.png';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "react-image-gallery/styles/css/image-gallery.css";
import './AddedSiliderCss.scss';
import './PropertyDetails.scss';


const itemsService = new ItemsService();
class PropertyDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            property: [],
            property_id: props.match.params.id,
            selects_choices_dict: props.selects_choices_dict,
            is_maps_active: props.is_maps_active,
            ready: false
        };
        this.formatedImages = this.formatedImages.bind(this);
    }

    componentDidMount() {
        var self = this;
        itemsService.getItemDetails(self.state.property_id).then(function (result) {
            self.setState({ property:  result.data, ready: true})
        });
    }

    formatedImages(images){
        var formated_images = [];
        if (!images) {
            images = [];
        }
        images.map(image => {
            formated_images.push({
                original: image.image,
                thumbnail: image.image
            });
        });
        return formated_images;
    }

    render() {
        const { property, ready, selects_choices_dict, is_maps_active } = this.state;
        const images_slider = this.formatedImages(property.images);
        const contact_url = ready ? "/contact/" + property.pk : "";
        const print_url = ready ? "/property/print/" + property.pk : "";
        return (
            <div className="property_container">
                {ready ?
                    <div id="property_details" className="property_details">
                        <div className="property_details-header">
                            <div className="title">{property.label}</div>
                            <div className="h-actions">
                                <a href={print_url} target="_blank"><FontAwesomeIcon icon="print" />{this.props.t('property.print_version')}</a>
                                <a href={contact_url}><FontAwesomeIcon icon="address-card" />{this.props.t('property.request_for_information')}</a>
                            </div>
                        </div>
                        <div className="property_details-content">
                            <div className="property_details-information images_map">
                                <div className="property_details-slider">
                                    {property.images.length ?
                                        <ImageGallery items={images_slider} autoPlay={true} />
                                    :
                                        <img className="card-img-top" src={no_image} alt="Default" />
                                    }
                                </div>
                                {is_maps_active && property.with_map &&
                                    <div className="card_maps">
                                        <MapContainer
                                            latitude={property.gps_latitude}
                                            longitude={property.gps_longitude}
                                            label={property.label}
                                            image_map={property.image_map}
                                            address={property.address}
                                            t={this.props.t}
                                        />
                                    </div>
                                }
                            </div>
                            <div className="property_details-information infos">
                                <div className="property_city">
                                    {selects_choices_dict.CITIES[property.city]}
                                </div>
                                <div className="property_address">
                                    {property.address}
                                </div>
                                <div className="property_id">
                                    <div className="key">ID: </div>
                                    <div className="value">{property.pk}</div>
                                </div>
                                <div className="property_price">
                                    <div className="key">{this.props.t('property.price')}: </div>
                                    <div className="value">{property.price}$</div>
                                </div>
                                <div className="property_short_description">
                                    {property.short_description}
                                </div>
                                <div className="property_general_information">
                                    <div className="gi_title">{this.props.t('property.general_information')}</div>
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
                                        <div className="value">{property.lot_size} m²</div>
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
                                        <div className="value"><FontAwesomeIcon icon="check-circle" /></div>
                                    </div>
                                    }
                                    {property.has_fireplace &&
                                    <div className="property_has_fireplace">
                                        <div className="key">{this.props.t('properties.card_item.fireplace')}: </div>
                                        <div className="value"><FontAwesomeIcon icon="check-circle" /></div>
                                    </div>
                                    }
                                    {property.has_garage &&
                                    <div className="property_has_garage">
                                        <div className="key">{this.props.t('properties.card_item.garage')}: </div>
                                        <div className="value"><FontAwesomeIcon icon="check-circle" /></div>
                                    </div>
                                    }
                                    {property.has_swimming_pool &&
                                    <div className="property_has_swimming_pool">
                                        <div className="key">{this.props.t('properties.card_item.swimming_pool')}: </div>
                                        <div className="value"><FontAwesomeIcon icon="check-circle" /></div>
                                    </div>
                                    }
                                    {property.has_garden &&
                                    <div className="property_has_garden">
                                        <div className="key">{this.props.t('properties.card_item.garden')}: </div>
                                        <div className="value"><FontAwesomeIcon icon="check-circle" /></div>
                                    </div>
                                    }
                                </div>
                                <div className="property_description">
                                    <div className="d_title">{this.props.t('property.description')}</div>
                                    <div className="description">{property.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    <div></div>
                }
            </div >
        );
    }
}
export default PropertyDetails;
