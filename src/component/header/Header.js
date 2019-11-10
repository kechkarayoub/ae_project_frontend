import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import GlobalParamsService from '../../services/GlobalParamsService';
import btContact from '../images/header/bt-contacts.png';
import btHome from '../images/header/bt-home.png';
import btLinks from '../images/header/bt-links.png';
import btProperties from '../images/header/bt-properties.png';
import btSellers from '../images/header/bt-sellers.png';
import btTestimonials from '../images/header/bt-testimonial.png';
import logo from '../images/logo.png';
import slideHeader1 from '../images/header/slide_header_1.jpg';
import slideHeader2 from '../images/header/slide_header_2.jpg';
import slideHeader3 from '../images/header/slide_header_3.jpg';
import realtor_img from '../images/header/realtor_img.jpg';
import LanguagesList from '../utils/LanguagesList';
import { BrowserRouter, Link } from 'react-router-dom';
import store from 'store';
import { withTranslation, Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';

const globalParamsService = new GlobalParamsService();
const MenuLayout = ({toggleNavigation, showMobileMenu, header_params, t, handleLanguageChange}) => (
    <div className="wrapper">
        <div className="langues-infos">
            {
                header_params.i18n ?
                    <div className="changelangue">
                        <LanguagesList on_click={(selected_language) => handleLanguageChange(selected_language)} t={t}/>
                    </div>
                    :
                    <div className=""></div>
            }
        </div>
        <nav className="navbar navbar-expand-lg justify-content-center">
            <button
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                data-test="open_menu_mobile"
                onClick={toggleNavigation}
                type="button"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${showMobileMenu ? '' : 'collapse'}` + " navbar-collapse"} id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link link-home" to="/">
                        <span className="bt-icon">
                            <img src={btHome} alt="Home"/>
                        </span>
                        <span className="bt-text">{ t('header.nav.home') }</span>
                    </Link>
                    <Link className="nav-item nav-link link-properties" to="/properties">
                        <span className="bt-icon">
                            <img src={btProperties} alt="Home"/>
                        </span>
                        <span className="bt-text">{ t('header.nav.properties') }</span>
                    </Link>
                    <Link className="nav-item nav-link link-buyorsell" to="/buyorsell">
                        <span className="bt-icon">
                            <img src={btSellers} alt="Home"/>
                        </span>
                        <span className="bt-text">{ t('header.nav.buy_sell') }</span>
                    </Link>
                    <Link className="nav-item nav-link link-testimonial" to="/testimonial">
                        <span className="bt-icon">
                            <img src={btTestimonials} alt="Home"/>
                        </span>
                        <span className="bt-text">{ t('header.nav.testimonial') }</span>
                    </Link>
                    <Link className="nav-item nav-link link-usefullinks" to="/usefullinks">
                        <span className="bt-icon">
                            <img src={btLinks} alt="Home"/>
                        </span>
                        <span className="bt-text">{ t('header.nav.useful_links') }</span>
                    </Link>
                    <Link className="nav-item nav-link link-contact" to="/contact">
                        <span className="bt-icon">
                            <img src={btContact} alt="Home"/>
                        </span>
                        <span className="bt-text">{ t('header.nav.contact') }</span>
                    </Link>
                </div>
            </div>
        </nav>
    </div>
)

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header_params: {},
            showMobileMenu: false
        };
        this.toggleNavigation = this.toggleNavigation.bind(this);

    }
    componentDidMount() {
        globalParamsService.getHeaderParams().then(result => {
            this.setState({
                header_params: result
            });
        });
    }
    toggleNavigation(){
        this.setState({showMobileMenu: !this.state.showMobileMenu});
    }
    generateLink(current_url, id){
        return <BrowserRouter>
            <Link className="nav-item nav-link" to={current_url} id={id}>
            </Link>
        </BrowserRouter>
    }
    handleLanguageChange(selected_language){
        store.set("current_langue", selected_language);
        window.location.reload();
        // this.props.i18n.changeLanguage(selected_language);

    }
    render() {
        const { header_params, showMobileMenu } = this.state;
        return (
            <header>
                <div className="bg-header" data-test="bg-header">
                    <div className="bg-header-2">
                        <div className="topbanner">
                            <div className="menubanner" data-test="menubanner">
                                <MenuLayout
                                    header_params={header_params}
                                    showMobileMenu={showMobileMenu}
                                    toggleNavigation={this.toggleNavigation}
                                        t={this.props.t}
                                        handleLanguageChange={(selected_language) => this.handleLanguageChange(selected_language)}
                                />
                            </div>
                        </div>
                        <div className="header-bottom">
                            <div className="wrapper">
                                <div id="slide_show">
                                    <ul className="rslides" id="slider1">
                                        <li style={{display: "none"}}><img src={slideHeader1} alt="Slideshow" /></li>
                                        <li><img src={slideHeader2} alt="Slideshow" /></li>
                                        <li style={{ display: "none" }}><img src={slideHeader3} alt="Slideshow" /></li>
                                    </ul>
                                </div>
                                <div className="nweb_header_img">

                                </div>
                                <div className="logo_el" data-test="logo_el">
                                    <a href="/">
                                        <img src={logo} alt="Logo" />
                                    </a>
                                </div>
                                <div className="realtor_el">

                                    <img src={realtor_img} alt="Realtor" />
                                    <div className="realtor_data">
                                        {header_params.realtor_data && header_params.realtor_data.full_name &&
                                            <div className="full-name">
                                                {header_params.realtor_data.full_name}
                                            </div>
                                        }
                                        {header_params.realtor_data && header_params.realtor_data.agency_name &&
                                            <div className="agency-name">
                                                {header_params.realtor_data.agency_name}
                                            </div>
                                        }
                                        {header_params.realtor_data &&
                                        (header_params.realtor_data.tel || header_params.realtor_data.fax) &&
                                            <div className="tel_fax">
                                                {header_params.realtor_data.tel &&
                                                    <div className="tel">
                                                        <FontAwesomeIcon icon="phone-alt" />
                                                        {header_params.realtor_data.tel}
                                                    </div>
                                                }
                                                {header_params.realtor_data.fax &&
                                                    <div className="fax">
                                                        <FontAwesomeIcon icon="fax" />
                                                        {header_params.realtor_data.fax}
                                                    </div>
                                                }
                                            </div>
                                        }
                                        {header_params.realtor_data && header_params.realtor_data.email &&
                                            <div className="email">
                                                <FontAwesomeIcon icon="at" />
                                                {header_params.realtor_data.email}
                                            </div>
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default withTranslation('common')(Header);

