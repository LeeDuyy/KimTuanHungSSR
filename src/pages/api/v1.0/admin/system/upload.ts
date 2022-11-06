/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Cors from 'cors';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import initMiddleware from '../../../../../../lib/init-middleware';
import Response from '../../../../../models/response';
import authentication from '../../../../../core/utils';

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

const saveFile = async (file: any) => {
    const now = new Date();
    const imagePath = `./public/images/${now.getMonth() + 1}-${now.getFullYear()}`;
    if (!fs.existsSync(imagePath)) {
        fs.mkdirSync(imagePath);
    }
    console.log(file.originalFilename);
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`${imagePath}/${file.originalFilename}`, data);
    fs.unlinkSync(file.filepath);
};

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);
    const response: Response = new Response();
    try {
        if (req.method === 'POST') {
            const reqHeader = req.headers;
            const token = reqHeader.authorization;
            if (token) {
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    const now = new Date();
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
                        file.path = `${uploadDir}/${file.name}`;
                    });

                    form.parse(req, async (err: any, fields: any, files: any) => {});
                }
            }
        }
        response.message = 'OK';
        response.statusCode = 200;
        res.json(response);
    } catch (error) {
        console.log(error);
        
        res.json(response);
    }
}
