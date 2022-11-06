/* eslint-disable @typescript-eslint/no-unused-vars */
import Cors from 'cors';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { menus, pages, slides } from '@prisma/client';
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
            const page: pages = req.body;
            const token = reqHeader.authorization;
            if (token) {
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    const pageId = page.page_id;

                    if (pageId === -1) {
                        page.created_user = checkAuthor.user_id;
                        page.updated_user = 0;
                        page.created_date = now;
                    } else {
                        const entity: pages | null = await prisma.pages.findFirst(
                            {
                                where: {
                                    page_id: pageId,
                                },
                            },
                        );

                        if (entity) {
                            page.created_user = entity.created_user;
                            page.created_date = entity.created_date;
                            page.updated_user = checkAuthor.user_id;
                            page.updated_date = now;
                        }
                    }

                    const entityUpsert: any = page;
                    delete entityUpsert.page_id;

                    await prisma.pages.upsert({
                        where: {
                            page_id: pageId,
                        },
                        create: entityUpsert,
                        update: entityUpsert,
                    });

                    response.message = 'Lưu page thành công';
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
