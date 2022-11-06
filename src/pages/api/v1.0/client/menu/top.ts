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
                    top_bar: true,
                    active: true,
                },
                orderBy: {
                    order_index: 'asc',
                },
            },
        );

        res.json(result);
    } else {
        res.json([]);
    }
}
