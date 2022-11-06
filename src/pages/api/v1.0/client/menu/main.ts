/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { menus } from '@prisma/client';
import initMiddleware from '../../../../../../lib/init-middleware';
import prisma from '../../../../../../lib/prisma';

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    }),
);

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);
    if (req.method === 'POST') {
        const result: menus[] = await prisma.menus.findMany(
            {
                where: {
                    main: true,
                    active: true,
                },
                orderBy: {
                    order_index: 'asc',
                },
            },
        );

        const menu_lv1 = result.map((row) => (
            {
                parent_id: row.parent_id,
                menu_id: row.menu_id,
                page_id: row.page_id,
                template_id: row.template_id,
                title: row.title,
                url: row.slug,
                order_index: row.order_index,
                submenu: {
                    menu: [] as any,
                    type: 'menu',
                } as any | null,
            }
        )).filter((row) => (
            row.parent_id === 0
        ));

        await Promise.all(
            menu_lv1.map(async (row) => {
                const listSub: menus[] = await prisma.menus.findMany(
                    {
                        where: {
                            parent_id: row.menu_id,
                            active: true,
                        },
                        orderBy: {
                            order_index: 'asc',
                        },
                    },
                );

                if (listSub.length > 0) {
                    listSub.forEach((sub) => {
                        const item = {
                            menu_id: sub.menu_id,
                            page_id: sub.menu_id,
                            template_id: sub.title,
                            title: sub.title,
                            url: sub.slug,
                            order_index: sub.order_index,
                        };

                        row.submenu.menu.push(item);
                    });
                } else {
                    row.submenu = null;
                }
            }),
        );

        res.json(menu_lv1);
    } else {
        res.json([]);
    }
}
