import axios from 'axios';
import store from 'store';
export default class BuyOrSellService{
    wanttobuy(propertyDetails) {
        const url = `${process.env.REACT_APP_API_URL}/${store.get('current_langue')}/api/contact/buy`;
        return axios.post(url, propertyDetails);
    }
    wanttorent(propertyDetails) {
        const url = `${process.env.REACT_APP_API_URL}/${store.get('current_langue')}/api/contact/rent`;
        return axios.post(url, propertyDetails);
    }
    wanttosell(sellerDetails) {
        const url = `${process.env.REACT_APP_API_URL}/${store.get('current_langue')}/api/contact/sell`;
        return axios.post(url, sellerDetails);
    }
}