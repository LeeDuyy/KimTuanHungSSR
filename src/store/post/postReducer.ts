import {
    PostAction, POST_SET_OPTION_VALUE,
} from './postActionType';
import { PostParamState } from './postType';

const inintialState: PostParamState = {
    isLoading: false,
    totalPage: 0,
    currentPage: 0,
    menuSlug: 0,
    options: {},
};

export const POST_NAMESPACE = 'post';

function postReducer(state = inintialState, action: PostAction) {
    switch (action.type) {
    case POST_SET_OPTION_VALUE:
        return {
            ...state,
            options: { ...state.options, page: 1, [action.option]: action.value },
        };
    default:
        return state;
    }
}

export default postReducer;
