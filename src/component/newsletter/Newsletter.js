import React, { Component } from 'react';
import NewsletterCreate from './NewsletterCreate';
import NewsletterReUnsubscribe from './NewsletterReUnsubscribe';
import './Newsletter.scss';


class Newsletter extends Component {

    constructor(props) {
        super(props);
        if(props.match){
            this.state = {
                action: props.match.params.action,
                user_email: props.match.params.user_email,
            };
        }
        else{
            this.state = {};
        }
    }
    render() {
        const { action, user_email } = this.state;
        const is_newsletter_form = !(action || user_email);
        return (

            <div className="newsletter">
                {is_newsletter_form?
                    <NewsletterCreate t={this.props.t}/>
                :
                    <NewsletterReUnsubscribe action={action} user_email={user_email} />
                }
            </div>
        );
    }
}

export default Newsletter;
