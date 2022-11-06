import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '@prisma/client';
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
        const result: config[] = await prisma.config.findMany();
        res.json(result[0]);
    } else {
        res.json([]);
    }
}
