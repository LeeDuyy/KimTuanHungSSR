import axios from 'axios';
import { API_LINKS, HOST_API_SV } from '../environment';

class Slider {
    main: any[] = [];
    banner: any[] = [];
    partner: any[] = [];
}

const GetSlide = async () => {
    let response: Slider = new Slider();
    const API = HOST_API_SV + API_LINKS.getSlide;
    const headers = {
        'Content-Type': 'application/json',
    };
    const payload = {};

    const res = await axios.post(API, payload, { headers });
    const { data } = res;

    if (data != null) {
        response = data;
    }

    return response;
};

export default GetSlide;
