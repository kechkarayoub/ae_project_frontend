import Newsletter from '../newsletter/Newsletter';
import React from 'react';
import SocialLink from './SocialLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';

const today = new Date();
const Footer = (props) => (
    <footer>
        <div className="wrapper">
            <div className="realtor_info">
                {props.realtor_data.full_name + " | " + props.realtor_data.agency_name + " | " + props.realtor_data.address}
            </div>
            <div className="newsletter_and_social_links">
                <Newsletter t={props.t}/>
                <div className="social_links">
                    {props.footer_params.socialLinks.map((socialLink, i) =>
                        <SocialLink socialLink={socialLink} key={i} />
                    )}
                </div>
            </div>
            <div className="powered_by">
                { props.t('footer.powered_by') }<div className="site_name"><a className="" href="/">{props.footer_params.site_name}</a></div>
            </div>
            <div className="copyright">
                <FontAwesomeIcon icon="copyright"/>{today.getFullYear()}, <div className="site_name">{ props.t('footer.all_rights_reserved') }</div>
            </div>
        </div>
    </footer>
)

export default Footer;
