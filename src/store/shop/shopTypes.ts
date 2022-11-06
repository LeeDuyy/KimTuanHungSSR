// application
import { ICategory } from '../../interfaces/category';
import { IFilter } from '../../interfaces/filter';
import { IFilterValues, IListOptions } from '../../interfaces/list';
import Product from '../../models/product';

export const SHOP_NAMESPACE = 'shop';

export interface ShopState {
    init: boolean;
    categorySlug: string | null;
    categoryId: number | 0;
    categoryIsLoading: boolean;
    category: ICategory | null;
    productsListIsLoading: boolean;
    productsList: Product[] | [];
    options: IListOptions;
    listFiltersName: IFilter[] | [];
    filters: IFilterValues;
}
