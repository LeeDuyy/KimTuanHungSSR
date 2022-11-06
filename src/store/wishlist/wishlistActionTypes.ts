// application
import { AppAction } from '../types';
import Products from '../../models/product';

export const WISHLIST_ADD_ITEM = 'WISHLIST_ADD_ITEM';
export const WISHLIST_REMOVE_ITEM = 'WISHLIST_REMOVE_ITEM';

export interface WishlistAddItemAction {
    type: typeof WISHLIST_ADD_ITEM;
    product: Products;
}

export interface WishlistRemoveItemAction {
    type: typeof WISHLIST_REMOVE_ITEM;
    productId: number;
}

export type WishlistAction =
    WishlistAddItemAction |
    WishlistRemoveItemAction;

export type WishlistThunkAction<T = void> = AppAction<WishlistAction, T>;
