import React from 'react';
import ReactDOM from 'react-dom';
import { create } from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { createMemoryHistory } from 'history'
import { BrowserRouter, Route, Router } from 'react-router-dom';
import LanguagesList from '../../../component/utils/LanguagesList';
import axios from "axios"
import renderer from "react-test-renderer"
import toJson from 'enzyme-to-json';
import ReactTestUtils from 'react-dom/test-utils';
import { act } from 'react-dom/test-utils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faAt, faFax, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import '@testing-library/jest-dom/extend-expect';
library.add(fas, faAt,   faFax, faPhoneAlt)
import {findByTestAttribute} from '../../../test_utils.js';
import waitUntil from 'async-wait-until';
import nock from 'nock';
jest.mock("../../../services/GlobalParamsService");

import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import common_fr from "./../../../translations/fr/common.json";
import common_en from "./../../../translations/en/common.json";
import store from 'store';
i18next.init({
    interpolation: { escapeValue: false },
    lng: store.get('current_langue') || "en",
    resources: {
        en: {
            common: common_en
        },
        fr: {
            common: common_fr
        },
    },
});
const setUp = (props) => {
    const component = render(<I18nextProvider i18n={i18next}><LanguagesList {...props} t={key => key} /></I18nextProvider>);
    return component;
}

describe('Header component', () => {
    it("Should renders correctly", () => {
        store.set("current_langue", "en");
        const {container, getAllByTestId, getByTestId} = render(<I18nextProvider i18n={i18next}><LanguagesList t={key => key} on_click={(langue) => store.set("current_langue", "fr")} /></I18nextProvider>);
        const languages_button = getAllByTestId('languages_button');
        expect(languages_button.length).toBe(1);
        expect(getByTestId('languages_button')).not.toBeNull();
        expect(() => {
          getByTestId('languages_button2');
        }).toThrow();
        console.log(container.children[0].children[0].children[0].click())
    });
});