/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from 'moment';
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { menus, slides } from '@prisma/client';
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
            const menu: menus = req.body;
            const token = reqHeader.authorization;
            if (token) {
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    const menuId = menu.menu_id;

                    if (menu.menu_id === -1) {
                        menu.created_user = checkAuthor.user_id;
                        menu.updated_user = 0;
                        menu.created_date = now;
                    } else {
                        const entity: menus | null = await prisma.menus.findFirst(
                            {
                                where: {
                                    menu_id: menuId,
                                },
                            },
                        );

                        if (entity) {
                            menu.created_user = entity.created_user;
                            menu.created_date = entity.created_date;
                            menu.updated_user = checkAuthor.user_id;
                            menu.updated_date = now;
                        }
                    }

                    const entityUpsert: any = menu;
                    delete entityUpsert.menu_id;

                    await prisma.menus.upsert({
                        where: {
                            menu_id: menuId,
                        },
                        create: entityUpsert,
                        update: entityUpsert,
                    });

                    response.message = 'Lưu menu thành công';
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
