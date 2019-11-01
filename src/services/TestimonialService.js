import axios from 'axios';
import store from 'store';
export default class TestimonialService{

    getTestimonials() {
        const url = `${process.env.REACT_APP_API_URL}/${store.get("current_langue")}/api/testimonials/`;
        return axios.get(url).then(response => response.data);
    }
    getTestimonialsByURL(link) {
        const url = `${process.env.REACT_APP_API_URL}/${store.get("current_langue")}${link}`;
        return axios.get(url).then(response => response.data);
    }

    create_testimonial(testimonial) {
        const url = `${process.env.REACT_APP_API_URL}/${store.get("current_langue")}/api/testimonials/create`;
        return axios.post(url, testimonial);
    }
}