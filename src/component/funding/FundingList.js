import FeedbackServer from '../utils/FeedbackServer';
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
            feedback_messages: [],
            fundings: [],
            ready: false,
            cities: props.cities,
            showFeedback: false,
            feedback_success: false,
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

    send_funding_email = fundingItem => {
        fundingService.send_funding_email({funding_id: fundingItem.pk}).then(result => {
            var feedback_messages = [];
            var feedback_success = true;
            if(result.data.success){
                feedback_messages = [this.props.t('funding.email_sent')];
            }
            else{
                feedback_messages = [result.data.message];
                feedback_success = false;
            }
            this.setState({showFeedback: true, feedback_success: feedback_success, feedback_messages: feedback_messages});
        }).catch(() => {
            var feedback_messages = [this.props.t('funding.server_error')];
            this.setState({showFeedback: true, feedback_success: false, feedback_messages: feedback_messages});
        });
    }

    handleCloseFeedback() {
       this.setState({ showFeedback: false });
    }

    render() {
        const { fundings, ready, cities, feedback_success, showFeedback, feedback_messages } = this.state;
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
                                t={this.props.t} fundingItem={fundingItem} key={i} cities={cities}
                                send_funding_email={() => this.send_funding_email(fundingItem)}
                            />
                        )}
                        <FeedbackServer showFeedback={showFeedback} feedback_success={feedback_success} feedback_messages={feedback_messages} handleCloseFeedback={() => this.handleCloseFeedback()}/>
                    </div>
                :
                    <div></div>
                }
            </div >
        );
    }
}
export default withTranslation('common')(FundingList);