import { useCallback } from 'react';
import { IListOptions } from '../../interfaces/list';
import { useAppAction, useAppSelector } from '../hooks';
import { postSetOptionValueThunk } from './postAction';
import { POST_NAMESPACE } from './postReducer';
import { PostParamState } from './postType';

export function usePostSelector<T extends(state: PostParamState) => any>(selector: T): ReturnType<T> {
    return useAppSelector((state) => selector(state[POST_NAMESPACE]));
}

export const usePost = () => usePostSelector((state) => state);
export const usePostOptions = () => usePostSelector((state) => state.options);
export const usePostSetOptionValueThunk = () => useAppAction(postSetOptionValueThunk);

export function useSetPostOption(
    option: keyof IListOptions,
    filterValueFn: (data: any) => any,
) {
    const callback = useCallback(filterValueFn, []);
    const postSetOptionValue = usePostSetOptionValueThunk();

    return useCallback((data) => {
        postSetOptionValue(option, callback(data)).then();
    }, [postSetOptionValue, option, callback]);
}
