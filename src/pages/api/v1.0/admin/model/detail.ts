/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { product_images, product_models } from '@prisma/client';
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
                    const resultSetModel: product_models | null = await prisma.product_models.findFirst({
                        where: {
                            model_id: reqBody.modelId,
                        },
                    });
                    const resultSetImage: product_images[] = await prisma.product_images.findMany({
                        where: {
                            model_id: reqBody.modelId,
                        },
                    });

                    if (resultSetModel && resultSetImage.length > 0) {
                        response.data = {
                            modelDetail: resultSetModel,
                            modelImage: resultSetImage,
                        };
                        response.message = 'OK';
                        response.statusCode = 200;
                    }
                }
            }
        }
        res.json(response);
    } catch (error) {
        res.json(response);
    }
}
