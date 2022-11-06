/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
// application
import { GetServerSideProps } from 'next';
import { HOST } from '../../environment';
import SitePageNotFound from '../../components/site/SitePageNotFound';
import TemplatePost from '../../components/templates/TemplatePost';
import Post from '../../models/post';
import { GetPostDetail } from '../../repository/post';

export interface PageProps {
    siteSlug: string;
    postDetail: Post | null;
    currentUrl: string;
}

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    let siteSlug: string = '';
    let currentUrl: string = '';
    let postDetail: Post | null = null;

    if (typeof context.params?.slug === 'string') {
        const { slug } = context.params;
        currentUrl = `${HOST}/post/${slug}`;
        siteSlug = slug;
        postDetail = await GetPostDetail(slug);
    }

    return {
        props: {
            siteSlug,
            postDetail,
            currentUrl,
        },
    };
};

function Page({
    siteSlug,
    postDetail,
    currentUrl,
}: PageProps) {
    if (postDetail === null) {
        return <SitePageNotFound />;
    }
    return (
        <TemplatePost
            postSlug={siteSlug}
            postDetail={postDetail}
            currentUrl={currentUrl}
        />
    );
}

export default Page;
