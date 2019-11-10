import React from 'react';
import './LanguagesList.css';
import franceFlag from '../images/flags/France.png';
import unitedStatesFlag from '../images/flags/UnitedStates.png';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import store from 'store';
const LanguagesList = (props) => (
    <div className="languages_dropdown">
        <DropdownButton
            title={store.get("current_langue") === "fr" ?
                props.t('header.languages.french')
            :
                props.t('header.languages.english')
            }
            className="list_languages"
            data-testid="languages_button"
        >
            <Dropdown.Item active={store.get("current_langue") === "en"} onClick={() => props.on_click("en")}>
                <img src={unitedStatesFlag}/><span>{ props.t('header.languages.english') }</span>
            </Dropdown.Item>
            <Dropdown.Item active={store.get("current_langue") === "fr"} onClick={() => props.on_click("fr")}>
                <img src={franceFlag}/><span>{ props.t('header.languages.french') }</span>
            </Dropdown.Item>            
        </DropdownButton>
    </div>
)

export default LanguagesList;
