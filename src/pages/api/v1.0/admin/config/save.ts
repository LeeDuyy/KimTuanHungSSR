/* eslint-disable @typescript-eslint/no-unused-vars */
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { categories, config, users } from '@prisma/client';
import initMiddleware from '../../../../../../lib/init-middleware';
import prisma from '../../../../../../lib/prisma';
import Response from '../../../../../models/response';
import authentication from '../../../../../core/utils';

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    }),
);

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);
    const response: Response = new Response();
    try {
        if (req.method === 'POST') {
            const reqHeader = req.headers;
            const config: config = req.body;
            const token = reqHeader.authorization;
            if (token) {
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    const configId = config.id;
                    const entity: any = config;
                    delete entity.id;

                    await prisma.config.upsert({
                        where: {
                            id: configId,
                        },
                        create: entity,
                        update: entity,
                    });

                    response.message = 'Lưu cấu hình thành công';
                    response.statusCode = 200;
                }
            }
        }
        res.json(response);
    } catch (error) {
        res.json(response);
    }
}
