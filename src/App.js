import BuyOrSell from './component/buyorsell/BuyOrSell';
import Contact from './component/contact/Contact';
import Footer from './component/footer/Footer';
import GlobalParamsService from './services/GlobalParamsService';
import Header from './component/header/Header';
import Home from './component/home/Home';
import LoadingContent from './component/loading/LoadingContent';
import Newsletter from './component/newsletter/Newsletter';
import NotFoundPage from './component/notfound/NotFoundPage';
import Properties from './component/property/Properties';
import PropertyDetails from './component/property/PropertyDetails';
import PropertyDetailsPrint from './component/property/PropertyDetailsPrint';
import React, { Component } from 'react';
import Testimonial from './component/testimonial/Testimonial';
import UsefulLinks from './component/usefullinks/UsefulLinks';
import withUnmounted from '@ishawnwang/withunmounted';
import { withTranslation, Trans } from 'react-i18next';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
    faAddressCard, faAngleDoubleLeft, faAngleDoubleRight, faAngleDown, faAngleUp, faAt, faBath, faBed, faCar, faCheckCircle, faCopyright, faDownload, faFax, faFire,
    faFireAlt, faFireExtinguisher, faParking, faPhoneAlt, faPlus,  faPrint, faSwimmingPool,
    faTree
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebook, faGooglePlus, faInstagram, faLinkedin, faTwitter, faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import {reactLocalStorage} from 'reactjs-localstorage';
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
        if(!reactLocalStorage.get('current_langue')){
            reactLocalStorage.set('current_langue', "en");
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
        .catch(function(err){
            console.log(err);
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
                    <BrowserRouter>
                        <Header/>
                        <div className="body">
                            <div className="content">
                                <Switch>
                                    <Route path="/" exact render={(props) => <Home 
                                        t={this.props.t}
                                    />} />
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
                                        cities={global_params.selects_choices.CITIES} />}
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
                    </BrowserRouter>
                </div>
               :
                <LoadingContent />
            }
            </div >
        );
    }
}

export default withTranslation('common')(withUnmounted(App));
