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

class Image {
    ltr: string = '';
    rtl: string = '';
}

class Children {
    title: string = '';
    url: string | null = '';
    orderIndex: number = -1;
}

class Links {
    title: string = '';
    url: string | null = '';
    links?: Children[] = [];
}

class ColunmsItem {
    size: number = 3;
    links: Links[] = [];
    orderIndex: number = -1;
}

class Menu {
    image: Image | string = 'no-image.jpg';
    size: string = 'xl';
    columns: ColunmsItem[] = [];
}

class SubMenu {
    type: string = 'megamenu';
    menu: Menu = new Menu();
}

class Department {
    title: string = '';
    url: string | null = '';
    submenu: SubMenu | null = null;
    orderIndex: number = -1;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let checkError = false;
    await cors(req, res);
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
                title: row.category_name,
                url: row.slug,
                image: row.image || 'no-image.jpg',
                order_index: row.order_index,
            }
        ));

        await Promise.all(listCategoryLv1.map(async (row) => {
            if (row) {
                const department: Department = {
                    title: row.title,
                    url: row.url,
                    submenu: null,
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
                    const subMenu: SubMenu = new SubMenu();
                    const menu: Menu = new Menu();
                    const colunms: ColunmsItem[] = [];

                    subMenu.type = 'megamenu';
                    menu.size = 'xl';

                    if (listCategoryLv2.length >= 3) {
                        const image: Image = {
                            ltr: row.image,
                            rtl: row.image,
                        };
                        menu.image = image;
                    }

                    await Promise.all(listCategoryLv2.map(async (rowLv2) => {
                        const links: Links[] = [];
                        const columnItem: ColunmsItem = new ColunmsItem();
                        const linkItem: Links = new Links();

                        linkItem.title = rowLv2.category_name;
                        linkItem.url = rowLv2.slug;
                        columnItem.orderIndex = rowLv2.order_index;

                        const listCategoryLv3: categories[] = await prisma.categories.findMany({
                            where: {
                                parent_id: rowLv2.category_id,
                                active: true,
                            },
                            orderBy: {
                                order_index: 'asc',
                            },
                        });

                        if (listCategoryLv2.length === 4) {
                            menu.size = 'lg';
                            columnItem.size = 4;
                        } else if (listCategoryLv2.length === 3) {
                            menu.size = 'nl';
                            columnItem.size = 6;
                        } else if (listCategoryLv2.length <= 2) {
                            menu.size = 'sm';
                            columnItem.size = 12;
                        }

                        if (listCategoryLv3.length > 0) {
                            const children: Children[] = [];
                            await Promise.all(listCategoryLv3.map((rowLv3) => {
                                const child: Children = {
                                    title: rowLv3.category_name,
                                    url: rowLv3.slug,
                                    orderIndex: rowLv3.order_index,
                                };
                                children.push(child);
                            }));
                            linkItem.links = children.sort((a, b) => (a.orderIndex - b.orderIndex));
                        }
                        links.push(linkItem);
                        columnItem.links = links;
                        colunms.push(columnItem);
                    }));
                    menu.columns = colunms.sort((a, b) => (a.orderIndex - b.orderIndex));
                    subMenu.menu = menu;
                    department.submenu = subMenu;
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
