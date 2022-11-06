/* eslint-disable max-len */
import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import initMiddleware from '../../../../../../lib/init-middleware';
import prisma from '../../../../../../lib/prisma';
import JsonData from '../../../../../models/jsondata';
import { NOT_FOUND_DB_CODE } from '../../../../../core/constant';

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    }),
);

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let checkError = false;
    await cors(req, res);
    if (req.method === 'POST') {
        const reqBody = req.body;
        const result: JsonData[] = await prisma.$queryRaw`
            EXEC POSTS_SRH 
            @is_new=${reqBody.isNew},
            @post_id=${reqBody.postId},
            @slug=${reqBody.slug},
            @KeyWord=${reqBody.keyword},
            @page=${reqBody.page},
            @limit=${reqBody.limit}
        `;

        if (result.length > 0) {
            const jsonData: string | null = result[0].JSON_DATA;
            if (jsonData != null || jsonData !== NOT_FOUND_DB_CODE) {
                const response: object = JSON.parse(jsonData);
                res.json(response);
            } else {
                checkError = true;
            }
        } else {
            checkError = true;
        }
    } else {
        checkError = true;
    }

    if (checkError) res.json(null);
}
