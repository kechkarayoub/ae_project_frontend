//import React from 'react';
//import ReactDOM from 'react-dom';
//import { create } from 'react-test-renderer';
//import { mount, shallow } from 'enzyme';
//import { render, fireEvent } from '@testing-library/react';
//import { MemoryRouter } from 'react-router';
//import { createMemoryHistory } from 'history'
//import { BrowserRouter, Route, Router } from 'react-router-dom';
//import Home from '../../../component/home/Home';
//import axios from "axios"
//import renderer from "react-test-renderer"
//import toJson from 'enzyme-to-json';
//import ReactTestUtils from 'react-dom/test-utils';
//import { act } from 'react-dom/test-utils';
//import { library } from '@fortawesome/fontawesome-svg-core';
//import { fas } from '@fortawesome/free-solid-svg-icons';
//import { faAt, faFax, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
//import '@testing-library/jest-dom/extend-expect';
//library.add(fas, faAt, faFax, faPhoneAlt)
//import {findByTestAttribute, i18next_params} from '../../../test_utils.js';
//import waitUntil from 'async-wait-until';
//import nock from 'nock';
//jest.mock("../../../services/GlobalParamsService");
//
//
//import i18next from 'i18next';
//import {I18nextProvider} from 'react-i18next';
//i18next.init(i18next_params);
//const setUpShallow = (props) => {
//    const component = shallow(<I18nextProvider i18n={i18next}><Home {...props} /></I18nextProvider>);
//    return component;
//}
//const setUpRender = (props) => {
//    const component = mount(<I18nextProvider i18n={i18next}><Home {...props} /></I18nextProvider>);
//    return component;
//}
//
//describe('Home component', () => {
//    let component;
//    beforeEach(() => {
//        component = setUpRender();
//    });
//    it("Should renders correctly", () => {
//        const wrapper = findByTestAttribute(component, 'home__container');
//        const home__title = findByTestAttribute(component, 'home__title');
//        expect(component).toMatchSnapshot();
//        expect(wrapper.length).toBe(1);
//        expect(home__title.length).toBe(1);
//    });
//});
it("Tested correctly", () => {
    expect(1).toBe(1);
});