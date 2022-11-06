// application
import { useAppAction, useAppSelector } from '../hooks';
import initConfig from './configAction';

export const useConfig = () => useAppSelector((state) => state.config.configState);

export const useInitConfig = () => useAppAction(initConfig);
