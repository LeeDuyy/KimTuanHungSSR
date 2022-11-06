/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
// react
import {
    Fragment,
    useMemo,
    useState,
} from 'react';

// third-party
import Head from 'next/head';

// application
// import shopApi from '../../api/shop';
import { IProduct } from '../../interfaces/product';
// import { useDeferredData } from '../../services/hooks';
// import { useDeferredData, useProductColumns, useProductTabs } from '../../services/hooks';

// blocks
import BlockBanner from '../blocks/BlockBanner';
import BlockBrands from '../blocks/BlockBrands';
import BlockCategories from '../blocks/BlockCategories';
import BlockFeatures from '../blocks/BlockFeatures';
import BlockPosts from '../blocks/BlockPosts';
import { BlockProductColumnsItem } from '../blocks/BlockProductColumns';
// import BlockProductColumns, { BlockProductColumnsItem } from '../blocks/BlockProductColumns';
import BlockProducts from '../blocks/BlockProducts';
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import BlockSlideShow from '../blocks/BlockSlideShow';

// data stubs
// import dataBlogPosts from '../../data/blogPosts';
// import dataShopBlockCategories from '../../data/shopBlockCategories';
import HomeBlock from '../../models/home';
import Post from '../../models/post';
import { IConfigState } from '../../store/config/configType';
import { GetHomeBlock, GetPostHome } from '../../repository/home';

export interface InitData {
    featuredProducts?: IProduct[];
    bestsellers?: IProduct[];
    latestProducts?: IProduct[];
    productColumns?: BlockProductColumnsItem[];
}

export interface HomePageOneProps {
    // initData?: InitData;
    configState: IConfigState | null;
}

