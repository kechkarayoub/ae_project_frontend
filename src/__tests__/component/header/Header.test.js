import React from 'react';
import ReactDOM from 'react-dom';
import { create } from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { createMemoryHistory } from 'history'
import { BrowserRouter, Route, Router } from 'react-router-dom';
import Header from '../../../component/header/Header';
import {fakeHeaderParams} from '../../../services/GlobalParamsService'
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
    interpolation: { escapeValue: false },  // React already does escaping
    lng: store.get('current_langue') || "en",
    resources: {
        en: {
            common: common_en    // 'common' is our custom namespace
        },
        fr: {
            common: common_fr    // 'common' is our custom namespace
        },
    },
});
const setUp = (props) => {
    const component = shallow(<I18nextProvider i18n={i18next}><Header {...props} /></I18nextProvider>);
    return component;
}
const setUpRender = (props) => {
    const component = mount(<I18nextProvider i18n={i18next}><BrowserRouter> <Header {...props}/> </BrowserRouter></I18nextProvider>);
    return component;
}

describe('Header component', () => {
    let component;
        component = setUpRender();
    it("Should renders correctly", () => {
        const wrapper = findByTestAttribute(component, 'bg-header');
        const logo_el = findByTestAttribute(component, 'logo_el');
        const menubanner = findByTestAttribute(component, 'menubanner');
//        expect(component).toMatchSnapshot();
        expect(wrapper.length).toBe(1);
        expect(logo_el.length).toBe(1);
        expect(logo_el.find('img').length).toBe(1);
        expect(menubanner.length).toBe(1);
    });
//    test('Full render ', () => {
//        const { container } = render(<BrowserRouter> <Header /> </BrowserRouter>);
//        const state = component.state();
//        expect(container.innerHTML).toMatch(
//            "<header><div class=\"bg-header\" data-test=\"bg-header\"><div class=\"bg-header-2\"><div class=\"topbanner\"><div class=\"menubanner\" data-test=\"menubanner\"><div class=\"wrapper\"><div class=\"langues-infos\"><div class=\"\"></div></div><nav class=\"navbar navbar-expand-lg justify-content-center\"><button aria-controls=\"navbarNavAltMarkup\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" class=\"navbar-toggler\" data-toggle=\"collapse\" data-target=\"#navbarNavAltMarkup\" data-test=\"open_menu_mobile\" type=\"button\"><span class=\"navbar-toggler-icon\"></span></button><div class=\"collapse navbar-collapse\" id=\"navbarNavAltMarkup\"><div class=\"navbar-nav\"><a class=\"nav-item nav-link link-home\" href=\"/\"><span class=\"bt-icon\"><img src=\"bt-home.png\" alt=\"Home\"></span><span class=\"bt-text\">Home</span></a><a class=\"nav-item nav-link link-properties\" href=\"/properties\"><span class=\"bt-icon\"><img src=\"bt-properties.png\" alt=\"Home\"></span><span class=\"bt-text\">Properties</span></a><a class=\"nav-item nav-link link-buyorsell\" href=\"/buyorsell\"><span class=\"bt-icon\"><img src=\"bt-sellers.png\" alt=\"Home\"></span><span class=\"bt-text\">Buy/Sell</span></a><a class=\"nav-item nav-link link-testimonial\" href=\"/testimonial\"><span class=\"bt-icon\"><img src=\"bt-testimonial.png\" alt=\"Home\"></span><span class=\"bt-text\">Testimonial</span></a><a class=\"nav-item nav-link link-usefullinks\" href=\"/usefullinks\"><span class=\"bt-icon\"><img src=\"bt-links.png\" alt=\"Home\"></span><span class=\"bt-text\">Useful links</span></a><a class=\"nav-item nav-link link-contact\" href=\"/contact\"><span class=\"bt-icon\"><img src=\"bt-contacts.png\" alt=\"Home\"></span><span class=\"bt-text\">Contact</span></a></div></div></nav></div></div></div><div class=\"header-bottom\"><div class=\"wrapper\"><div id=\"slide_show\"><ul class=\"rslides\" id=\"slider1\"><li style=\"display: none;\"><img src=\"slide_header_1.jpg\" alt=\"Slideshow\"></li><li><img src=\"slide_header_2.jpg\" alt=\"Slideshow\"></li><li style=\"display: none;\"><img src=\"slide_header_3.jpg\" alt=\"Slideshow\"></li></ul></div><div class=\"nweb_header_img\"></div><div class=\"logo_el\" data-test=\"logo_el\"><a href=\"/\"><img src=\"logo.png\" alt=\"Logo\"></a></div><div class=\"realtor_el\"><img src=\"realtor_img.jpg\" alt=\"Realtor\"><div class=\"realtor_data\"></div></div></div></div></div></div></header> "
//        );
//        expect(container.querySelectorAll('header').length).toBe(1);
//        expect(state.header_params).toEqual(fakeHeaderParams);
//        expect(state.showMobileMenu).toEqual(false);
//    });
//    it('Component fetching weather from API', async (done) => {
//      const root = shallow(<Header/>);
//      let componentsWeather = {};      // We wait until the state has a weather summary, but we
//      // don't care yet about the content.
//      await waitUntil(() => root.state('header_params').realtor_data !== undefined);      // It is better to have the expectation here and not inside
//      // the waitUntil condition.
//     expect(root.state('header_params')).toEqual(fakeHeaderParams);
//     root.instance().toggleNavigation()
//     expect(root.state('showMobileMenu')).toEqual(true);
//     console.log(findByTestAttribute(component, 'bg-header'))
//     done();
//  });
});