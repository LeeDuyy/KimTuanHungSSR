// application
// import { IProduct } from '../../interfaces/product';
import Products from '../../models/product';

export interface QuickviewState {
    open: boolean;
    product: Products | null;
    // product: IProduct | null;
}
