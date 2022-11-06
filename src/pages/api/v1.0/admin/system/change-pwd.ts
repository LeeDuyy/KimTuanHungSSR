/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Cors from 'cors';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '@prisma/client';
import initMiddleware from '../../../../../../lib/init-middleware';
import prisma from '../../../../../../lib/prisma';
import Response from '../../../../../models/response';
import authentication from '../../../../../core/utils';
import { SALT_ROUND } from '../../../../../core/constant';

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    }),
);

interface IPwdChangeParam {
    new_pwd: string,
    cur_pwd: string,
    cfm_pwd: string,
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);
    const response: Response = new Response();
    try {
        if (req.method === 'POST') {
            const reqbody: IPwdChangeParam = req.body;
            const reqHeader = req.headers;
            const token = reqHeader.authorization;
            if (token) {
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    const user: users | null = await prisma.users.findFirst({
                        where: {
                            username: checkAuthor.username,
                        },
                    });

                    if (user) {
                        if (reqbody.new_pwd === reqbody.cfm_pwd) {
                            const userPwd = user.password;
                            if (userPwd) {
                                const checkPwd = bcrypt.compareSync(reqbody.cur_pwd, userPwd);
                                if (checkPwd) {
                                    const newHashPass = bcrypt.hashSync(reqbody.new_pwd, SALT_ROUND);
                                    const update = await prisma.users.update({
                                        where: {
                                            user_id: checkAuthor.user_id,
                                        },
                                        data: {
                                            password: newHashPass,
                                        },
                                    });
                                    response.message = 'Đổi mật khẩu thành công';
                                    response.statusCode = 200;
                                }
                            }
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
