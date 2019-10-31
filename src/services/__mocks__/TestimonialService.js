import axios from 'axios';

const listTestimonials = [
    {
        'city': "Montreal",
        'city_val': "montreal",
        'createdAt': "21 October, 2019",
        'first_name': "Firstname",
        'initials_bg_color': "#078DD7",
        'initials_color': "#F87228",
        'last_name': "Lastname",
        'pk': 1,
        'testimonial': "Testimonial content"
    }
]


export default class TestimonialService{
    async getTestimonials() {
        return await new Promise(resolve => {
            resolve(listTestimonials);
        });
    }
    async getTestimonialsByURL(link) {
        return await new Promise(resolve => {
            resolve(listTestimonials);
        });
    }

    create_testimonial(testimonial) {
        const url = `${process.env.REACT_APP_API_URL}/api/testimonials/create`;
        return axios.post(url, testimonial);
    }
}