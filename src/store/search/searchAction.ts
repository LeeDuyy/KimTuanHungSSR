import {
    POST_SEARCH,
    PRODUCT_SEARCH,
    PostSearchAction,
    ProductSearchAction,
} from './searchActionType';
import { ISearchParam } from '../../interfaces/searchParam';

export function postSearch(searchParam: ISearchParam): PostSearchAction {
    return {
        type: POST_SEARCH,
        searchParam,
    };
}

export function productSearch(searchParam: ISearchParam): ProductSearchAction {
    return {
        type: PRODUCT_SEARCH,
        searchParam,
    };
}
