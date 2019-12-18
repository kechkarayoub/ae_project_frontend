import ContactCreate from './ContactCreate';
import MapContainer from '../map/MapContainer';
import MiniCardContact from '../utils/MiniCardContact';
import React, { Component } from 'react';
import TitlePage from '../utils/TitlePage';
import { withTranslation } from 'react-i18next';
import './Contact.css';

class Contact extends Component {

    constructor(props) {
        super(props);
        document.title = props.t('header.nav.contact');
        this.state = {
            property_id: props.match ? props.match.params.id : null,
            realtor_data: props.realtor_data
        };
    }
    render() {
        const { property_id, realtor_data } = this.state;
        return (

            <div className="contact">
                {!!realtor_data &&
                    <TitlePage title={this.props.t('global.title_page.contact')}/>
                }
                {!!realtor_data &&
                    <div className="realtor_and_map">
                        <MiniCardContact realtor_data={realtor_data} added_class=" contact_page"/>
                        {realtor_data.position &&
                            <MapContainer
                                latitude={realtor_data.position.gps_latitude || 45.474459}
                                longitude={realtor_data.position.gps_longitude || -73.470234}
                                added_class=" contact_page"
                                t={this.props.t}
                                is_not_property={true}
                            />
                        }
                    </div>
                }
                <ContactCreate property_id={property_id} is_contact_page={!!realtor_data} t={this.props.t}/>
            </div>
        );
    }
}

export default withTranslation('common')(Contact);
