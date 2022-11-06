/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Cors from 'cors';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
    categories,
    products,
    product_images,
    product_models,
    product_specifications,
    tags,
} from '@prisma/client';
import initMiddleware from '../../../../../../lib/init-middleware';
import prisma from '../../../../../../lib/prisma';
import Response from '../../../../../models/response';
import authentication from '../../../../../core/utils';

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    }),
);

interface ProductCrud {
    product_id: number,
    product_json: {
        product: products,
        model: product_models | null,
        specifications: product_specifications[],
        tags: tags[],
    }
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    await cors(req, res);
    const response: Response = new Response();
    const now = moment.utc(moment().format( "YYYY-MM-DDTHH:mm:ss.SSS")).local().toDate();
    try {
        if (req.method === 'POST') {
            const reqHeader = req.headers;
            const reqBody: ProductCrud = req.body;
            const token = reqHeader.authorization;
            if (token) {
                const checkAuthor: any = authentication(token);
                if (checkAuthor) {
                    const productId = reqBody.product_id;
                    const productJson = reqBody.product_json;
                    const {
                        product,
                        model,
                        specifications,
                        tags,
                    } = productJson;
                    if (productId === -1) {
                        product.created_user = checkAuthor.user_id;
                        product.updated_user = 0;
                        product.created_date = now;
                    } else {
                        const entity: products | null = await prisma.products.findFirst(
                            {
                                where: {
                                    product_id: productId,
                                },
                            },
                        );

                        if (entity) {
                            product.created_user = entity.created_user;
                            product.created_date = entity.created_date;
                            product.updated_user = checkAuthor.user_id;
                            product.updated_date = now;
                        }
                    }

                    const productUpsert: any = product;
                    productUpsert.rating_star = 5;
                    delete productUpsert.tags;
                    delete productUpsert.product_id;

                    const lastProduct = await prisma.products.upsert({
                        where: {
                            product_id: productId,
                        },
                        update: productUpsert,
                        create: productUpsert,
                    });

                    if (lastProduct) {
                        if (specifications.length > 0) {
                            const specList = specifications.map((row) => (
                                {
                                    product_id: lastProduct.product_id,
                                    group_name: row.group_name,
                                    attribute: row.attribute,
                                    value: row.value,
                                }
                            ));

                            await prisma.product_specifications.deleteMany({
                                where: {
                                    product_id: lastProduct.product_id,
                                },
                            });

                            await prisma.product_specifications.createMany({
                                data: specList,
                            });
                        }

                        if (tags.length > 0) {
                            const tagsList = tags.map((row) => (
                                {
                                    tag_name: row.tag_name,
                                    product_id: lastProduct.product_id,
                                    post_id: null,
                                }
                            ));

                            await prisma.tags.deleteMany({
                                where: {
                                    product_id: lastProduct.product_id,
                                },
                            });

                            await prisma.tags.createMany({
                                data: tagsList,
                            });
                        }

                        if (model) {
                            const modelUpsert: any = model;
                            const productImgList: product_images[] = modelUpsert.images;
                            delete modelUpsert.images;
                            delete modelUpsert.model_id;

                            modelUpsert.product_id = lastProduct.product_id;
                            const lastModel = await prisma.product_models.create({
                                data: modelUpsert,
                            });

                            if (productImgList.length > 0) {
                                productImgList.forEach((row) => {
                                    row.model_id = lastModel.model_id;
                                });

                                await prisma.product_images.createMany({
                                    data: productImgList,
                                });
                            }
                        }
                    }

                    response.message = 'Lưu sản phẩm thành công';
                    response.statusCode = 200;
                }
            }
        }
        res.json(response);
    } catch (error) {
        console.log(error);
        res.json(response);
    }
}
