// application
import { INIT_CONFIG, ConfigAction } from './configActionType';
import { ConfigParamState } from './configType';

const initialState: ConfigParamState = {
    configState: {
        company_name: '',
        short_name: '',
        tax_code: '',
        tax_address: '',
        phone_number: '',
        hotline: '',
        email: '',
        facebook: '',
        zalo: '',
        clock: '',
        logo: '',
        logo_small: '',
        youtube: '',
        instagram: '',
        theme_color: '',
    },
};

export const CONFIG_NAMESPACE = 'config';

function configReducer(state = initialState, action: ConfigAction): ConfigParamState {
    switch (action.type) {
    case INIT_CONFIG:
        return {
            configState: action.configParamState.configState,
        };
    default:
        return state;
    }
}

export default configReducer;
