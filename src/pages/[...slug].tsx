/* eslint-disable @typescript-eslint/no-unused-vars */
// application
import { GetServerSideProps } from 'next';
import ShopPageBridge from '../components/shop/ShopPageBridge';
import SitePageContactUs from '../components/templates/SitePageContactUs';
import { HOST } from '../environment';
import { ISearchParam } from '../interfaces/searchParam';
import { useSetPostOption } from '../store/post/postHook';
import { useSearchPost } from '../store/search/searchHook';

export interface PageProps {
    siteSlug: string;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    let siteSlug: string = '';
    let currentUrl: string = '';

    if (typeof context.params?.slug === 'object') {
        const { slug } = context.params;
        siteSlug = `${slug.join('/')}`;
        currentUrl = `${HOST}/category${siteSlug}`;
    }
    return {
        props: {
            siteSlug,
        },
    };
};

function Page({ siteSlug }: PageProps) {
    const handlePageChange = useSetPostOption('page', parseFloat);
    const searchPost = useSearchPost();
    const searchParam: ISearchParam = {
        categoryId: 0,
        menuSlug: '',
        keyword: '',
    };
    searchPost(searchParam);
    handlePageChange(1);
    if (siteSlug !== 'lien-he') return <ShopPageBridge menuSlug={siteSlug} />;
    return <SitePageContactUs />;
}

export default Page;
