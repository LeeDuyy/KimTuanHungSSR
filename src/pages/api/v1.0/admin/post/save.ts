/* eslint-disable @typescript-eslint/no-unused-vars */
import Cors from 'cors';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { categories, posts, users } from '@prisma/client';
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
            const post: posts = req.body;
            const token = reqHeader.authorization;
            if (token) {
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    const postId = post.post_id;

                    if (postId === -1) {
                        post.created_user = checkAuthor.user_id;
                        post.updated_user = 0;
                        post.created_date = now;
                    } else {
                        const entity: posts | null = await prisma.posts.findFirst(
                            {
                                where: {
                                    post_id: postId,
                                },
                            },
                        );

                        if (entity) {
                            post.created_user = entity.created_user;
                            post.created_date = entity.created_date;
                            post.updated_user = checkAuthor.user_id;
                            post.updated_date = now;
                        }
                    }
                    const activeDateFormat = moment.utc(post.active_date).local().toDate();
                    const entiryUpsert: any = post;

                    post.active_date = activeDateFormat;
                    delete entiryUpsert.post_id;
                    delete entiryUpsert.active_time;
                    delete entiryUpsert.tags;

                    await prisma.posts.upsert({
                        where: {
                            post_id: postId,
                        },
                        update: entiryUpsert,
                        create: entiryUpsert,
                    });

                    response.message = 'Lưu bài viết thành công';
                    response.statusCode = 200;
                }
            }
        }
        res.json(response);
    } catch (error) {
        // console.log(error);
        res.json(response);
    }
}
