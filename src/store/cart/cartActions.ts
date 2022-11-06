// third-party
import { toast } from 'react-toastify';

// application
import { CartItemOption } from './cartTypes';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_UPDATE_QUANTITIES,
    CartAddItemAction,
    CartItemQuantity,
    CartRemoveItemAction,
    CartThunkAction,
    CartUpdateQuantitiesAction,
} from './cartActionTypes';
import Products from '../../models/product';

export function cartAddItemSuccess(
    product: Products,
    options: CartItemOption[] = [],
    quantity = 1,
): CartAddItemAction {
    toast.success(`Sản phẩm "${product.product_name}" đã được vào giỏ hàng!`, { theme: 'colored' });

    return {
        type: CART_ADD_ITEM,
        product,
        options,
        quantity,
    };
}

export function cartRemoveItemSuccess(itemId: number): CartRemoveItemAction {
    return {
        type: CART_REMOVE_ITEM,
        itemId,
    };
}

export function cartUpdateQuantitiesSuccess(quantities: CartItemQuantity[]): CartUpdateQuantitiesAction {
    return {
        type: CART_UPDATE_QUANTITIES,
        quantities,
    };
}

export function cartAddItem(
    product: Products,
    options: CartItemOption[] = [],
    quantity = 1,
): CartThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartAddItemSuccess(product, options, quantity));
                resolve();
            }, 500);
        })
    );
}

export function cartRemoveItem(itemId: number): CartThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartRemoveItemSuccess(itemId));
                resolve();
            }, 500);
        })
    );
}

export function cartUpdateQuantities(quantities: CartItemQuantity[]): CartThunkAction<Promise<void>> {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartUpdateQuantitiesSuccess(quantities));
                resolve();
            }, 500);
        })
    );
}
