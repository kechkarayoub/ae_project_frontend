import NewsletterService from '../../services/NewsletterService';
import React, { Component } from 'react';
import TitlePage from '../utils/TitlePage';
import { is_valid_email } from '../../utils.js';
import './NewsletterReUnsubscribe.css';

const newsletterService = new NewsletterService();
class NewsletterReUnsubscribe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            action: props.action,
            user_email: props.user_email,
            emailObj: {
                value: "",
                error: ""
            }
        };
    }


    componentDidMount() {
        var self = this;
        if(self.state.action === "unsubscribe" && self.state.user_email !== "form"){
            newsletterService.unsubscribe({"user_email": self.state.user_email}).then(function (result) {
                self.setState({ ready:  true, result: result.data})
            });
        }
        else if(self.state.action === "resubscribe"){
            newsletterService.resubscribe({"user_email": self.state.user_email}).then(function (result) {
                self.setState({ ready:  true, result: result.data})
            });
        }
    }

    handleInputChange = (e) => {
        var emailObj = this.state.emailObj;
        emailObj.value = e.target.value;
        this.setState({emailObj: emailObj});
    };

    handleInputClicked = (e) => {
        if(e.target.parentNode.getElementsByClassName("field_required").length){
            var emailObj = this.state.emailObj;
            if(e.target.name === "email"){
                emailObj.error = "";
            }
            this.setState({emailObj: emailObj});
        }
    };

    handleUnsubscribe = (e) => {
        var emailObj = this.state.emailObj;
        if(!emailObj.value){
            emailObj.error = "Tis field is required!";
        }
        else if(!is_valid_email(emailObj.value)){
            emailObj.error = "Please enter a valid email!";
        }
        if(emailObj.error){
            this.setState({emailObj: emailObj});
        }
        else{
            window.location = "http://localhost:3000/newsletter/unsubscribe/" + emailObj.value;
        }
    };

    render() {
        const { action, ready, result, user_email, emailObj } = this.state;
        return (

            <div className="newsletter-page">
                <TitlePage title={action === "resubscribe" ? "Resubscribing" : "Unsubscribing"}/>
                <div className="newsletter-page-content">
                    <div className={
                        action === "resubscribe"?
                            "newsletter-page-content-resubscribe"
                        :
                            "newsletter-page-content-unsubscribe"
                    }>
                        {user_email !== "form" ?
                            <div className="result_container">
                            {ready ?
                                <div className={result.success ? "success" : "unsuccess"}>
                                    {result.message}
                                </div>
                            :
                                null
                            }
                            </div>
                        :
                            <div className="form-group">
                                <div className={"form_entry " + (emailObj.error ? "has_error" : "")}>
                                    <label>Enter your email:</label>
                                    <input className="form-control" type="text" name="email" value={emailObj.value}  style={{"borderColor": emailObj.error ? "red" : "#ced4da"}} onClick={this.handleInputClicked} onChange={this.handleInputChange}/>
                                    {emailObj.error && <div className="field_required">{emailObj.error}</div>}
                                </div>
                                <div className="action">
                                    <input className="btn btn-primary" type="button" value="Unsubscribe" onClick={this.handleUnsubscribe} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsletterReUnsubscribe;
