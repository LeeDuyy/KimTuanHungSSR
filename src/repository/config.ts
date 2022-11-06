import axios from 'axios';
import { API_LINKS, HOST_API_SV } from '../environment';
import { IConfigState } from '../store/config/configType';

const GetConfig = async () => {
    try {
        let response: IConfigState | null = null;
        const API = HOST_API_SV + API_LINKS.getConfig;
        const headers = {
            'Content-Type': 'application/json',
        };
        const payload = {};

        const res = await axios.post(API, payload, { headers });
        const { data } = res;

        if (data != null) {
            response = data;
        }
        return response;
    } catch (error) {
        return null;
    }
};

export default GetConfig;
