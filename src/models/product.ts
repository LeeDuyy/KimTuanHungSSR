/* eslint-disable camelcase */
interface Image {
    image_name: string;
}

interface Tags {
    tag_name: string;
}

interface SpecsSub{
    group_name: string;
    attribute: string;
    value: string;
}

export interface Specification {
    group_name: string,
    subs: SpecsSub[],
}

interface Categories {
    category_id: number;
    category_name: string;
    slug: string;
    parent_id: number;
    level_id: number;
}

interface Products {
    category_id: number;
    product_code: string;
    product_id: number;
    product_name: string;
    model_id: number;
    sku: string;
    slug: string;
    price: number;
    discount: number;
    unit: string;
    price_aft_discount: number;
    brand: string;
    short_descriptions: string;
    descriptions: string;
    active: boolean;
    stock: number;
    stock_status: string;
    stock_status_id: number;
    is_bestseller: boolean;
    is_hot: boolean;
    is_new: boolean;
    is_saleoff: boolean;
    images: Image[];
    tags: Tags[];
    thumbnail: string;
    rating_star: number;
    total_rated: number;
    total_page: number;
    specifications: Specification[];
    categories: Categories[];
}

export default Products;
