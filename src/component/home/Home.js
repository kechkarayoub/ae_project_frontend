import React, { Component } from 'react';
import './Home.css';
import TitlePage from '../utils/TitlePage';

import { withTranslation, Trans } from 'react-i18next';

class Home extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (

            <div className="home--container" data-test="home__container">
                <TitlePage title={this.props.t('global.title_page.home')}/>
                <div className="subtitle home_child" data-test="home__title">
                    <h2>
                        <Trans i18nKey="common:home.title.title_1">
                        </Trans>
                    </h2>
                    <h2>
                        <Trans i18nKey="common:home.title.title_2">
                        </Trans>
                    </h2>
                </div>
                <div className="home_child half">
                    <h2>
                        <Trans i18nKey="common:home.left_side.title">
                        </Trans>
                    </h2>
                    <p>
                        <Trans i18nKey="common:home.left_side.p1">
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="common:home.left_side.p2">
                            <b>YevGeniya</b> is a dedicated and experienced real estate broker in residential property and income property transactions. Her work stands out particularly by her developed sense of diplomacy.
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="common:home.left_side.p3">
                        </Trans>
                    </p>
                </div>
                <div className="home_child half half2">
                    <h2>
                        <Trans i18nKey="common:home.right_side.title">
                        </Trans>
                    </h2>
                    <p>
                        <Trans i18nKey="common:home.right_side.p1">
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="common:home.right_side.p2">
                            <b>Natalia</b> is a dynamic broker and expert on the Montreal real estate market and particularly proud of the fact that her business comes from references from former satisfied clients. Her negotiating skills will be valuable assets in your transaction. Her effectiveness is disarming and its professionalism is remarkable.
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="common:home.right_side.p3">
                        </Trans>
                    </p>
                </div>
                <div className="home_child">
                    <h2>
                        <Trans i18nKey="common:home.bottom_side_1.title">
                        </Trans>
                    </h2>
                    <p>
                        <Trans i18nKey="common:home.bottom_side_1.p1">
                            <b>For the year 2018, on average, our properties were sold for 98% of their asking price and in less than 33 days!</b> (Source: CIGM - Real Estate Board of Greater Montreal)
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="common:home.bottom_side_1.p2">
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="common:home.bottom_side_1.p3">
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="common:home.bottom_side_1.p4">
                        </Trans>
                    </p>
                </div>
                <div className="home_child">
                    <h2>
                        <Trans i18nKey="common:home.bottom_side_2.title">
                        </Trans>
                    </h2>
                    <p>
                        <Trans i18nKey="common:home.bottom_side_2.p1">
                            <b>CENTURY 21</b> is the most recognized brand in the real estate world in <b>79 countries</b> worldwide, and is currently working to expand its market share through <b>Canadian and international</b> operations in North America, Europe, Latin America, the Middle East and Asia.
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="common:home.bottom_side_2.p2">
                        </Trans>
                    </p>
                    <p>
                        <Trans i18nKey="common:home.bottom_side_2.p3">
                        </Trans>
                    </p>
                </div>
            </div>
        );
    }
}

export default withTranslation('common')(Home);
