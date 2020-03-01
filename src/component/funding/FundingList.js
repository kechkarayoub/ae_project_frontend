import FundingItem from './FundingItem';
import FundingService from "../../services/FundingService";
import React, { Component } from 'react';
import TitlePage from '../utils/TitlePage';
import { withTranslation } from 'react-i18next';
import './FundingList.css';

const fundingService = new FundingService();

class FundingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fundings: [],
            ready: false
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
        const { fundings, ready } = this.state;
        return (
            <div className="fundings_container">
                <TitlePage title={this.props.t('global.title_page.funding')}/>
                {ready ?
                    <div className="fundings_content">
                        {fundings.length === 0 &&
                            <div>{this.props.t('funding.no_funding')}</div>
                        }
                        {fundings.map((fundingItem, i) =>
                            <FundingItem
                                t={this.props.t} fundingItem={fundingItem} key={i}
                            />
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