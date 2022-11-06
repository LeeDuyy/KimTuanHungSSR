import axios from 'axios';
import { API_LINKS, HOST_API_SV } from '../environment';
import Menu from '../models/menu';
import Page from '../models/page';

const GetMenuTop = async () => {
    let response: any[] = [];
    try {
        const API = HOST_API_SV + API_LINKS.getMenuTop;
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

const GetMenuMain = async () => {
    let response: any[] = [];
    try {
        const API = HOST_API_SV + API_LINKS.getMenuMain;
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

const GetMenuFooter = async () => {
    let response: any[] = [];
    try {
        const API = HOST_API_SV + API_LINKS.getMenuFooter;
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

const GetMenuMobile = async () => {
    let response: any[] = [];
    try {
        const API = HOST_API_SV + API_LINKS.getMenuMobile;
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

class MenuDetail {
    templateId: number = -1;
    isBlog: boolean = false;
    menu: Menu = {
        slug: '',
        title: '',
        blog: false,
    };

    page: Page = {
        title: '',
        background_image: '',
        descriptions: '',
    };
}

const GetMenuDetail = async (slug: string) => {
    const response: MenuDetail = new MenuDetail();
    try {
        const API = HOST_API_SV + API_LINKS.getMenuDetail;
        const headers = {
            'Content-Type': 'application/json',
        };
        const payload = {
            slug,
        };

        const res = await axios.post(API, payload, { headers });
        const { data } = res;

        if (data != null) {
            response.templateId = data.template;
            response.isBlog = data.isBlog;
            response.menu = data.menu;
            response.page = data.page;
        }
        return response;
    } catch (error) {
        return response;
    }
};

export {
    GetMenuTop,
    GetMenuMain,
    GetMenuFooter,
    GetMenuDetail,
    GetMenuMobile,
};
