import React, { Component } from 'react';
import TitlePage from '../utils/TitlePage';
import { withTranslation, Trans } from 'react-i18next';
import './Home.css';


class Home extends Component {
    constructor(props){
        super(props);
        document.title = props.t('header.nav.home');
    }

    render() {
        return (
            <div className="home--container" data-test="home__container">
                <TitlePage title={this.props.t('global.title_page.home')}/>
                {this.props.home_page_data.empty ?
                <div>
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
                    <div className="home_child">
                        <h2>
                            <Trans i18nKey="common:home.bottom_side_3.title">
                            </Trans>
                        </h2>
                        <p>
                            <Trans i18nKey="common:home.bottom_side_3.p1">
                                <b>CENTURY 21</b> is the most recognized brand in the real estate world in <b>79 countries</b> worldwide, and is currently working to expand its market share through <b>Canadian and international</b> operations in North America, Europe, Latin America, the Middle East and Asia.
                            </Trans>
                        </p>
                        <p>
                            <Trans i18nKey="common:home.bottom_side_3.p2">
                            </Trans>
                        </p>
                        <p>
                            <Trans i18nKey="common:home.bottom_side_3.p3">
                            </Trans>
                        </p>
                    </div>
                </div>
                :
                <div>
                    <div className="subtitle home_child" data-test="home__title">
                        <h2>
                            {this.props.home_page_data.home_page_title_1}
                        </h2>
                        <h2>
                            {this.props.home_page_data.home_page_title_2}
                        </h2>
                    </div>
                    <div className="home_child">
                        <h2>
                            {this.props.home_page_data.home_page_row_1_title}
                        </h2>
                        <p>
                            {this.props.home_page_data.home_page_row_1_p_1}
                        </p>
                        <p>
                            {this.props.home_page_data.home_page_row_1_p_2}
                        </p>
                        <p>
                            {this.props.home_page_data.home_page_row_1_p_3}
                        </p>
                    </div>
                    <div className="home_child">
                        <h2>
                            {this.props.home_page_data.home_page_row_2_title}
                        </h2>
                        <p>
                            {this.props.home_page_data.home_page_row_2_p_1}
                        </p>
                        <p>
                            {this.props.home_page_data.home_page_row_2_p_2}
                        </p>
                        <p>
                            {this.props.home_page_data.home_page_row_2_p_3}
                        </p>
                    </div>
                    <div className="home_child">
                        <h2>
                            {this.props.home_page_data.home_page_row_3_title}
                        </h2>
                        <p>
                            {this.props.home_page_data.home_page_row_3_p_1}
                        </p>
                        <p>
                            {this.props.home_page_data.home_page_row_3_p_2}
                        </p>
                        <p>
                            {this.props.home_page_data.home_page_row_3_p_3}
                        </p>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default withTranslation('common')(Home);
