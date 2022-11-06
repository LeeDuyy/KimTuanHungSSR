import { AppReducerStateType } from '../types';
import cartReducer from '../cart/cartReducer';
import compareReducer from '../compare/compareReducer';
import currencyReducer from '../currency/currencyReducer';
import localeReducer from '../locale/localeReducer';
import mobileMenuReducer from '../mobile-menu/mobileMenuReducer';
import quickviewReducer from '../quickview/quickviewReducer';
import wishlistReducer from '../wishlist/wishlistReducer';
import shopReducer from '../shop/shopReducer';
import searchReducer from '../search/searchReducer';
import configReducer from '../config/configReducer';
import postReducer from '../post/postReducer';

export interface RootState {
    version: number;
    cart: AppReducerStateType<typeof cartReducer>;
    wishlist: AppReducerStateType<typeof wishlistReducer>;
    compare: AppReducerStateType<typeof compareReducer>;
    mobileMenu: AppReducerStateType<typeof mobileMenuReducer>;
    quickview: AppReducerStateType<typeof quickviewReducer>;
    locale: AppReducerStateType<typeof localeReducer>;
    currency: AppReducerStateType<typeof currencyReducer>;
    shop: AppReducerStateType<typeof shopReducer>;
    search: AppReducerStateType<typeof searchReducer>;
    config: AppReducerStateType<typeof configReducer>;
    post: AppReducerStateType<typeof postReducer>;
}
