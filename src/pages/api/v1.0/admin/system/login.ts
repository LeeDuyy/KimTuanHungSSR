/* eslint-disable @typescript-eslint/no-unused-vars */
import Cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '@prisma/client';
import initMiddleware from '../../../../../../lib/init-middleware';
import prisma from '../../../../../../lib/prisma';
import Response from '../../../../../models/response';
import { JWT_CONFIG } from '../../../../../core/constant';

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
            const resultSet: users[] = await prisma.users.findMany(
                {
                    where: {
                        username: reqBody.username,
                    },
                },
            );

            if (resultSet.length > 0) {
                const user: users = resultSet[0];
                const userPwd = user.password;
                if (userPwd) {
                    const checkPwd = bcrypt.compareSync(reqBody.password, userPwd);
                    if (checkPwd && user.active) {
                        const token = jwt.sign(
                            {
                                username: user.username,
                                user_id: user.user_id,
                            },
                            JWT_CONFIG.secret,
                            { expiresIn: JWT_CONFIG.expires },
                        );

                        response.data = {
                            token: `${JWT_CONFIG.prefix} ${token}`,
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
