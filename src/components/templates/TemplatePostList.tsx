// react
import {
    // useState,
    Fragment,
} from 'react';

// third-party
import Head from 'next/head';

// application
import BlogSidebar from './BlogSidebar';
import PageHeader from '../shared/PageHeader';
import Pagination from '../shared/Pagination';
import PostCard, { PostCardLayout } from '../shared/PostCard';

// data stubs
import Post from '../../models/post';
import Menu from '../../models/menu';
import { usePostOptions, useSetPostOption } from '../../store/post/postHook';
import { useSearch } from '../../store/search/searchHook';

export type TemplatePostListLayout = 'classic' | 'grid' | 'list';

export type TemplatePostListSidebarPosition = 'start' | 'end';

export interface TemplatePostListProps {
    layout?: TemplatePostListLayout;
    sidebarPosition?: TemplatePostListSidebarPosition;
    postList: Post[];
    menu: Menu;
    menuSlug: string;
    totalPage: number;
    keyword: string;
}

function TemplatePostList(props: TemplatePostListProps) {
    const {
        layout = 'classic',
        sidebarPosition = 'end',
        postList,
        menu,
        menuSlug,
        totalPage,
        // keyword,
    } = props;

    // const [page, setPage] = useState(1);
    const options = usePostOptions();
    const searchState = useSearch();
    const handlePageChange = useSetPostOption('page', parseFloat);

    let breadcrumb;
    if (menuSlug.toLowerCase().includes('blog')) {
        breadcrumb = [
            { title: 'Trang Chủ', url: '/' },
            { title: 'Blog', url: '/blog' },
            { title: menu.title, url: menuSlug },
        ];
    } else {
        breadcrumb = [
            { title: 'Trang Chủ', url: '/' },
            { title: menu.title, url: '' },
        ];
    }

    let sidebarStart;
    let sidebarEnd;

    const sidebar = <BlogSidebar position={sidebarPosition} />;

    if (sidebarPosition === 'start') {
        sidebarStart = <div className="col-12 col-lg-4 order-1 order-lg-0">{sidebar}</div>;
    } else if (sidebarPosition === 'end') {
        sidebarEnd = <div className="col-12 col-lg-4">{sidebar}</div>;
    }

    let content;
    if (postList && postList.length > 0) {
        const postsList = postList.map((post) => {
            const layoutMap: { [layout: string]: PostCardLayout } = {
                classic: 'grid-lg',
                grid: 'grid-nl',
                list: 'list-nl',
            };

            return (
                <div key={post.post_id} className="posts-list__item">
                    <PostCard postDetail={post} layout={layoutMap[layout]} />
                </div>
            );
        });

        content = (
            <div className="col-12 col-lg-8">
                <div className="block">
                    <div className="posts-view">
                        <div className={`posts-view__list posts-list posts-list--layout--${layout}`}>
                            <div className="posts-list__body">
                                {postsList}
                            </div>
                        </div>
                        <div className="posts-view__pagination">
                            <Pagination
                                current={options.page}
                                siblings={2}
                                total={totalPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="col-12 col-lg-8">
                <div className="block">
                    <div className="posts-view">
                        <div className={`posts-view__list posts-list posts-list--layout--${layout}`}>
                            <div className="products-view__empty">
                                <div className="products-view__empty-title">Không có bài viết.</div>
                                <div className="products-view__empty-subtitle">Hãy truy cập vào danh mục khác hoặc quay lại trang chủ.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{`Cáp Xích Kim Tuấn Hùng | ${menu.title}`}</title>
            </Head>

            {
                searchState.searchParam.keyword.length > 0
                    ? (
                        <PageHeader header={`${menu.title} liên quan đến - "${searchState.searchParam.keyword}"`} breadcrumb={breadcrumb} />
                    ) : (
                        <PageHeader header={menu.title} breadcrumb={breadcrumb} />
                    )
            }

            <div className="container">
                <div className="row">
                    {sidebarStart}
                    {content}
                    {sidebarEnd}
                </div>
            </div>
        </Fragment>
    );
}

export default TemplatePostList;
