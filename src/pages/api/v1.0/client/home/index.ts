/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import initMiddleware from '../../../../../../lib/init-middleware';
import prisma from '../../../../../../lib/prisma';
import { NOT_FOUND_DB_CODE } from '../../../../../core/constant';
import JsonData from '../../../../../models/jsondata';

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    }),
);

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let checkError = false;
    await cors(req, res);

    if (req.method === 'POST') {
        const result: JsonData[] = await prisma.$queryRaw`EXEC PRODUCTMODEL_SRH_HOME`;

        if (result.length > 0) {
            const jsonData: string | null = result[0].JSON_DATA;
            if (jsonData != null && jsonData !== NOT_FOUND_DB_CODE) {
                const response: object[] = JSON.parse(jsonData.replace('/\\/g', ''));
                res.json(response[0]);
            } else {
                checkError = true;
            }
        } else {
            checkError = true;
        }
    } else {
        checkError = true;
    }

    if (checkError) res.json({});
}
