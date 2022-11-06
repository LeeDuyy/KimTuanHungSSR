import { AppAction } from '../types';

export const POST_SET_OPTION_VALUE = 'SHOP_SET_OPTION_VALUE';

export interface PostSetOptionValueAction {
    type: typeof POST_SET_OPTION_VALUE;
    option: string;
    value: string;
}

export type PostAction = PostSetOptionValueAction;

export type PostThunkAction<T = void> = AppAction<PostAction, T>;
