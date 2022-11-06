/* eslint-disable camelcase */

import Category from './category';
import Product from './product';

// interface IHomeBlock {
//     bestsellers_products: Product[];
//     category_popular: Category[];
//     featured_products: Product[];
// }

class HomeBlock {
    bestsellers_products: Product[] = [];
    category_popular: Category[] = [];
    featured_products: Product[] = [];
}

export default HomeBlock;
