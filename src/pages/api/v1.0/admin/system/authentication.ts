/* eslint-disable @typescript-eslint/no-unused-vars */
import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '@prisma/client';
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
    try {
        if (req.method === 'POST') {
            const reqHeader = req.headers;
            const token = reqHeader.authorization;
            if (token) {
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    const resultSet: users[] = await prisma.users.findMany(
                        {
                            where: {
                                username: checkAuthor.username,
                            },
                        },
                    );

                    if (resultSet.length > 0) {
                        const user: users = resultSet[0];
                        response.data = {
                            username: user.username,
                            fullName: user.full_name,
                        };
                        response.message = 'OK';
                        response.statusCode = 200;
                    }
                }
            }
        }
        res.json(response);
    } catch (error) {
        res.json(response);
    }
}
