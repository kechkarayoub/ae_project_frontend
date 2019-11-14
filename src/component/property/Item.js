import React from 'react';
import no_image from '../images/item/no_image.png';
import img_item_new from '../images/item/img_item_new.png';
import img_item_sold from '../images/item/img_item_sold.png';
import './Item.css';
import { BrowserRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Item = (props) => (

    <div className="container-property">
        <Link className="property-details-link" to={"/property/" + props.item.pk}>
            <div className="card property" data-id={props.item.pk}>
                <div className="item_id">ID: <span>{props.item.pk}</span></div>
                <div className="img-property">
                    {props.item.images.length?
                    <div>
                        <img className="card-img-top" src={props.item.images[0].image} alt="Item"/>
                        {props.item.status == "sold" && !props.item.is_new && <img className="img-item-sold" src={img_item_sold} alt="Sold item"/>}
                        {props.item.is_new && <img className="img-item-new" src={img_item_new} alt="New item"/>}
                    </div>
                    :
                    <img className="card-img-top" src={no_image} alt="Default"/>
                    }
                </div>
                <div className="city-property" title={props.selects_choices_dict.CITIES[props.item.city]}>
                    {props.selects_choices_dict.CITIES[props.item.city]}
                </div>
                <div className="type-property" title={props.selects_choices_dict.PROPERTIES_TYPES[props.item.property_type] + (props.item.building_type ? "("+props.selects_choices_dict.BUILDINGS_TYPES[props.item.building_type]+")" : "")}>
                    {props.selects_choices_dict.PROPERTIES_TYPES[props.item.property_type]} {props.item.building_type && "("+props.selects_choices_dict.BUILDINGS_TYPES[props.item.building_type]+")"}
                </div>
                <div className="short-description-property" title={props.item.short_description}>
                    {props.item.short_description}
                </div>
                <div className="info-property">
                    {props.item.bedrooms_number &&
                        <div className="bedrooms-number" title={props.item.bedrooms_number.length === 1 ? (props.item.bedrooms_number === '1' ? props.t('properties.card_item.bedrooms.one') : props.item.bedrooms_number + props.t('properties.card_item.bedrooms.two_four')) : props.t('properties.card_item.bedrooms.more_than_four')}>
                            <FontAwesomeIcon icon="bed" />
                        </div>
                    }
                    {props.item.bathrooms_number &&
                        <div className="bathrooms-number" title={props.item.bathrooms_number.length === 1 ? (props.item.bathrooms_number === '1' ? props.t('properties.card_item.bathrooms.one') : props.item.bathrooms_number + props.t('properties.card_item.bathrooms.two')) : props.t('properties.card_item.bathrooms.more_than_two')}>
                            <FontAwesomeIcon icon="bath" />
                        </div>
                    }
                    {props.item.has_swimming_pool &&
                        <div className="swimming_pool" title={props.t('properties.card_item.swimming_pool')}>
                            <FontAwesomeIcon icon="swimming-pool" />
                        </div>
                    }
                    {/*props.item.has_dining_room &&
                        <div className="dining_room" title={props.t('properties.card_item.dining_room')}>
                            <FontAwesomeIcon icon="cutlery" />
                        </div>
                    */}
                    {props.item.has_garden &&
                        <div className="garden" title={props.t('properties.card_item.garden')}>
                            <FontAwesomeIcon icon="tree" />
                        </div>
                    }
                    {props.item.has_garage &&
                        <div className="garage" title={props.t('properties.card_item.garage')}>
                            <FontAwesomeIcon icon="car" />
                        </div>
                    }
                    {props.item.has_fireplace &&
                        <div className="fireplace" title={props.t('properties.card_item.fireplace')}>
                            <FontAwesomeIcon icon="fire-alt" />
                        </div>
                    }
                </div>
                <div className="price-property">
                    {props.item.price}$
                </div>
            </div>
        </Link>
    </div>
)
export default Item;