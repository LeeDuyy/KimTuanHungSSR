// third-party
import queryString from 'query-string';
import { GetServerSidePropsContext } from 'next';
import { Store } from 'redux';
import { IFilter } from '../../interfaces/filter';
// application
import { AppDispatch } from '../types';
import { IFilterValues, IListOptions } from '../../interfaces/list';
import { RootState } from '../root/rootTypes';
import { shopInitThunk } from './shopActions';
import Category from '../../models/category';

export function parseQueryOptions(query: string) {
    const queryObject = queryString.parse(query);
    const optionValues: IListOptions = {};

    if (typeof queryObject.page === 'string') {
        optionValues.page = parseFloat(queryObject.page);
    }
    if (typeof queryObject.limit === 'string') {
        optionValues.limit = parseFloat(queryObject.limit);
    }
    if (typeof queryObject.sort === 'number') {
        optionValues.sort = queryObject.sort;
    }

    return optionValues;
}

export function parseQueryFilters(query: string) {
    const queryObject = queryString.parse(query);
    const filterValues: IFilterValues = {};

    Object.keys(queryObject).forEach((param) => {
        const value = queryObject[param];
        const mr = param.match(/^filter_([-_A-Za-z0-9]+)$/);

        if (!mr || typeof value !== 'string') {
            return;
        }

        const filterSlug = mr[1];

        filterValues[filterSlug] = value;
    });

    return filterValues;
}

export function buildQuery(options: IListOptions, filters: IFilterValues) {
    const params: { [key: string]: any } = {};

    if (options.page !== 1) {
        params.page = options.page;
    }

    if (options.limit !== 12) {
        params.limit = options.limit;
    }

    if (options.sort !== -1) {
        params.sort = options.sort;
    }

    Object.keys(filters).filter((x) => x !== 'category' && !!filters[x]).forEach((filterSlug) => {
        params[`filter_${filterSlug}`] = filters[filterSlug];
    });

    return queryString.stringify(params, { encode: false });
}

export default async function getShopPageData(
    store: Store<RootState>,
    context: GetServerSidePropsContext,
    slug?: string,
    categoryInfo?: Category,
): Promise<void> {
    const categorySlug = slug || (typeof context.params?.slug === 'string' ? context.params.slug : null);
    if (typeof context.req.url === 'string' && categoryInfo !== null) {
        const query = queryString.stringify(queryString.parseUrl(context.req.url).query);
        const options = parseQueryOptions(query);
        const filters = parseQueryFilters(query);
        const dispatch = store.dispatch as AppDispatch;
        options.categoryId = categoryInfo?.category_id;

        // Options
        if (options.keyword === undefined) options.keyword = '';
        if (options.sort === undefined) options.sort = -1;
        if (options.page === undefined) options.page = 1;
        if (options.limit === undefined) options.limit = 18;

        // Filters
        const listCats: Category[] = [];
        if (categoryInfo !== undefined) listCats.push(categoryInfo);
        const filterName: IFilter = {
            type: 'category',
            name: 'Danh Mục',
            value: slug,
            slug,
            items: listCats,
        };
        const listFiltersName: IFilter[] = [
            filterName,
        ];

        await dispatch(shopInitThunk(categorySlug, options, filters, listFiltersName));
    }
}
