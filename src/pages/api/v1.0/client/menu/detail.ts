/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { menus, pages } from '@prisma/client';
import initMiddleware from '../../../../../../lib/init-middleware';
import prisma from '../../../../../../lib/prisma';

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    }),
);

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);
    let menuData: any = {};
    if (req.method === 'POST') {
        const reqBody = req.body;
        const menu: menus | null = await prisma.menus.findFirst(
            {
                where: {
                    slug: reqBody.slug,
                    active: true,
                },
            },
        );

        if (menu) {
            const pageId: number | null = menu.page_id;
            const isBlog: boolean = menu.is_blog;
            let page: pages[] = [];

            if (pageId && pageId > 0) {
                page = await prisma.pages.findMany(
                    {
                        where: {
                            page_id: pageId,
                        },
                    },
                );
            }

            if (page.length > 0) {
                menuData = {
                    template: menu.template_id,
                    isBlog,
                    menu: {},
                    page: page[0],
                };
            } else if (isBlog) {
                menuData = {
                    template: menu.template_id,
                    isBlog,
                    menu,
                    page: {},
                };
            }
        }
        res.json(menuData);
    } else {
        res.json(menuData);
    }
}
