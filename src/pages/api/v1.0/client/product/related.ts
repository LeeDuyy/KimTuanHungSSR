/* eslint-disable max-len */
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../../lib/prisma';
import { NOT_FOUND_DB_CODE } from '../../../../../core/constant';
import JsonData from '../../../../../models/jsondata';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let checkError = false;

    if (req.method === 'POST') {
        const reqBody = req.body;
        const result: JsonData[] = await prisma.$queryRaw`
            EXEC PRODUCTMODEL_RELATED_SRH 
            @SLUG=${reqBody.slug},
            @Page=1,
            @Limit=8
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

    if (checkError) res.json([]);
}
