/* eslint-disable @typescript-eslint/no-unused-vars */
import Cors from 'cors';

import type { NextApiRequest, NextApiResponse } from 'next';
import initMiddleware from '../../../../../../lib/init-middleware';
import prisma from '../../../../../../lib/prisma';
import Response from '../../../../../models/response';
import authentication from '../../../../../core/utils';
import JsonData from '../../../../../models/jsondata';
import { NOT_FOUND_DB_CODE } from '../../../../../core/constant';

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    }),
);

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);
    const response: Response = new Response();

    try {
        if (req.method === 'POST') {
            const reqBody = req.body;
            const reqHeader = req.headers;
            const token = reqHeader.authorization;
            if (token) {
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    const resultSet: JsonData[] = await prisma.$queryRaw`
                    EXEC GET_ALL_CATEGORY 
                    @category_id=${reqBody.category_id},
                    @keyword=${reqBody.keyword},
                    @page=${reqBody.page},
                    @limit=${reqBody.limit}
                `;
                    if (resultSet.length > 0) {
                        const jsonData: string | null = resultSet[0].JSON_DATA;
                        if (jsonData || jsonData !== NOT_FOUND_DB_CODE) {
                            const jsonDataParse: any = JSON.parse(jsonData);
                            response.data = jsonDataParse;
                            response.message = 'OK';
                            response.statusCode = 200;
                            response.totalPage = jsonDataParse[0].total_page;
                        }
                    }
                }
            }
        }
        res.json(response);
    } catch (error) {
        res.json(response);
    }
}
