/* eslint-disable camelcase */
import { ICustomFields } from './custom-fields';

export interface IBaseCategory {
    type: string;
    id: number;
    slug: string;
    name: string;
    image?: string;
    items?: number;
    parent?: this;
    children?: this[];
    sibblings?: this[];
    category_id?: number;
    category_name?: string;
    parent_id?: string;
    customFields: ICustomFields;
}

export interface IShopCategory extends IBaseCategory {
    type: 'shop';
}

export interface IBlogCategory extends IBaseCategory {
    type: 'blog';
}

export type ICategory = IShopCategory | IBlogCategory;
