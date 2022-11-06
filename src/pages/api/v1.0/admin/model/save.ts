/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
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
    const now = new Date();
    try {
        if (req.method === 'POST') {
            const reqHeader = req.headers;
            const model: product_models = req.body;
            const token = reqHeader.authorization;
            if (token) {
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    const modelId = model.model_id;
                    const modelUpsert: any = model;
                    const productImgList: product_images[] = modelUpsert.images;
                    delete modelUpsert.images;
                    delete modelUpsert.model_id;
                    const modelCrud = await prisma.product_models.upsert({
                        where: {
                            model_id: modelId,
                        },
                        update: modelUpsert,
                        create: modelUpsert,
                    });

                    if (productImgList.length > 0) {
                        productImgList.forEach((row) => {
                            row.model_id = modelCrud.model_id;
                        });

                        await prisma.product_images.deleteMany({
                            where: {
                                model_id: modelCrud.model_id,
                            },
                        });

                        await prisma.product_images.createMany({
                            data: productImgList,
                        });
                    }

                    response.message = 'Lưu Model thành công';
                    response.statusCode = 200;
                }
            }
        }
        res.json(response);
    } catch (error) {
        res.json(response);
    }
}
