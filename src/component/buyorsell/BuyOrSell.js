
import ContactCreate from '../contact/ContactCreate';
import PropertyBuyCreate from './PropertyBuyCreate';
import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TitlePage from '../utils/TitlePage';
import { withTranslation, Trans } from 'react-i18next';
import './BuyOrSell.css';



class BuyOrSell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "to_buy"
        };
    }
    render() {
        return (
            <div className="buyorsell">
                <div className="intr">
                    <p>
                        {this.props.t('buyorsell.intro')}
                    </p>
                </div>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={this.state.key}
                    onSelect={key => this.setState({ key })}
                    className="tabs_buy_sell"
                >
                    <Tab eventKey="to_buy" title={this.props.t('buyorsell.to_buy')} className="content_tab tab_to_buy">
                        <TitlePage title={this.props.t('buyorsell.to_buy')}/>
                        <PropertyBuyCreate {...this.props} />
                    </Tab>
                    <Tab eventKey="to_sell" title={this.props.t('buyorsell.to_sell')} className="content_tab tab_to_sell">
                        <TitlePage title={this.props.t('buyorsell.to_sell')}/>
                        <ContactCreate title="" object={this.props.t('buyorsell.sell_a_property')} t={this.props.t}/>
                    </Tab>
			    </Tabs>
            </div>
        );
    }
}

export default withTranslation('common')(BuyOrSell);
