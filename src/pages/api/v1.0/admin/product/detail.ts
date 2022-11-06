/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { products, product_specifications, tags } from '@prisma/client';
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
                    const resultSetProduct: products | null = await prisma.products.findFirst({
                        where: {
                            product_id: reqBody.productId,
                        },
                    });
                    const resultSetSpecs: product_specifications[] = await prisma.product_specifications.findMany({
                        where: {
                            product_id: reqBody.productId,
                        },
                    });

                    const resultSetTags: tags[] = await prisma.tags.findMany({
                        where: {
                            product_id: reqBody.productId,
                        },
                    });

                    if (resultSetProduct) {
                        response.data = {
                            product: resultSetProduct,
                            specifications: resultSetSpecs,
                            tags: resultSetTags,
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