function HomePageOne(props: HomePageOneProps) {
    const { configState } = props;
    const [homeBlock, setHomeBlock] = useState<HomeBlock>(new HomeBlock());
    const [postHome, setPostHome] = useState<Post[]>([]);

    /**
     * Featured products.
     */
    // const featuredProducts = useProductTabs(
    //     useMemo(() => [
    //         { id: 1, name: 'All', categorySlug: undefined },
    //         { id: 2, name: 'Power Tools', categorySlug: 'power-tools' },
    //         { id: 3, name: 'Hand Tools', categorySlug: 'hand-tools' },
    //         { id: 4, name: 'Plumbing', categorySlug: 'plumbing' },
    //     ], []),
    //     (tab) => shopApi.getPopularProducts({ limit: 8, category: tab.categorySlug }),
    //     initData?.featuredProducts,
    // );
    useMemo(() => {
        async function fetch() {
            const response: HomeBlock | null = await GetHomeBlock();
            if (response != null) {
                setHomeBlock(response);
            }
        }
        fetch();
    }, []);

    useMemo(() => {
        async function fetch() {
            const response: Post[] = await GetPostHome();
            setPostHome(response);
        }
        fetch();
    }, []);

    /**
     * Bestsellers.
     */
    // const bestsellers = useDeferredData(() => (
    //     shopApi.getPopularProducts({ limit: 7 })
    // ), [], initData?.bestsellers);

    /**
     * Latest products.
     */
    // const latestProducts = useProductTabs(
    //     useMemo(() => [
    //         { id: 1, name: 'All', categorySlug: undefined },
    //         { id: 2, name: 'Power Tools', categorySlug: 'power-tools' },
    //         { id: 3, name: 'Hand Tools', categorySlug: 'hand-tools' },
    //         { id: 4, name: 'Plumbing', categorySlug: 'plumbing' },
    //     ], []),
    //     (tab) => shopApi.getLatestProducts({ limit: 8, category: tab.categorySlug }),
    //     initData?.latestProducts,
    // );

    /**
     * Product columns.
     */
    // const columns = initData?.productColumns || useProductColumns(
    //     useMemo(() => [
    //         {
    //             title: 'Top Rated Products',
    //             source: () => shopApi.getTopRatedProducts({ limit: 3 }),
    //         },
    //         {
    //             title: 'Special Offers',
    //             source: () => shopApi.getDiscountedProducts({ limit: 3 }),
    //         },
    //         {
    //             title: 'Bestsellers',
    //             source: () => shopApi.getPopularProducts({ limit: 3 }),
    //         },
    //     ], []),
    // );

    return (
        <Fragment>
            <Head>
                <title>Kim Tuấn Hùng</title>
                <meta name="title" content="Kim Tuấn Hùng" />
                <meta name="title" content="Cáp Xích Kim Tuấn Hùng" />
                <meta
                    name="description"
                    content="Công Ty TNHH TM-DV Cáp Xích Kim Tuấn Hùng là Công ty chuyên sản xuất, cung cấp các loại Dây cáp thép, phân phối các thiết bị nâng hạ và dụng cụ hỗ trợ. Chúng tôi có hơn 10 năm kinh nghiệm trong lĩnh vực này."
                />
                <meta name="keywords" content="Cáp Xích Kim Tuấn Hùng" />

                {/* FaceBook */}
                <meta property="og:title" content="Cáp Xích Kim Tuấn Hùng" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content="https://capxichkimtuanhung.com/" />
                <meta
                    property="og:description"
                    content="Công Ty TNHH TM-DV Cáp Xích Kim Tuấn Hùng là Công ty chuyên sản xuất, cung cấp các loại Dây cáp thép, phân phối các thiết bị nâng hạ và dụng cụ hỗ trợ. Chúng tôi có hơn 10 năm kinh nghiệm trong lĩnh vực này."
                />
                <meta property="og:image" content="https://capxichkimtuanhung.com/images/system/LogoCompany.png" />
            </Head>

            {useMemo(() => <BlockSlideShow withDepartments />, [])}

            {useMemo(() => <BlockFeatures />, [])}

            {
                useMemo(() => {
                    if (homeBlock.featured_products
                        && homeBlock.featured_products.length > 0) {
                        return (
                            <BlockProductsCarousel
                                title="Sản Phẩm Nổi Bật"
                                layout="grid-4"
                                products={homeBlock.featured_products}
                            />
                        );
                    }
                }, [homeBlock.featured_products])
            }

            {useMemo(() => <BlockBanner />, [])}

            {
                useMemo(() => {
                    if (homeBlock.bestsellers_products
                        && homeBlock.bestsellers_products.length > 0) {
                        return (
                            <BlockProducts
                                title="Sản Phẩm Bán Chạy"
                                layout="large-first"
                                featuredProduct={homeBlock.bestsellers_products[0]}
                                products={homeBlock.bestsellers_products}
                            />
                        );
                    }
                }, [homeBlock.bestsellers_products])
            }

            {
                useMemo(() => {
                    if (homeBlock.category_popular
                        && homeBlock.category_popular.length > 0) {
                        return (
                            <BlockCategories
                                title="Ngành hàng phổ biến"
                                layout="classic"
                                categories={homeBlock.category_popular}
                            />
                        );
                    }
                }, [homeBlock.category_popular])
            }

            {/* {useMemo(() => (
                <BlockProductsCarousel
                    title="New Arrivals"
                    layout="horizontal"
                    rows={2}
                    products={latestProducts.data}
                    loading={latestProducts.isLoading}
                    groups={latestProducts.tabs}
                    onGroupClick={latestProducts.handleTabChange}
                />
            ), [latestProducts])} */}

            {/* {useMemo(() => <BlockPosts title="Latest News" layout="list-sm" posts={dataBlogPosts} />, [])} */}
            {useMemo(() => <BlockPosts title="Tin Mới" layout="list-sm" posts={postHome} />, [postHome])}

            {useMemo(() => <BlockBrands />, [])}

            {/* {useMemo(() => <BlockProductColumns columns={columns} />, [columns])} */}
        </Fragment>
    );
}

export default HomePageOne;
