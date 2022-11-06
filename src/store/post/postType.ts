import { IListOptions } from '../../interfaces/list';

export interface PostParamState {
    isLoading: boolean,
    totalPage: number,
    currentPage: number,
    menuSlug: number,
    options: IListOptions
}
