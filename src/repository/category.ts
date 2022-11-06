import axios from 'axios';
import { API_LINKS, HOST_API_SV } from '../environment';
import Category from '../models/category';

const GetCategorySideBar = async () => {
    let response: any[] = [];
    const API = HOST_API_SV + API_LINKS.getCategorySideBarApi;
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

const GetCategoryMobileSideBar = async () => {
    let response: Category[] = [];
    try {
        const API = HOST_API_SV + API_LINKS.getCategoryMobleSideBarApi;
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
    } catch (error) {
        return response;
    }
};

const GetCategoryInfo = async (slug: string) => {
    let response: Category | null = null;
    const API = HOST_API_SV + API_LINKS.getCategoryInfoApi;
    const headers = {
        'Content-Type': 'application/json',
    };
    const payload = {
        slug,
    };

    const res = await axios.post(API, payload, { headers });
    const { data } = res;

    if (data) {
        response = data;
    }

    return response;
};

export {
    GetCategorySideBar,
    GetCategoryMobileSideBar,
    GetCategoryInfo,
};
