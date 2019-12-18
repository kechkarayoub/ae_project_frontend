import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MiniCardContact.css';


const MiniCardContact = (props) => (
    <div className={"realtor-data" + (props.added_class || "")}>
        {props.realtor_data.full_name &&
            <div className="full-name">
                {props.realtor_data.full_name}
            </div>
        }
        {props.realtor_data.agency_name &&
            <div className="agency-name">
            {props.realtor_data.agency_name}
            </div>
        }
        {props.realtor_data.address &&
            <div className="address">
                <FontAwesomeIcon icon="address-card" />
                {props.realtor_data.address}
            </div>
        }
        {props.realtor_data.email &&
            <div className="email">
                <FontAwesomeIcon icon="at" />
            {props.realtor_data.email}
            </div>
        }
        {props.realtor_data.tel &&
            <div className="tel">
                <FontAwesomeIcon icon="phone-alt" />
            {props.realtor_data.tel}
            </div>
        }
        {props.realtor_data.fax &&
            <div className="fax">
                <FontAwesomeIcon icon="fax" />
            {props.realtor_data.fax}
            </div>
        }
    </div>
)

export default MiniCardContact;
