import axios from 'axios';
import store from 'store';
export default class FundingService{

    getFundings() {
        const url = `${process.env.REACT_APP_API_URL}/${store.get("current_langue")}/api/funding/`;
        return axios.get(url).then(response => response.data);
    }
    send_funding_email(data) {
        const url = `${process.env.REACT_APP_API_URL}/${store.get('current_langue')}/api/funding/send_funding_email`;
        return axios.post(url, data);
    }
}