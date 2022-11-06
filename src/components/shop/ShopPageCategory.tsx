// react
import {
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

// third-party
import Head from 'next/head';
import queryString from 'query-string';
import { useRouter } from 'next/router';

// application
import BlockLoader from '../blocks/BlockLoader';
import CategorySidebar from './CategorySidebar';
import CategorySidebarItem from './CategorySidebarItem';
import PageHeader from '../shared/PageHeader';
import ProductsView, { ProductsViewGrid } from './ProductsView';
// import shopApi from '../../api/shop';
import url from '../../services/url';
import WidgetFilters from '../widgets/WidgetFilters';
// import WidgetProducts from '../widgets/WidgetProducts';
import { buildQuery } from '../../store/shop/shopHelpers';
// import { getCategoryParents } from '../../services/helpers';
// import { IProduct } from '../../interfaces/product';
import { useShop } from '../../store/shop/shopHooks';

// data stubs
// import theme from '../../data/theme';
import Category from '../../models/category';
import { IMAGE_FOLDER } from '../../environment';

export type ShopPageCategoryColumns = 3 | 4 | 5;
export type ShopPageCategoryViewMode = 'grid' | 'grid-with-features' | 'list';
export type ShopPageCategorySidebarPosition = 'start' | 'end';

export interface ShopPageCategoryProps {
    columns: ShopPageCategoryColumns;
    viewMode: ShopPageCategoryViewMode;
    sidebarPosition?: ShopPageCategorySidebarPosition;
    categoryInfo: Category;
    currentUrl: string;
}

function ShopPageCategory(props: ShopPageCategoryProps) {
    const {
        columns,
        viewMode,
        sidebarPosition = 'start',
        categoryInfo,
        currentUrl,
    } = props;
    const offcanvas = columns === 3 ? 'mobile' : 'always';
    const productsViewGrid = `grid-${columns}-${columns > 3 ? 'full' : 'sidebar'}` as ProductsViewGrid;
    // shop
    const shopState = useShop();
    const router = useRouter();
    // const [latestProducts, setLatestProducts] = useState<IProduct[]>([]);

    // sidebar
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const openSidebarFn = useCallback(() => setSidebarOpen(true), [setSidebarOpen]);
    const closeSidebarFn = useCallback(() => setSidebarOpen(false), [setSidebarOpen]);

    // Replace current url.
    useEffect(() => {
        const query = buildQuery(shopState.options, shopState.filters);
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
    }, [shopState.options, shopState.filters]);

    // Load latest products.
    // useEffect(() => {
    //     let canceled = false;

    //     if (offcanvas === 'always') {
    //         setLatestProducts([]);
    //     } else {
    //         shopApi.getLatestProducts({ limit: 5 }).then((result) => {
    //             if (canceled) {
    //                 return;
    //             }

    //             setLatestProducts(result);
    //         });
    //     }

    //     return () => {
    //         canceled = true;
    //     };
    // }, [offcanvas]);

    const sidebarComponent = useMemo(() => (
        <CategorySidebar open={sidebarOpen} closeFn={closeSidebarFn} offcanvas={offcanvas}>
            <CategorySidebarItem>
                <WidgetFilters title="Bộ Lọc" offcanvas={offcanvas} />
            </CategorySidebarItem>
            {/* {offcanvas !== 'always' && (
                <CategorySidebarItem className="d-none d-lg-block">
                    <WidgetProducts title="Latest Products" products={latestProducts} />
                </CategorySidebarItem>
            )} */}
        </CategorySidebar>
    ), [sidebarOpen, closeSidebarFn, offcanvas, []]);
    // ), [sidebarOpen, closeSidebarFn, offcanvas, latestProducts]);

    if (shopState.productsListIsLoading && !shopState.productsList) {
        return <BlockLoader />;
    }
    // if (shopState.productsListIsLoading && !shopState.productsList) {
    //     return <BlockLoader />;
    // }

    // if (shopState.categoryIsLoading || (shopState.productsListIsLoading && !shopState.productsList)) {
    //     return <BlockLoader />;
    // }

    const breadcrumb = [
        { title: 'Trang chủ', url: url.home() },
    ];
    let pageTitle = 'Shop';
    let content;

    if (categoryInfo.parents) {
        categoryInfo.parents.forEach((parent) => {
            if (parent.category_name) {
                breadcrumb.push({ title: parent.category_name, url: url.mainCat(parent.slug) });
            }
        });
    }

    if (categoryInfo.category_name) {
        breadcrumb.push({ title: categoryInfo.category_name, url: url.mainCat(categoryInfo.slug) });
        pageTitle = categoryInfo.category_name;
    }

    // if (shopState.category) {
    //     getCategoryParents(shopState.category).forEach((parent) => {
    //         breadcrumb.push({ title: parent.name, url: url.category(parent) });
    //     });
    //     breadcrumb.push({ title: shopState.category.name, url: url.category(shopState.category) });
    // }

    const productsView = (
        <ProductsView
            layout={viewMode}
            grid={productsViewGrid}
            offcanvas={offcanvas}
            openSidebarFn={openSidebarFn}
        />
    );

    if (columns > 3) {
        content = (
            <div className="container">
                <div className="block">{productsView}</div>
                {sidebarComponent}
            </div>
        );
    } else {
        const sidebar = (
            <div className="shop-layout__sidebar">
                {sidebarComponent}
            </div>
        );

        content = (
            <div className="container">
                <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
                    {sidebarPosition === 'start' && sidebar}
                    <div className="shop-layout__content">
                        <div className="block">{productsView}</div>
                    </div>
                    {sidebarPosition === 'end' && sidebar}
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{`${categoryInfo.category_name} | Cáp Xích Kim Tuấn Hùng`}</title>
                <meta name="title" content={`${categoryInfo.category_name} - Kim Tuấn Hùng`} />
                <meta name="description" content={categoryInfo.category_name} />
                <meta name="image" content={IMAGE_FOLDER + categoryInfo.image} />
                <meta name="keywords" content={`Kim Tuan Hung, ${categoryInfo.category_name}`} />
                <meta name="author" content="Kim Tuấn Hùng" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:title" content={`${categoryInfo.category_name} - Kim Tuấn Hùng`} />
                <meta property="og:description" content={`${categoryInfo.category_name} - Kim Tuấn Hùng`} />
                <meta property="og:image" content={IMAGE_FOLDER + categoryInfo.image} />
                <link rel="amphtml" href={currentUrl} />
                <link rel="canonical" href={currentUrl} />
            </Head>

            <PageHeader header={pageTitle} breadcrumb={breadcrumb} />

            {content}
        </Fragment>
    );
}

export default ShopPageCategory;
