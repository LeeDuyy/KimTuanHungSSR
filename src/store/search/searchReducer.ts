// application
import {
    POST_SEARCH, PRODUCT_SEARCH, SearchAction,
} from './searchActionType';
import { SearchParamState } from './searchType';

const initialState: SearchParamState = {
    searchParam: {
        categoryId: -1,
        menuSlug: '',
        keyword: '',
    },
};

export const SEARCH_NAMESPACE = 'search';

function searchReducer(state = initialState, action: SearchAction): SearchParamState {
    switch (action.type) {
    case POST_SEARCH:
        return {
            ...state,
            searchParam: JSON.parse(JSON.stringify(action.searchParam)),
        };
    case PRODUCT_SEARCH:
        return {
            ...state,
            searchParam: JSON.parse(JSON.stringify(action.searchParam)),
        };
    default:
        return state;
    }
}

export default searchReducer;
