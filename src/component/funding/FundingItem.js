import React from 'react';
import './FundingItem.css';


const FundingItem = (props) => (
    <div className="funding">
        <div className="name_el">
            {props.fundingItem.image ?
            <div className="funding_image">
                <img src={props.fundingItem.image} alt="User image"/>
            </div>
            :
            <div className="initials" style={{backgroundColor: props.fundingItem.initials_bg_color, color: props.fundingItem.initials_color}}>
                {props.fundingItem.first_name.charAt(0)}{props.fundingItem.last_name.charAt(0)}
            </div>
            }
            <div className="name">
                {props.fundingItem.first_name} {props.fundingItem.last_name }
            </div>
            <div className="send_funding_email_btn hidden">
                <button onClick={() => {props.send_funding_email()}}>{props.t('funding.send')}</button>
            </div>
        </div>
        <div className="funding_content">
            {props.fundingItem.description }
        </div>
        <div className="funding_time_el">
            {props.fundingItem.city &&
                <div className="funding_city">
                    {props.cities[props.fundingItem.city] },
                </div>
            }
            <div className="funding_time">
                {props.fundingItem.createdAt }
            </div>

        </div>
    </div>
)


export default FundingItem;
