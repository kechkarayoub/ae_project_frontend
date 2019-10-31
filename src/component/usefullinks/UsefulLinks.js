import LinksList from './LinksList';
import React from 'react';
import { withTranslation, Trans } from 'react-i18next';
import './UsefulLinks.scss';

const UsefulLinks = (props) => (
    <div>
        <LinksList {...props}/>
    </div>
)

export default withTranslation('common')(UsefulLinks);
