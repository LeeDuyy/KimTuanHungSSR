/* eslint-disable @typescript-eslint/no-unused-vars */
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { categories, users } from '@prisma/client';
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
            const reqBody = req.body;
            const token = reqHeader.authorization;
            if (token) {
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    await prisma.product_models.delete({
                        where: {
                            model_id: reqBody.modelId,
                        },
                    });

                    response.message = 'Xóa Model thành công';
                    response.statusCode = 200;
                }
            }
        }
        res.json(response);
    } catch (error) {
        console.log(error);
        res.json(response);
    }
}
