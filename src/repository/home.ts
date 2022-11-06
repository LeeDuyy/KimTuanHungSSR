import axios from 'axios';
import { API_LINKS, HOST_API_SV } from '../environment';
import HomeBlock from '../models/home';
import Post from '../models/post';

const GetHomeBlock = async () => {
    const response: HomeBlock = new HomeBlock();
    const API = HOST_API_SV + API_LINKS.getHomeBlock;
    const headers = {
        'Content-Type': 'application/json',
    };
    const payload = {};

    const res = await axios.post(API, payload, { headers });
    const { data } = res;
    if (data != null && data !== '') {
        if (response) {
            response.bestsellers_products = data.bestsellers_products;
            response.category_popular = data.category_popular;
            response.featured_products = data.featured_products;
        }
    }

    return response;
};

const GetPostHome = async () => {
    let response: Post[] = [];
    const API = HOST_API_SV + API_LINKS.getPostHome;
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

export { GetHomeBlock, GetPostHome };
