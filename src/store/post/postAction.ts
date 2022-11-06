import { POST_SET_OPTION_VALUE, PostThunkAction, PostSetOptionValueAction } from './postActionType';

export function PostSetOptionValue(option: string, value: string): PostSetOptionValueAction {
    return {
        type: POST_SET_OPTION_VALUE,
        option,
        value,
    };
}

export function postSetOptionValueThunk(option: string, value: string): PostThunkAction<Promise<void>> {
    return async (dispatch) => {
        dispatch(PostSetOptionValue(option, value));
    };
}
