/* eslint-disable camelcase */
interface Category {
    categoryId?: number;
    categoryCode?: string;
    categoryName?: string;
    label?: string;
    category_id: number;
    category_code: string;
    category_name: string;
    image: string;
    slug: string;
    parentId?: number;
    parent_id?: number;
    orderIndex?: number;
    active: boolean;
    popular: boolean;
    subs?: this[];
    parents?: this[];
    sibblings?: this[];
    children?: this[];
}

export default Category;
