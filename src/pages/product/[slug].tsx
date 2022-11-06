/* eslint-disable @typescript-eslint/no-unused-vars */
// third-party
import { GetServerSideProps } from 'next';
// application

import Products from '../../models/product';
import { GetProductInfo, GetProductRelated } from '../../repository/product';
import ShopPageProduct from '../../components/shop/ShopPageProduct';
import SitePageNotFound from '../../components/site/SitePageNotFound';
import { HOST } from '../../environment';
import { useConfig } from '../../store/config/configHook';

export interface PageProps {
    product: Products | null;
    relatedProducts: Products[] | [];
    currentUrl: string;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    let product: Products | null = null;
    let relatedProducts: Products[] = [];
    let currentUrl: string = '';

    if (typeof context.params?.slug === 'string') {
        const { slug } = context.params;
        currentUrl = `${HOST}/product/${slug}`;
        product = await GetProductInfo(slug);
        relatedProducts = await GetProductRelated(slug);
    }

    return {
        props: {
            product,
            relatedProducts,
            currentUrl,
        },
    };
};

function Page({
    product,
    relatedProducts,
    currentUrl,
}: PageProps) {
    const config = useConfig();
    if (product === null) {
        return <SitePageNotFound />;
    }

    return (
        <ShopPageProduct
            product={product}
            relatedProducts={relatedProducts}
            currentUrl={currentUrl}
            // config={config}
        />
    );
}

export default Page;
