/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from 'moment';
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { categories } from '@prisma/client';
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
    const now = moment.utc(moment().format( "YYYY-MM-DDTHH:mm:ss.SSS")).local().toDate();
    try {
        if (req.method === 'POST') {
            const reqHeader = req.headers;
            const category: categories = req.body;
            const token = reqHeader.authorization;
            if (token) {
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    if (category.category_id === -1) {
                        category.created_user = checkAuthor.user_id;
                        category.updated_user = 0;
                        category.created_date = now;
                    } else {
                        const entity: categories | null = await prisma.categories.findFirst(
                            {
                                where: {
                                    category_id: category.category_id,
                                },
                            },
                        );

                        if (entity) {
                            category.created_user = entity.created_user;
                            category.created_date = entity.created_date;
                            category.updated_user = checkAuthor.user_id;
                            category.updated_date = now;
                        }
                    }

                    const catId = category.category_id;
                    const categoryUpsert: any = category;
                    delete categoryUpsert.category_id;

                    await prisma.categories.upsert({
                        where: {
                            category_id: catId,
                        },
                        update: categoryUpsert,
                        create: categoryUpsert,
                    });

                    response.message = 'Lưu danh mục thành công';
                    response.statusCode = 200;
                }
            }
        }
        res.json(response);
    } catch (error) {
        res.json(response);
    }
}
