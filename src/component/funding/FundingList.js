import React, { Component } from 'react';
import FundingService from "../../services/FundingService";
import FundingItem from './FundingItem';
import TitlePage from '../utils/TitlePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withTranslation, Trans } from 'react-i18next';
import './FundingList.css';

const fundingService = new FundingService();

class FundingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fundings: [],
            ready: false,
            cities: props.cities,
        };
    }

    componentDidMount() {
        var self = this;
        fundingService.getFundings().then(function (result) {
            self.setState({
                fundings: result.data,
                ready: true
            })
        });
    }

    render() {
        const { fundings, ready, cities } = this.state;
        return (
            <div className="fundings_container">
                <TitlePage title={this.props.t('global.title_page.funding')}/>
                {ready ?
                    <div className="fundings_content">
                        {fundings.length === 0 &&
                            <div>{this.props.t('funding.no_funding')}</div>
                        }
                        {fundings.map((fundingItem, i) =>
                            <FundingItem t={this.props.t} fundingItem={fundingItem} key={i} cities={cities} />
                        )}
                    </div>

                    :
                    <div></div>
                }
            </div >
        );
    }
}
export default withTranslation('common')(FundingList);