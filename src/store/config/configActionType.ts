import { ConfigParamState } from './configType';

export const INIT_CONFIG = 'INIT_CONFIG';

export interface InitConfigAction {
    type: typeof INIT_CONFIG;
    configParamState: ConfigParamState;
}

export type ConfigAction = InitConfigAction;
