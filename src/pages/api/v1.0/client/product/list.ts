/* eslint-disable max-len */
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../../lib/prisma';
import JsonData from '../../../../../models/jsondata';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let checkError = false;

    if (req.method === 'POST') {
        const reqBody = req.body;
        const result: JsonData[] = await prisma.$queryRaw`
            EXEC PRODUCTMODEL_SRH 
            @Category_id=${reqBody.Category_id},
            @SortBy=${reqBody.SortBy},
            @KeyWord=${reqBody.KeyWord},
            @Page=${reqBody.Page},
            @Limit=${reqBody.Limit}
        `;

        if (result.length > 0) {
            const jsonData: string | null = result[0].JSON_DATA;
            if (jsonData != null && Number(jsonData) !== -10001) {
                const response: object[] = JSON.parse(jsonData.replace('/\\/g', ''));
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

    if (checkError) res.json([]);
}
