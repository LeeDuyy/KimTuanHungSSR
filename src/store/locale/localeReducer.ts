// application
import { LOCALE_CHANGE, LocaleAction } from './localeActionTypes';
import { LocaleState } from './localeTypes';
import { withClientState } from '../client';

const initialState: LocaleState = {
    current: 'vi',
};

export const LOCALE_NAMESPACE = 'locale';

function localeBaseReducer(state = initialState, action: LocaleAction): LocaleState {
    if (action.type === LOCALE_CHANGE) {
        console.log('vao day');
        return {
            ...state,
            current: action.locale,
        };
    }
    return state;
}

const localeReducer = withClientState(localeBaseReducer, LOCALE_NAMESPACE);

export default localeReducer;
