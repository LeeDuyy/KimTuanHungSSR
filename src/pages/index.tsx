/* eslint-disable @typescript-eslint/no-unused-vars */
// third-party
import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';

// application
import HomePageOne, { InitData } from '../components/home/HomePageOne';
import shopApi from '../api/shop';
import GetConfig from '../repository/config';
import { IConfigState } from '../store/config/configType';

export interface PageProps {
    configState: IConfigState | null;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async () => (
    {
        props: {
            initData: {
                featuredProducts: await shopApi.getPopularProducts({ limit: 8 }),
                bestsellers: await shopApi.getPopularProducts({ limit: 7 }),
                latestProducts: await shopApi.getLatestProducts({ limit: 8 }),
                productColumns: [
                    {
                        title: 'Top Rated Products',
                        products: await shopApi.getTopRatedProducts({ limit: 3 }),
                    },
                    {
                        title: 'Special Offers',
                        products: await shopApi.getDiscountedProducts({ limit: 3 }),
                    },
                    {
                        title: 'Bestsellers',
                        products: await shopApi.getPopularProducts({ limit: 3 }),
                    },
                ],
            },
            configState: null,
        },
    }
);

function Page(props: PageProps) {
    const { configState } = props;
    return <HomePageOne configState={configState} />;
}

export default Page;
