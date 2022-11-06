/* eslint-disable @typescript-eslint/no-unused-vars */
// application
import { GetServerSideProps } from 'next';
import { wrapper } from '../../store/store';
import ShopPageCategory from '../../components/shop/ShopPageCategory';
import SitePageNotFound from '../../components/site/SitePageNotFound';
import Category from '../../models/category';
import getShopPageData from '../../store/shop/shopHelpers';
import { HOST } from '../../environment';
import { GetCategoryInfo } from '../../repository/category';

export interface PageProps {
    categoryInfo: Category | null;
    currentUrl: string;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    let categoryInfo: Category | null = null;
    let currentUrl: string = '';
    let siteSlug: string = '';

    if (typeof context.params?.slug === 'object') {
        const { slug } = context.params;
        siteSlug = `/${slug.join('/')}`;
        currentUrl = `${HOST}/category${siteSlug}`;
        categoryInfo = await GetCategoryInfo(siteSlug);
    }
    if (categoryInfo) {
        await getShopPageData(store, context, siteSlug, categoryInfo);
    }
    return {
        props: {
            categoryInfo,
            currentUrl,
        },
    };
});

function Page({ categoryInfo, currentUrl }: PageProps) {
    if (categoryInfo === null) {
        return <SitePageNotFound />;
    }
    return (
        <ShopPageCategory
            categoryInfo={categoryInfo}
            columns={3}
            viewMode="grid"
            sidebarPosition="start"
            currentUrl={currentUrl}
        />
    );
}

export default Page;
