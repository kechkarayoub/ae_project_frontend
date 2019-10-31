import React, { Component } from 'react';
import TestimonialService from "../../services/TestimonialService";
import TestimonialCreate from './TestimonialCreate';
import TestimonialItem from './TestimonialItem';
import TitlePage from '../utils/TitlePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withTranslation, Trans } from 'react-i18next';
import './TestimonialsList.scss';

const testimonialService = new TestimonialService();

class TestimonialsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            testimonials: [],
            ready: false,
            cities: props.cities,
            nextPageURL: '',
            prevPageURL: '',
            collapsed: true
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    componentDidMount() {
        var self = this;
        testimonialService.getTestimonials().then(function (result) {
            self.setState({
                testimonials: result.data,
                nextPageURL: result.nextLink,
                prevPageURL: result.prevLink,
                ready: true
            })
        });
    }

    nextPage(){
        var  self  =  this;
        testimonialService.getTestimonialsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ testimonials: result.data, nextPageURL: result.nextLink, prevPageURL: result.prevLink })
        });
    }

    toggleCollapse() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    prevPage(){
        var  self  =  this;
        testimonialService.getTestimonialsByURL(this.state.prevPageURL).then((result) => {
            self.setState({ testimonials: result.data, nextPageURL: result.nextLink, prevPageURL: result.prevLink })
        });
    }

    handleTestimonialAdded(testimonial){
        this.setState({ testimonials: [testimonial].concat(this.state.testimonials) });
    }

    render() {
        const { testimonials, ready, cities, nextPageURL, prevPageURL, collapsed } = this.state;
        return (
            <div className="testimonials_container">
                <TitlePage title={this.props.t('global.title_page.testimonial')}/>
                <div className="add_testemonial_btn">
                    <button data-toggle="collapse" data-target="#testimonial_form" onClick={this.toggleCollapse} className={collapsed ? "" : "hidden"}><FontAwesomeIcon icon="plus" /></button>
                </div>
                <div className={collapsed ? "collapse" : ""}>
                    <TestimonialCreate t={this.props.t} cities={cities} handleTestimonialAdded={this.handleTestimonialAdded.bind(this)} toggleCollapse={this. onClick=this.toggleCollapse} collapsed={collapsed}/>
                </div> 
                {ready ?
                    <div className="testimonials_content">
                        {testimonials.map((testimonialItem, i) =>
                            <TestimonialItem t={this.props.t} testimonialItem={testimonialItem} key={i} />
                        )}
                        <div className="actions">
                            {prevPageURL && <button className="btn btn-primary" onClick={this.prevPage}><FontAwesomeIcon icon="angle-double-left" /></button>}
                            {nextPageURL && <button className="btn btn-primary" onClick={this.nextPage}><FontAwesomeIcon icon="angle-double-right" /></button>}
                        </div>
                    </div>

                    :
                    <div></div>
                }
            </div >
        );
    }
}
export default withTranslation('common')(TestimonialsList);