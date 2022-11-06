/* eslint-disable @typescript-eslint/no-unused-vars */

import Cors from 'cors';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { slides } from '@prisma/client';
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
            const slide: slides = req.body;
            const token = reqHeader.authorization;
            if (token) {
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    const slideId = slide.slide_id;

                    if (slide.slide_id === -1) {
                        slide.created_user = checkAuthor.user_id;
                        slide.updated_user = 0;
                        slide.created_date = now;
                    } else {
                        const entity: slides | null = await prisma.slides.findFirst(
                            {
                                where: {
                                    slide_id: slideId,
                                },
                            },
                        );

                        if (entity) {
                            slide.created_user = entity.created_user;
                            slide.created_date = entity.created_date;
                            slide.updated_user = checkAuthor.user_id;
                            slide.updated_date = now;
                        }
                    }

                    const entityUpsert: any = slide;
                    delete entityUpsert.slide_id;
                    delete entityUpsert.position;

                    await prisma.slides.upsert({
                        where: {
                            slide_id: slideId,
                        },
                        create: entityUpsert,
                        update: entityUpsert,
                    });

                    response.message = 'Lưu slide thành công';
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
