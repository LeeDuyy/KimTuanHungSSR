/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Cors from 'cors';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import initMiddleware from '../../../../../../lib/init-middleware';
import Response from '../../../../../models/response';
import authentication from '../../../../../core/utils';
import { WEB_IMAGE_DIR } from '../../../../../core/constant';

const formidable = require('formidable-serverless');

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    }),
);

export const config = {
    api: {
        bodyParser: false,
    },
};

function removeAccents(str: string) {
    const AccentsMap = [
        'aàảãáạăằẳẵắặâầẩẫấậ',
        'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
        'dđ', 'DĐ',
        'eèẻẽéẹêềểễếệ',
        'EÈẺẼÉẸÊỀỂỄẾỆ',
        'iìỉĩíị',
        'IÌỈĨÍỊ',
        'oòỏõóọôồổỗốộơờởỡớợ',
        'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
        'uùủũúụưừửữứự',
        'UÙỦŨÚỤƯỪỬỮỨỰ',
        'yỳỷỹýỵ',
        'YỲỶỸÝỴ',
    ];
    for (let i = 0; i < AccentsMap.length; i++) {
        const re = new RegExp(`[${AccentsMap[i].substr(1)}]`, 'g');
        const char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return String(str).toLowerCase().replace(/ /g, '-').trim();
}

function renameImage(fileName: string) {
    const fileNameFormat = removeAccents(fileName);
    const idx = fileName.indexOf('.');
    const extension = fileName.slice(idx);
    const randomNumber = Math.floor(Math.random() * 1E16);
    return `${fileNameFormat.replace(extension, '')}_${randomNumber}${extension}`;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);
    const response: any = { url: '' };
    try {
        if (req.method === 'POST') {
            const reqHeader = req.headers;
            const token = reqHeader.authorization;
            if (token) {
                const now = new Date();
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    const uploadDir = `./public/images/${now.getMonth() + 1}-${now.getFullYear()}`;
                    if (!fs.existsSync(uploadDir)) {
                        fs.mkdirSync(uploadDir);
                    }
                    const form = formidable({
                        multiples: true,
                        uploadDir,
                    });

                    form.keepExtensions = true;
                    form.keepFileName = true;

                    form.on('fileBegin', (name: any, file: any) => {
                        const fileName = renameImage(file.name);
                        file.path = `${uploadDir}/${fileName}`;
                        response.url = `${WEB_IMAGE_DIR}/${now.getMonth() + 1}-${now.getFullYear()}/${fileName}`;
                        res.json(response);
                    });
                    form.parse(req, (err: any, fields: any, files: any) => { });
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.json(response);
    }
}
