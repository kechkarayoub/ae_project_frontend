import BuyOrSell from './component/buyorsell/BuyOrSell';
import Contact from './component/contact/Contact';
import Footer from './component/footer/Footer';
import Funding from './component/funding/Funding';
import GlobalParamsService from './services/GlobalParamsService';
import Header from './component/header/Header';
import Home from './component/home/Home';
import LoadingContent from './component/loading/LoadingContent';
import mainBgImage from './component/images/body/main-bg.jpg';
import Newsletter from './component/newsletter/Newsletter';
import NotFoundPage from './component/notfound/NotFoundPage';
import Properties from './component/property/Properties';
import PropertyDetails from './component/property/PropertyDetails';
import PropertyDetailsPrint from './component/property/PropertyDetailsPrint';
import React, { Component } from 'react';
import store from 'store';
import Testimonial from './component/testimonial/Testimonial';
import UsefulLinks from './component/usefullinks/UsefulLinks';
import withUnmounted from '@ishawnwang/withunmounted';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { withTranslation } from 'react-i18next';
import {
    faAddressCard, faAngleDoubleLeft, faAngleDoubleRight, faAngleDown, faAngleUp, faAt, faBath, faBed, faCar, faCheckCircle, faCopyright, faDownload, faFax, faFire,
    faFireAlt, faFireExtinguisher, faParking, faPhoneAlt, faPlus,  faPrint, faSwimmingPool,
    faTree
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebook, faGooglePlus, faInstagram, faLinkedin, faTwitter, faYoutube
} from '@fortawesome/free-brands-svg-icons';
import  './App.css';

library.add(
    fab, faBath, faBed, faCar, faCopyright, faDownload, faFacebook, faGooglePlus, faInstagram, faLinkedin, faPrint, faTwitter, faYoutube
)
library.add(fas, faAddressCard, faAngleDoubleLeft, faAngleDoubleRight, faAngleDown, faAngleUp, faAt, faCheckCircle, faFax, faFire, faFireAlt, faFireExtinguisher,
    faParking, faPhoneAlt, faPlus, faSwimmingPool, faTree
)


const globalParamsService = new GlobalParamsService();
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            global_params: {},
            ready: false
        };
        this.hasUnmounted = false;
        if(!store.get('current_langue')){
            store.set('current_langue', "en");
        }
    }
    componentDidMount() {
        var self = this;
        globalParamsService.getGlobalParams().then(async result => {
//            if (self.hasUnmounted) {
//                // check hasUnmounted flag
//                return;
//            }
            self.setState({
                global_params: result,
                ready: true
            });
        })
        .catch(function(message, file, line, col, error){
            console.log(error);
        });
    }
    componentWillUnmount() {
    }
    render() {
        const { global_params, ready } = this.state;
        return (
            <div className="global_container">
                {ready ?
                <div className="page_content">
                    <HashRouter>
                        <Header header_params={global_params.header_params}/>
                        <div className="body" style={{backgroundImage: "url(" + (global_params.header_params.header_settings.mainBgImage || mainBgImage) + ")"}}>
                            <div className="content">
                                <Switch>
                                    <Route path="/" exact render={(props) => <Home
                                        home_page_data={global_params.home_page_data} 
                                        t={this.props.t}
                                    />} />
                                    <Route path="/funding" exact render={(props) => <Funding
                                        cities={global_params.selects_choices_dict.CITIES} />}
                                        t={this.props.t}
                                    />
                                    <Route path="/properties" exact render={(props) => <Properties
                                        selects_choices_dict={global_params.selects_choices_dict}
                                        selects_choices={global_params.selects_choices}
                                        t={this.props.t}
                                    />} />
                                    <Route path="/property/:id" exact render={(props) => <PropertyDetails
                                        is_maps_active={global_params.is_maps_active}
                                        selects_choices_dict={global_params.selects_choices_dict}
                                        match={props.match}
                                        t={this.props.t}
                                    />} />
                                    <Route path="/newsletter/:action/:user_email" exact render={(props) => <Newsletter match={props.match} />} />
                                    <Route path="/property/print/:id" exact render={(props) => <PropertyDetailsPrint
                                        is_maps_active={global_params.is_maps_active}
                                        selects_choices_dict={global_params.selects_choices_dict}
                                        match={props.match} realtor_data={global_params.realtor_data}
                                        t={this.props.t}
                                    />} />
                                    <Route path="/buyorsell" exact render={(props) => <BuyOrSell
                                        selects_choices={global_params.selects_choices} />}
                                        t={this.props.t}
                                    />
                                    <Route path="/contact/:id" exact render={(props) => <Contact
                                        match={props.match}
                                        realtor_data={global_params.realtor_data}/>}
                                        t={this.props.t}
                                    />
                                    <Route path="/usefullinks" exact render={(props) => <UsefulLinks
                                        t={this.props.t} />}
                                    />
                                    <Route path="/contact" exact render={(props) => <Contact
                                        realtor_data={global_params.realtor_data} />}
                                        t={this.props.t}
                                    />
                                    <Route path="/testimonial" exact render={(props) => <Testimonial
                                        cities={global_params.selects_choices_dict.CITIES} />}
                                        t={this.props.t}
                                    />
                                    <Route component={NotFoundPage} />
                                </Switch>
                            </div>
                        </div>
                        <Footer 
                            footer_params={global_params.footer_params} 
                            realtor_data={global_params.realtor_data}
                            t={this.props.t}
                        />
                    </HashRouter>
                </div>
               :
                <LoadingContent 
                    t={this.props.t}
                />
            }
            </div >
        );
    }
}

export default withTranslation('common')(withUnmounted(App));
