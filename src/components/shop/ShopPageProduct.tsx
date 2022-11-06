/* eslint-disable @typescript-eslint/no-unused-vars */
// react
import { Fragment, useEffect, useState } from 'react';

// third-party
import Head from 'next/head';

// application
import PageHeader from '../shared/PageHeader';
import Product from '../shared/Product';
import ProductTabs from './ProductTabs';
import shopApi from '../../api/shop';
import url from '../../services/url';
import { IProduct } from '../../interfaces/product';
import { IShopCategory } from '../../interfaces/category';

// blocks
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';

// widgets
import WidgetCategories from '../widgets/WidgetCategories';
import WidgetProducts from '../widgets/WidgetProducts';

// data stubs
import Products from '../../models/product';
import { IMAGE_FOLDER } from '../../environment';

export type ShopPageProductLayout = 'standard' | 'sidebar' | 'columnar';

export type ShopPageProductSidebarPosition = 'start' | 'end';

export interface ShopPageProductProps {
    layout?: ShopPageProductLayout;
    sidebarPosition?: ShopPageProductSidebarPosition;
    // data
    product: Products;
    relatedProducts: Products[];
    currentUrl: string;
}

function ShopPageProduct(props: ShopPageProductProps) {
    const {
        product,
        relatedProducts,
        layout = 'standard',
        sidebarPosition = 'start',
        currentUrl,
    } = props;

    const [categories, setCategories] = useState<IShopCategory[]>([]);
    const [latestProducts, setLatestProducts] = useState<IProduct[]>([]);

    // Load categories.
    useEffect(() => {
        let canceled = false;

        if (layout !== 'sidebar') {
            setCategories([]);
        } else {
            shopApi.getCategories({ depth: 1 }).then((categories) => {
                if (canceled) {
                    return;
                }

                setCategories(categories);
            });
        }

        return () => {
            canceled = true;
        };
    }, [layout]);

    // Load latest products.
    useEffect(() => {
        let canceled = false;

        if (layout !== 'sidebar') {
            setLatestProducts([]);
        } else {
            shopApi.getLatestProducts({ limit: 5 }).then((result) => {
                if (canceled) {
                    return;
                }

                setLatestProducts(result);
            });
        }

        return () => {
            canceled = true;
        };
    }, [layout]);

    const categoriesProduct = product.categories.map((row) => (
        row
    ));

    const breadcrumb = [
        { title: 'Trang chủ', url: url.home() },
        // { title: 'Shop', url: url.catalog() },
        // { title: product.product_name, url: url.product(product) },
    ];

    categoriesProduct.forEach((cate) => {
        breadcrumb.push({ title: cate.category_name, url: url.mainCat(cate.slug) });
    });

    breadcrumb.push({ title: product.product_name, url: url.productDetail(product.slug) });

    let content;

    if (layout === 'sidebar') {
        const sidebar = (
            <div className="shop-layout__sidebar">
                <div className="block block-sidebar">
                    <div className="block-sidebar__item">
                        <WidgetCategories categories={categories} location="shop" />
                    </div>
                    <div className="block-sidebar__item d-none d-lg-block">
                        <WidgetProducts title="Latest Products" products={latestProducts} />
                    </div>
                </div>
            </div>
        );

        content = (
            <div className="container">
                <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
                    {sidebarPosition === 'start' && sidebar}
                    <div className=" shop-layout__content">
                        <div className=" block">
                            <Product productInfo={product} layout={layout} />
                            <ProductTabs
                                withSidebar
                                descriptions={product.descriptions}
                                specifications={product.specifications}
                            />
                        </div>

                        {relatedProducts.length > 0 && (
                            <BlockProductsCarousel
                                title="Sản phẩm liên quan"
                                layout="grid-4-sm"
                                products={relatedProducts}
                                withSidebar
                            />
                        )}
                    </div>
                    {sidebarPosition === 'end' && sidebar}
                </div>
            </div>
        );
    } else {
        content = (
            <Fragment>
                <div className="block">
                    <div className="container">
                        <Product productInfo={product} layout={layout} />
                        <ProductTabs descriptions={product.descriptions} specifications={product.specifications} />
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <BlockProductsCarousel
                        title="Sản phẩm liên quan"
                        layout="grid-5"
                        products={relatedProducts}
                    />
                )}
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{`${product.product_name} | Cáp Xích Kim Tuấn Hùng`}</title>
                <meta name="title" content={`${product.product_name} - Kim Tuấn Hùng`} />
                <meta name="description" content={`${product.short_descriptions}`} />
                <meta name="image" content={IMAGE_FOLDER + product.thumbnail} />
                <meta name="keywords" content={`Cáp xích Kim Tuấn Hùng, Kim Tuấn Hùng, ${product.product_name}`} />
                <meta name="author" content="CÔNG TY TNHH TM-DV CÁP XÍCH KIM TUẤN HÙNG" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:title" content={`${product.product_name} - Kim Tuấn Hùng`} />
                <meta property="og:description" content={`${product.short_descriptions}`} />
                <meta property="og:image" content={IMAGE_FOLDER + product.thumbnail} />
                <link rel="amphtml" href={currentUrl} />
                <link rel="canonical" href={currentUrl} />
            </Head>

            <PageHeader breadcrumb={breadcrumb} />

            {content}
        </Fragment>
    );
}

export default ShopPageProduct;
