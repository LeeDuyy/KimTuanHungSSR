/* eslint-disable array-callback-return */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
import { categories, menus } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../../lib/prisma';

class Department {
    menuId: number = -1;
    label: string = '';
    type: string = 'template';
    url: string | null = '';
    children!: this[] | null;
    orderIndex: number = -1;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let checkError = false;

    if (req.method === 'POST') {
        const listDepartments: Department[] = [];
        const resultSet: menus[] = await prisma.menus.findMany({
            where: {
                mobile: true,
                active: true,
            },
            orderBy: {
                order_index: 'asc',
            },
        });

        const listCategoryLv1 = resultSet.map((row) => (
            row.parent_id === 0
            && {
                menu_id: row.menu_id,
                type: 'template',
                label: row.title,
                url: row.slug,
                order_index: row.order_index,
            }
        ));

        await Promise.all(listCategoryLv1.map(async (row) => {
            if (row) {
                const department: Department = {
                    menuId: row.menu_id,
                    label: row.label,
                    type: 'template',
                    url: row.url,
                    children: null,
                    orderIndex: row.order_index,
                };

                const listCategoryLv2: menus[] = await prisma.menus.findMany({
                    where: {
                        parent_id: row.menu_id,
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

                        child.menuId = rowLv2.menu_id;
                        child.label = rowLv2.title;
                        child.type = 'template';
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
