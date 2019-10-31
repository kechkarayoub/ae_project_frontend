import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
export default class LinksService{

    getLinks() {
        const url = `${process.env.REACT_APP_API_URL}/${reactLocalStorage.get("current_langue")}/api/usefullinks/`;
        return axios.get(url).then(response => response.data);
    }
}