/* eslint-disable @typescript-eslint/no-unused-vars */
// react
import { Fragment, useEffect, useState } from 'react';

// third-party
import Head from 'next/head';

// application
import BlogPost from './BlogPost';
import BlogSidebar from './BlogSidebar';
import PageHeader from '../shared/PageHeader';

// data stubs
// import { GetPostDetail } from '../../api/Menu/postApi';
import Post from '../../models/post';
import { IMAGE_FOLDER } from '../../environment';

export type BlogPagePostLayout = 'classic' | 'full';

export type BlogPagePostSidebarPosition = 'start' | 'end';

export interface BlogPagePostProps {
    layout?: BlogPagePostLayout;
    sidebarPosition?: BlogPagePostSidebarPosition;
    postSlug: string;
    postDetail: Post;
    currentUrl: string;
}

export default function TemplatePost(props: BlogPagePostProps) {
    const {
        layout = 'classic',
        sidebarPosition = 'end',
        postSlug,
        postDetail,
        currentUrl,
    } = props;
    // const [currentUrl, setCurrentUrl] = useState('');

    let content;
    if (layout === 'classic') {
        const sidebar = <BlogSidebar position={sidebarPosition} />;

        let sidebarStart;
        let sidebarEnd;

        if (sidebarPosition === 'start') {
            sidebarStart = <div className="col-12 col-lg-4 order-1 order-lg-0">{sidebar}</div>;
        }
        if (sidebarPosition === 'end') {
            sidebarEnd = <div className="col-12 col-lg-4">{sidebar}</div>;
        }

        content = (
            <div className="row">
                {sidebarStart}
                <div className="col-12 col-lg-8">
                    <BlogPost layout={layout} post={postDetail} />
                </div>
                {sidebarEnd}
            </div>
        );
    } else if (layout === 'full') {
        content = (
            <div className="row justify-content-center">
                <div className="col-md-12 col-lg-9 col-xl-8">
                    <BlogPost layout={layout} post={postDetail} />
                </div>
            </div>
        );
    }

    const breadcrumbs = [
        { title: 'Trang Chủ', url: '/' },
        { title: postDetail.menu_name, url: postDetail.menu_slug },
        { title: postDetail.title, url: '' },
    ];

    return (
        <Fragment>
            <Head>
                <title>{`${postDetail.title} | Cáp Xích Kim Tuấn Hùng`}</title>
                <meta name="title" content={`${postDetail.title} - Kim Tuấn Hùng`} />
                <meta name="description" content={postDetail.short_descriptions} />
                <meta name="image" content={IMAGE_FOLDER + postDetail.thumbnail} />
                <meta name="keywords" content={`Cáp xích Kim Tuấn Hùng, Kim Tuấn Hùng, ${postDetail.title}`} />
                <meta name="author" content="CÔNG TY TNHH TM-DV CÁP XÍCH KIM TUẤN HÙNG" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:title" content={`${postDetail.title} - Kim Tuấn Hùng`} />
                <meta property="og:description" content={postDetail.short_descriptions} />
                <meta property="og:image" content={IMAGE_FOLDER + postDetail.thumbnail} />
                <link rel="amphtml" href={currentUrl} />
                <link rel="canonical" href={currentUrl} />
            </Head>

            <PageHeader breadcrumb={breadcrumbs} />

            <div className="container">{content}</div>
        </Fragment>
    );
}
