/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Cors from 'cors';

import type { NextApiRequest, NextApiResponse } from 'next';
import { posts, tags } from '@prisma/client';
import initMiddleware from '../../../../../../lib/init-middleware';
import prisma from '../../../../../../lib/prisma';
import Response from '../../../../../models/response';
import authentication from '../../../../../core/utils';

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    }),
);

interface ITagPayload {
    option: number,
    postId: number,
    tags: tags[]
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);
    const response: Response = new Response();

    try {
        if (req.method === 'POST') {
            const reqBody: ITagPayload = req.body;
            const reqHeader = req.headers;

            const token = reqHeader.authorization;
            if (token) {
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    // 0 => add, 1 => edit
                    const tagsList: tags[] = reqBody.tags;
                    console.log(reqBody);
                    
                    const post: posts | null = await prisma.posts.findFirst({
                        orderBy: {
                            post_id: 'desc',
                        },
                    });
                    if (post) {
                        if (reqBody.option === 0) {
                            tagsList.forEach((row: tags) => {
                                row.post_id = post.post_id;
                            });
                        } else {
                            await prisma.tags.deleteMany({
                                where: {
                                    post_id: reqBody.postId,
                                },
                            });
                        }
                        
                        await prisma.tags.createMany({
                            data: tagsList,
                        });

                        response.message = 'OK';
                        response.statusCode = 200;
                    }
                }
            }
        }
        res.json(response);
    } catch (error) {
        console.log(error);
        res.json(response);
    }
}
