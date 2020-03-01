import React from 'react';
import './FundingItem.css';


const FundingItem = (props) => (
    <div className="funding">
        <div className="name_el">
            <div className="funding_image">
                <img src={props.fundingItem.bank_logo} alt="Bank logo"/>
            </div>
            <div className="name">
                {props.fundingItem.bank_name}
            </div>
        </div>
        <div className="funding_content">
            {(props.fundingItem.free_field_label ? props.fundingItem.free_field_label + " " : "") + props.fundingItem.free_field_value}
        </div>
    </div>
)


export default FundingItem;
