import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from './constant';

function authentication(token: string) {
    let result: any = null;
    try {
        if (token) {
            const checkToken: any = jwt.verify(
                token.replace(JWT_CONFIG.prefix, '').trim(),
                JWT_CONFIG.secret,
                (err: any, decode: any) => {
                    if (decode) {
                        return decode;
                    }
                    return null;
                },
            );

            if (checkToken) {
                result = checkToken;
            }
        }
        return result;
    } catch (error) {
        return result;
    }
}

export default authentication;
