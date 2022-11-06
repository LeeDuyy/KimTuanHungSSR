/* eslint-disable @typescript-eslint/no-unused-vars */
import { INIT_CONFIG, InitConfigAction } from './configActionType';
import { ConfigParamState, IConfigState } from './configType';

export default function initConfig(configState: IConfigState | null): InitConfigAction {
    const configParamState: ConfigParamState = {
        configState,
    };
    return {
        type: INIT_CONFIG,
        configParamState,
    };
}
