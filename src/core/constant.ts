/* eslint-disable linebreak-style */

const NOT_FOUND_DB_CODE = '-10001';
// const WEB_IMAGE_DIR = 'https://capxichkimtuanhung.com/images';
const WEB_IMAGE_DIR = 'http://localhost:3000/images';

const JWT_CONFIG = {
    secret: 'GpJQv1c4FW2mqDrs9yeA',
    expires: '10d',
    prefix: 'token',
    algorithms: ['HS256'],
};

const SALT_ROUND = 4;

export {
    NOT_FOUND_DB_CODE,
    WEB_IMAGE_DIR,
    JWT_CONFIG,
    SALT_ROUND,
};
