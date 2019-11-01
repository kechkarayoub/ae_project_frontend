import axios from 'axios';
import store from 'store';
export default class ContactService{

    contact(contacterDetails) {
        const url = `${process.env.REACT_APP_API_URL}/${store.get('current_langue')}/api/contact/`;
        return axios.post(url, contacterDetails);
    }
}