import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
export default class GlobalParamsService{

    async getGlobalParams() {
        const url = `${process.env.REACT_APP_API_URL}/${reactLocalStorage.get('current_langue')}/api/global_params/`;
        return await axios.get(url).then(async (response) => response.data);
    }
    async getHeaderParams() {
        const url = `${process.env.REACT_APP_API_URL}/${reactLocalStorage.get('current_langue')}/api/header_params/`;
        return await axios.get(url).then(async (response) => response.data);
    }
}
