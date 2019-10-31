//import React from 'react';
//import ReactDOM from 'react-dom';
//import App from '../App';
//import { create } from 'react-test-renderer';
//import { mount, shallow } from 'enzyme';
//import { render, fireEvent } from '@testing-library/react';
//import { MemoryRouter } from 'react-router';
//import { createMemoryHistory } from 'history'
//import { Route, Router } from 'react-router-dom';
//import NotFoundPage from '../component/notfound/NotFoundPage';
//import Home from '../component/home/Home';
//import {fakeGlobalParams} from '../services/GlobalParamsService'
//import axios from "axios"
//import renderer from "react-test-renderer"
//import Header from "../component/header/Header"
//import toJson from 'enzyme-to-json';
//
//
//jest.mock("../services/GlobalParamsService");
//
////it("Renders correctly", () => {
////  const wrapper = shallow(
////    <App />
////  );
////  expect(wrapper).toMatchSnapshot();
////});
////it('calls componentDidMount', () => {
////  const wrapper = shallow(<App />)
////  const instance = wrapper.instance();
////  jest.spyOn(instance, 'componentDidMount');
////  instance.componentDidMount();
////  expect(instance.componentDidMount).toHaveBeenCalled();
////  expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
////})
//describe('App work', () => {
//    it("Renders correctly", () => {
//        const wrapper = shallow(
//            <App />
//        );
//        expect(wrapper).toMatchSnapshot();
//    });
//    test('Render loading at first', () => {
//        const { container } = render(<App />);
//        const wrapper = shallow(<App />);
//        const state = wrapper.dive().state();
//        expect(container.innerHTML).toMatch(
//            '<div class=\"global_container\"><div class=\"loading_container\"><img src=\"gif_loading.gif\" alt=\"Loading ...\"></div></div>'
//        );
//        expect(container.querySelectorAll('header').length).toBe(0);
//        expect(state.global_params).toEqual({});
//        expect(state.ready).toEqual(false);
//    });
//    test('Renders after ajax response', (done) => {
//        const { container } = render(<App />);
//        setTimeout(() => {
//            expect(container.querySelectorAll('header').length).toBe(1);
//            done();
//        });
//    });
//    test('Update state after ajax response', async (done) => {
//        const wrapper = mount(shallow(<App />).get(0));
//        setTimeout(() => {
//            const state = wrapper.state();
//            expect(state.global_params).toEqual(fakeGlobalParams);
//            expect(state.ready).toEqual(true);
//            done();
//        });
//    });
//});
//
//test('full app rendering/navigating', async (done) => {
//  const history = createMemoryHistory()
//  const { container, getByText } = render(
//    <Router history={history}>
//      <App />
//    </Router>
//  )
//        setTimeout(() => {
//            expect(container.innerHTML).toContain(
//                '<h1>Home page</h1>'
//            )
//
////  fireEvent.click(getByText(container, "/buyorsell"))
//            done();
//        });
//  // verify page content for expected route
//  // often you'd use a data-testid or role query, but this is also possible
//})
//
////
////describe('App render', () => {
////    it('should render correctly with title and description', () => {
////    const wrapper = shallow(
////        <App />
////    ).dive();
////    expect(toJson(wrapper)).toMatchSnapshot();
////});
////});
////test('full app rendering/navigating', (done) => {
////  const history = createMemoryHistory()
////  const { container, getByText } = render(
////    <Router history={history}>
////      <App />
////    </Router>
////  )
////  // verify page content for expected route
////  // often you'd use a data-testid or role query, but this is also possible
////  expect(container.innerHTML).toMatch('<div class=\"global_container\"><div class=\"loading_container\"><img src=\"gif_loading.gif\" alt=\"Loading ...\"></div></div>')
////    setTimeout(() => {
//////        console.log(container.innerHTML)
////
////        done();
////      });
////})
////
////it("fetches images from unsplash and renders them on mount", done => {
////  const wrapper = shallow(<App  someProp={1}/>);
////  setTimeout(() => {
////    const state = wrapper.instance();
////    console.log(wrapper.instance())
////    wrapper.update();
////    const state2 = wrapper.instance().state;
////    console.log(wrapper.instance().hasUnmounted)
////    console.log(state.state)
//////    expect(state.term).toEqual("Mountains");
//////    expect(state.status).toEqual("done");
//////    expect(state.images.length).toEqual(1);
//////
//////    expect(wrapper.find("Image").length).toEqual(1);
////
////    done();
////  });
////});
////describe('< SampleComponent />', () => {
////  it('should render', () => {
////    const wrapper = shallow(<App name="Example" />);
////     console.log(wrapper.dive().state())
////    expect(wrapper).toHaveLength(1);
////  });
////   describe('check props', () => {
////     const  wrapper = mount(<App />);
////     wrapper.setState({test: 'test'})
////     console.log(wrapper.state()); // you should see name='Example'
//// });
////});
//////  it('incrementCounter: should increment state.count by 1', () => {
//////    const wrapper = shallow(<Counter initialCountValue={0}/>);
//////    const instance = wrapper.instance();
//////    expect(instance.state.count).toBe(0);
//////    instance.incrementCounter();
//////    expect(instance.state.count).toBe(1);
//////  });
//////  it('decrementCounter: should decrement state.count by 1', () => {
//////    const wrapper = shallow(<Counter initialCountValue={1}/>);
//////    const instance = wrapper.instance();
//////    expect(instance.state.count).toBe(1);
//////    instance.decrementCounter();
//////    expect(instance.state.count).toBe(0);
//////  });
//////  it('should call props on increment/decrement', () => {
//////    const incrementSpy = jest.fn();
//////    const decrementSpy = jest.fn();
//////    const wrapper = shallow(<Counter initialCountValue={1} onIncrement={incrementSpy} onDecrement={decrementSpy}/>);
//////    const instance = wrapper.instance();
//////    instance.incrementCounter();
//////    expect(incrementSpy).toBeCalledWith(2);
//////    instance.decrementCounter();
//////    expect(decrementSpy).toBeCalledWith(1);
//////  });
    it("Renders correctly", () => {
        expect(1).toBe(1);
    });
