import axios from 'axios';
import store from 'store';
export default class NewsletterService{

    subscribe(subscriptionDetails) {
        const url = `${process.env.REACT_APP_API_URL}/${store.get("current_langue")}/api/newsletter/subscribe`;
        return axios.post(url, subscriptionDetails);
    }

    unsubscribe(user_data) {
        const url = `${process.env.REACT_APP_API_URL}/${store.get("current_langue")}/api/newsletter/unsubscribe`;
        return axios.get(url, {params: user_data}).then(response => response.data);
    }

    resubscribe(user_data) {
        const url = `${process.env.REACT_APP_API_URL}/${store.get("current_langue")}/api/newsletter/resubscribe`;
        return axios.get(url, {params: user_data}).then(response => response.data);
    }
}