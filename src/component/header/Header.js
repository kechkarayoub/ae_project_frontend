import btContact from '../images/header/bt-contacts.png';
import btFunding from '../images/header/bt-funding.png';
import btHome from '../images/header/bt-home.png';
import btLinks from '../images/header/bt-links.png';
import btProperties from '../images/header/bt-properties.png';
import btSellers from '../images/header/bt-sellers.png';
import btTestimonials from '../images/header/bt-testimonial.png';
import headerBg from '../images/header/header_bg.jpg';
import LanguagesList from '../utils/LanguagesList';
import logo from '../images/logo.jpg';
import React, { Component } from 'react';
import realtor_img from '../images/header/realtor_img.jpg';
import store from 'store';
import { BrowserRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withTranslation } from 'react-i18next';
import './Header.css';

const MenuLayout = (props) => (
    <div className="wrapper">
        <div className="langues-infos">
            {
                props.header_params.i18n ?
                    <div className="changelangue">
                        <LanguagesList on_click={(selected_language) => props.handleLanguageChange(selected_language)} t={props.t}/>
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
                onClick={props.toggleNavigation}
                type="button"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${props.showMobileMenu ? '' : 'collapse'} navbar-collapse`} id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <div className="nav-div">
                        <Link className="nav-item nav-link link-home" to="/" onClick={props.toggleNavigation}>
                            <span className="bt-icon">
                                <img src={btHome} alt="Home"/>
                            </span>
                            <span className="bt-text">{ props.t('header.nav.home') }</span>
                        </Link>
                    </div>
                    <div className="nav-div">
                        <Link className="nav-item nav-link link-properties" to="/properties" onClick={props.toggleNavigation}>
                            <span className="bt-icon">
                                <img src={btProperties} alt="Properties"/>
                            </span>
                            <span className="bt-text">{ props.t('header.nav.properties') }</span>
                        </Link>
                    </div>
                    <div className="nav-div">
                        <div className="nav-item nav-link link-buyorsell" onClick={(evt) => {props.toggleBuySellSubmenu(evt)}}>
                            <span className="bt-icon">
                                <img src={btSellers} alt="Buy"/>
                            </span>
                            <span className="bt-text">{ props.t('header.nav.buy') }<FontAwesomeIcon icon="caret-down" /></span>
                            {props.showBuySellSubmenu &&
                                <div className="submenu">
                                    <Link className="nav-item nav-link link-properties" to="/buy" onClick={(evt) => props.toggleBuySellSubmenu(evt, true)}>
                                        <span className="bt-icon">
                                            <img src={btSellers} alt="Buy"/>
                                        </span>
                                        <span className="bt-text">{ props.t('header.nav.buy') }</span>
                                    </Link>
                                    <Link className="nav-item nav-link link-properties" to="/sell" onClick={(evt) => props.toggleBuySellSubmenu(evt, true)}>
                                        <span className="bt-icon">
                                            <img src={btSellers} alt="Sell"/>
                                        </span>
                                        <span className="bt-text">{ props.t('header.nav.sell') }</span>
                                    </Link>
                                    <Link className="nav-item nav-link link-properties" to="/rent" onClick={(evt) => props.toggleBuySellSubmenu(evt, true)}>
                                        <span className="bt-icon">
                                            <img src={btSellers} alt="Rent"/>
                                        </span>
                                        <span className="bt-text">{ props.t('header.nav.rent') }</span>
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="nav-div">
                        <Link className="nav-item nav-link link-funding" to="/funding" onClick={props.toggleNavigation}>
                            <span className="bt-icon">
                                <img src={btFunding} alt="Funding"/>
                            </span>
                            <span className="bt-text">{ props.t('header.nav.funding') }</span>
                        </Link>
                    </div>
                    <div className="nav-div">
                        <Link className="nav-item nav-link link-testimonial" to="/testimonial" onClick={props.toggleNavigation}>
                            <span className="bt-icon">
                                <img src={btTestimonials} alt="Testimonial"/>
                            </span>
                            <span className="bt-text">{ props.t('header.nav.testimonial') }</span>
                        </Link>
                    </div>
                    <div className="nav-div">
                        <Link className="nav-item nav-link link-usefullinks" to="/usefullinks" onClick={props.toggleNavigation}>
                            <span className="bt-icon">
                                <img src={btLinks} alt="Useful links"/>
                            </span>
                            <span className="bt-text">{ props.t('header.nav.useful_links') }</span>
                        </Link>
                    </div>
                    <div className="nav-div">
                        <Link className="nav-item nav-link link-contact" to="/contact" onClick={props.toggleNavigation}>
                            <span className="bt-icon">
                                <img src={btContact} alt="Contact"/>
                            </span>
                            <span className="bt-text">{ props.t('header.nav.contact') }</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    </div>
)

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header_params: props.header_params,
            showMobileMenu: false,
            showBuySellSubmenu: false
        };
        this.toggleNavigation = this.toggleNavigation.bind(this);

    }
    componentDidMount() {
    }
    toggleNavigation(){
        this.setState({
            showMobileMenu: !this.state.showMobileMenu,
            showBuySellSubmenu: false
        });
    }
    toggleBuySellSubmenu = (evt, close) => {
        if(close){
            evt.stopPropagation();
            this.setState({
                showBuySellSubmenu: false,
                showMobileMenu: false
            });
        }
        else{
            this.setState({
                showBuySellSubmenu: !this.state.showBuySellSubmenu,
            });
        }
    };
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
                <div className="bg-header" data-test="bg-header" style={{backgroundImage: header_params.header_settings.header_background_image ? "url(" + header_params.header_settings.header_background_image + ")" : "none", backgroundSize: "100% 100%"}}>
                    <div className="bg-header-2">
                        <div className="topbanner">
                            <div className="menubanner" data-test="menubanner">
                                <MenuLayout
                                    header_params={header_params}
                                    showMobileMenu={showMobileMenu}
                                    toggleNavigation={this.toggleNavigation}
                                    toggleBuySellSubmenu={(evt, close) => this.toggleBuySellSubmenu(evt, close)}
                                    showBuySellSubmenu={this.state.showBuySellSubmenu}
                                    t={this.props.t}
                                    handleLanguageChange={(selected_language) => this.handleLanguageChange(selected_language)}
                                />
                            </div>
                        </div>
                        <div className="header-bottom">
                            <div className="wrapper">
                                <div className="logo_el" data-test="logo_el">
                                    <Link to="/">
                                        <img src={header_params.header_settings.logo || logo} alt="Header background" />
                                    </Link>
                                    <div className="realtor_data" style={{color: header_params.header_settings.header_text_color}}>
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
                                <div className="nweb_header_img">

                                </div>
                                <div className="header_bg_el">
                                    {header_params.header_settings && header_params.header_settings.header_image ?
                                        <img src={header_params.header_settings.header_image} alt="Logo" />
                                    :
                                        <img src={headerBg} alt="Logo" />
                                    }
                                </div>
                                <div className="realtor_el">
                                    {header_params.realtor_data && header_params.realtor_data.image ?
                                        <img src={header_params.realtor_data.image} alt="Realtor" />
                                    :
                                        <img src={realtor_img} alt="Realtor" />
                                    }
                                </div>
                                <div className="header_txt">
                                    <div className="realtor_data" style={{color: header_params.header_settings.header_text_color}}>
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

