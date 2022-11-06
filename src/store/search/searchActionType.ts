import { ISearchParam } from '../../interfaces/searchParam';

export const POST_SEARCH = 'POST_SEARCH';
export const PRODUCT_SEARCH = 'PRODUCT_SEARCH';

export interface PostSearchAction {
    type: typeof POST_SEARCH;
    searchParam: ISearchParam;
}

export interface ProductSearchAction {
    type: typeof PRODUCT_SEARCH;
    searchParam: ISearchParam;
}

export type SearchAction = PostSearchAction | ProductSearchAction;
