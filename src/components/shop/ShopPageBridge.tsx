/* eslint-disable @typescript-eslint/no-unused-vars */
// react
import {
    Fragment,
    useEffect,
    useState,
} from 'react';

// third-party
import queryString from 'query-string';
import { useRouter } from 'next/router';

// application
import BlockLoader from '../blocks/BlockLoader';
import { buildQuery } from '../../store/shop/shopHelpers';
import { useSearch, useSearchPost } from '../../store/search/searchHook';

// data stubs
import Page from '../../models/page';
import Menu from '../../models/menu';
import Post from '../../models/post';
import TemplatePostList from '../templates/TemplatePostList';
import SitePageNotFound from '../site/SitePageNotFound';
import TemplateBackground from '../templates/TemplateBackground';
import TemplateSummary from '../templates/TemplateSummary';
import TemplateFull from '../templates/TemplateFull';
import { GetPostList } from '../../repository/post';
import { usePost } from '../../store/post/postHook';
import { GetMenuDetail } from '../../repository/menus';

interface PageBridgeProps {
    menuSlug: string,
}

interface PostList {
    postList: Post[];
    totalPage: number;
}

interface MenuDetail {
    templateId: number;
    isBlog: boolean;
    page: Page;
    menu: Menu;
}

function ShopPageBridge(props: PageBridgeProps) {
    const { menuSlug } = props;
    const [loading, setLoading] = useState(true);
    const [template, setTemplate] = useState(-1);
    const [isBlog, setIsBlog] = useState(false);
    const [page, setPage] = useState<Page | null>(null);
    const [menu, setMenu] = useState<Menu | null>(null);
    const [postList, setPostList] = useState<Post[]>([]);
    const [totalPage, setTotalPage] = useState(0);

    // shop
    const postState = usePost();
    const router = useRouter();

    // search
    const searchState = useSearch();
    const searchPost = useSearchPost();

    // Replace current url.
    useEffect(() => {
        const query = buildQuery(postState.options, {});
        const href = queryString.stringifyUrl({
            ...queryString.parseUrl(router.asPath),
            query: queryString.parse(query),
        }, { encode: false });

        router.replace(href, href, {
            shallow: true,
        }).then(() => {
            // This is necessary for the "History API" to work.
            window.history.replaceState(
                {
                    ...window.history.state,
                    options: {
                        ...window.history.state.options,
                        shallow: false,
                    },
                },
                '',
                href,
            );
        });
    }, [postState.options, menuSlug]);

    // Load list post.
    useEffect(() => {
        async function fetch() {
            setLoading(true);
            const { keyword } = searchState.searchParam;
            const isNew: boolean = false;
            const postId: number = 0;
            const limit: number = 12;
            let page: number = 1;
            if (postState.options.page) {
                page = postState.options.page;
            }
            const responseListPost = await GetPostList(isNew, postId, `/${menuSlug}`, keyword, page, limit);

            if (responseListPost != null) {
                const listPost: PostList = responseListPost;
                setPostList(listPost.postList);
                setTotalPage(listPost.totalPage);
            }

            const responseMenu = await GetMenuDetail(`/${menuSlug}`);
            if (responseMenu != null) {
                const menuRes: MenuDetail = responseMenu;
                setTemplate(menuRes.templateId);
                setIsBlog(menuRes.isBlog);
                setMenu(menuRes.menu);
                setPage(menuRes.page);
            }
            setLoading(false);
        }

        fetch();
    }, [postState.options, menuSlug, searchState.searchParam.keyword]);

    // Load other url.
    useEffect(() => {
        if (`/${menuSlug}` !== searchState.searchParam.menuSlug) {
            searchState.searchParam.menuSlug = `/${menuSlug}`;
            searchPost(searchState.searchParam);
        }
    }, [menuSlug]);

    if (loading) {
        return <BlockLoader />;
    }

    if (isBlog) {
        if (template === 4) {
            if (menu != null) {
                return (
                    <TemplatePostList
                        layout="classic"
                        menuSlug={menuSlug}
                        keyword={searchState.searchParam.keyword}
                        postList={postList}
                        menu={menu}
                        totalPage={totalPage}
                    />
                );
            }
        } else if (template === 5) {
            if (menu != null) {
                return (
                    <TemplatePostList
                        layout="grid"
                        menuSlug={menuSlug}
                        keyword={searchState.searchParam.keyword}
                        postList={postList}
                        menu={menu}
                        totalPage={totalPage}
                    />
                );
            }
        } else if (template === 6) {
            if (menu != null) {
                return (
                    <TemplatePostList
                        layout="list"
                        menuSlug={menuSlug}
                        keyword={searchState.searchParam.keyword}
                        postList={postList}
                        menu={menu}
                        totalPage={totalPage}
                    />
                );
            }
        }
    } else if (template === 1) {
        if (page != null) {
            return <TemplateBackground page={page} />;
        }
    } else if (template === 2) {
        if (page != null) {
            return <TemplateSummary page={page} />;
        }
    } else if (template === 3) {
        if (page != null) {
            return <TemplateFull page={page} />;
        }
    }

    return (
        <SitePageNotFound />
    );
}

export default ShopPageBridge;
