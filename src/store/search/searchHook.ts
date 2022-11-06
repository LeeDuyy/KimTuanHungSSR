// application
import { postSearch, productSearch } from './searchAction';
import { useAppAction, useAppSelector } from '../hooks';

export const useSearch = () => useAppSelector((state) => state.search);

export const useSearchPost = () => useAppAction(postSearch);

export const useSearchProduct = () => useAppAction(productSearch);
