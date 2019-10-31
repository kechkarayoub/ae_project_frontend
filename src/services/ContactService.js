import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
export default class ContactService{

    contact(contacterDetails) {
        const url = `${process.env.REACT_APP_API_URL}/${reactLocalStorage.get('current_langue')}/api/contact/`;
        return axios.post(url, contacterDetails);
    }
}