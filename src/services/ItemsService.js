import axios from 'axios';
import store from 'store';
export default class ItemsService{

    getItems(params) {
        const url = `${process.env.REACT_APP_API_URL}/${store.get("current_langue")}/api/items/`;
        return axios.get(url, { params: params }).then(response => response.data);
    }
    getItemsByURL(link, params){
        const url = `${process.env.REACT_APP_API_URL}/${store.get("current_langue")}${link}`;
        return axios.get(url, { params: params }).then(response => response.data);
    }
    getItemDetails(pk) {
        const url = `${process.env.REACT_APP_API_URL}/${store.get("current_langue")}/api/items/item/${pk}`;
        return axios.get(url).then(response => response);
    }
}