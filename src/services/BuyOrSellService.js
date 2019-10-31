import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
export default class BuyOrSellService{
    wanttobuy(propertyDetails) {
        const url = `${process.env.REACT_APP_API_URL}/${reactLocalStorage.get('current_langue')}/api/contact/buy`;
        return axios.post(url, propertyDetails);
    }
    wanttosell(sellerDetails) {
        const url = `${process.env.REACT_APP_API_URL}/${reactLocalStorage.get('current_langue')}/api/contact/sell`;
        return axios.post(url, sellerDetails);
    }
}