/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { IFilterValues, IListOptions } from '../interfaces/list';
import { HOST_API_SV, API_LINKS } from '../environment';
import Product from '../models/product';
// const https = require('https');

const GetProductList = async (options: IListOptions, filters: IFilterValues) => {
    let response: Product[] = [];
    try {
        const API = HOST_API_SV + API_LINKS.getProductListApi;
        const headers = {
            'Content-Type': 'application/json',
        };

        const payload = {
            Category_id: options.categoryId,
            SortBy: options.sort,
            KeyWord: options.keyword,
            Page: options.page,
            Limit: options.limit,
        };
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

const GetProductInfo = async (slug: string) => {
    let response: Product | null = null;
    try {
        const API = HOST_API_SV + API_LINKS.getProductBySlugApi;
        const headers = {
            'Content-Type': 'application/json',
        };

        const payload = {
            slug,
        };
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

const GetProductRelated = async (slug: string) => {
    let response: Product[] = [];
    try {
        const API = HOST_API_SV + API_LINKS.getProductRelatedApi;
        const headers = {
            'Content-Type': 'application/json',
        };

        const payload = {
            slug,
        };

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

export { GetProductList, GetProductInfo, GetProductRelated };
