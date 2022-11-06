/* eslint-disable no-await-in-loop */
/* eslint-disable array-callback-return */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
import Cors from 'cors';
import { categories } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../../lib/prisma';
import initMiddleware from '../../../../../../lib/init-middleware';

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
        const resultSet: categories[] = await prisma.categories.findMany({
            where: {
                active: true,
                slug: reqBody.slug,
            },
        });

        if (resultSet.length > 0) {
            const category: any = resultSet[0];
            const listCategoryParent: categories[] = [];
            const children: categories[] = [];
            const listSibbling: categories[] = await prisma.categories.findMany({
                where: {
                    parent_id: category.parent_id,
                    active: true,
                },
            });

            const resultSetChildren: categories[] = await prisma.categories.findMany({
                where: {
                    active: true,
                    parent_id: category.category_id,
                },
            });
            resultSetChildren.forEach((row) => {
                children.push(row);
            });

            let stop: boolean = true;
            while (stop) {
                const resultSetParent: categories[] = await prisma.categories.findMany({
                    where: {
                        active: true,
                        category_id: category.parent_id,
                    },
                });

                if (resultSetParent.length > 0) {
                    const categoryParent: categories = resultSetParent[0];
                    listCategoryParent.push(categoryParent);
                    if (categoryParent.parent_id === 0) {
                        stop = false;
                    }
                } else {
                    stop = false;
                }
            }
            category.parents = listCategoryParent.reverse();
            category.sibblings = listSibbling;
            category.children = children;
            res.json(category);
        } else {
            checkError = true;
        }
    } else {
        checkError = true;
    }

    if (checkError) res.json('');
}
