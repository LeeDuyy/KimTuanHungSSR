import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { slides } from '@prisma/client';
import prisma from '../../../../../../lib/prisma';
import initMiddleware from '../../../../../../lib/init-middleware';

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    }),
);

class Slider {
    main: slides[] = [];
    banner: slides[] = [];
    partner: slides[] = [];
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);
    if (req.method === 'POST') {
        const result: Slider = new Slider();
        const resultMain: slides[] = await prisma.slides.findMany(
            {
                where: {
                    is_main: true,
                    active: true,
                },
            },
        );
        const resultBanner: slides[] = await prisma.slides.findMany(
            {
                where: {
                    is_body: true,
                    active: true,
                },
                orderBy: {
                    created_date: 'desc',
                },
            },
        );
        const resultPartner: slides[] = await prisma.slides.findMany(
            {
                where: {
                    is_partner: true,
                    active: true,
                },
            },
        );

        result.main = resultMain;
        result.banner = resultBanner;
        result.partner = resultPartner;
        res.json(result);
    } else {
        res.json({});
    }
}
