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

class Department {
    categoryId: number = -1;
    label: string = '';
    type: string = 'link';
    url: string | null = '';
    children!: this[] | null;
    orderIndex: number = -1;
}

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    }),
);

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);
    let checkError = false;

    if (req.method === 'POST') {
        const listDepartments: Department[] = [];
        const resultSet: categories[] = await prisma.categories.findMany({
            where: {
                active: true,
            },
            orderBy: {
                order_index: 'asc',
            },
        });

        const listCategoryLv1 = resultSet.map((row) => (
            row.parent_id === 0
            && {
                category_id: row.category_id,
                type: 'link',
                label: row.category_name,
                url: row.slug,
                order_index: row.order_index,
            }
        ));

        await Promise.all(listCategoryLv1.map(async (row) => {
            if (row) {
                const department: Department = {
                    categoryId: row.category_id,
                    label: row.label,
                    type: 'link',
                    url: row.url,
                    children: null,
                    orderIndex: row.order_index,
                };

                const listCategoryLv2: categories[] = await prisma.categories.findMany({
                    where: {
                        parent_id: row.category_id,
                        active: true,
                    },
                    orderBy: {
                        order_index: 'asc',
                    },
                });

                if (listCategoryLv2.length > 0) {
                    const children: Department[] = [];
                    await Promise.all(listCategoryLv2.map(async (rowLv2) => {
                        const child: Department = new Department();
                        const childSub: Department[] = [];

                        const listCategoryLv3: categories[] = await prisma.categories.findMany({
                            where: {
                                parent_id: rowLv2.category_id,
                                active: true,
                            },
                            orderBy: {
                                order_index: 'asc',
                            },
                        });

                        if (listCategoryLv3.length > 0) {
                            const childSubItem: Department = new Department();
                            await Promise.all(listCategoryLv3.map((rowLv3) => {
                                const child: Department = {
                                    categoryId: rowLv3.category_id,
                                    type: 'link',
                                    label: rowLv3.category_name,
                                    url: rowLv3.slug,
                                    children: null,
                                    orderIndex: rowLv3.order_index,
                                };
                                childSub.push(child);
                            }));
                            child.children = childSub.sort((a, b) => (a.orderIndex - b.orderIndex));
                        }

                        child.categoryId = rowLv2.category_id;
                        child.label = rowLv2.category_name;
                        child.type = 'link';
                        child.url = rowLv2.slug;
                        child.orderIndex = rowLv2.order_index;
                        children.push(child);
                    }));
                    department.children = children.sort((a, b) => (a.orderIndex - b.orderIndex));
                }
                listDepartments.push(department);
            }
        }));
        res.json(listDepartments.sort((a, b) => (a.orderIndex - b.orderIndex)));
    } else {
        checkError = true;
    }

    if (checkError) res.json([]);
}
