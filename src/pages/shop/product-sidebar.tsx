/* eslint-disable @typescript-eslint/no-unused-vars */
// third-party
import { GetServerSideProps } from 'next';
// application
import shopApi from '../../api/shop';
import ShopPageProduct from '../../components/shop/ShopPageProduct';
import SitePageNotFound from '../../components/site/SitePageNotFound';
import { IProduct } from '../../interfaces/product';

export interface PageProps {
    product: IProduct;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async () => ({
    props: {
        product: await shopApi.getProductBySlug('brandix-screwdriver-screw1500acc'),
    },
});

function Page({ product }: PageProps) {
    // return <ShopPageProduct product={product} layout="sidebar" />;
    return <SitePageNotFound />;
}

export default Page;
