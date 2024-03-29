/* eslint-disable max-len */
// react
import { Fragment, memo } from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from './AppLink';
import AsyncAction from './AsyncAction';
import Compare16Svg from '../../svg/compare-16.svg';
import CurrencyFormat from './CurrencyFormat';
import Quickview16Svg from '../../svg/quickview-16.svg';
import Rating from './Rating';
import url from '../../services/url';
import Wishlist16Svg from '../../svg/wishlist-16.svg';
// import { IProduct } from '../../interfaces/product';
import { useCompareAddItem } from '../../store/compare/compareHooks';
import { useQuickviewOpen } from '../../store/quickview/quickviewHooks';
import { useWishlistAddItem } from '../../store/wishlist/wishlistHooks';
import { useCartAddItem } from '../../store/cart/cartHooks';
import Products from '../../models/product';
import { IMAGE_FOLDER, IMAGE_FOLDER_DEF } from '../../environment';

export type ProductCardLayout = 'grid-sm' | 'grid-nl' | 'grid-lg' | 'list' | 'horizontal';

export interface ProductCardProps {
    product: Products;
    // product: IProduct;
    layout?: ProductCardLayout;
}

function ProductCard(props: ProductCardProps) {
    const { product, layout } = props;
    const containerClasses = classNames('product-card', {
        'product-card--layout--grid product-card--size--sm': layout === 'grid-sm',
        'product-card--layout--grid product-card--size--nl': layout === 'grid-nl',
        'product-card--layout--grid product-card--size--lg': layout === 'grid-lg',
        'product-card--layout--list': layout === 'list',
        'product-card--layout--horizontal': layout === 'horizontal',
    });
    const cartAddItem = useCartAddItem();
    const wishlistAddItem = useWishlistAddItem();
    const compareAddItem = useCompareAddItem();
    const quickviewOpen = useQuickviewOpen();

    const badges = [];
    let image;
    let price;
    let features;

    // if (product.badges.includes('sale')) {
    //     badges.push(<div key="sale" className="product-card__badge product-card__badge--sale">Sale</div>);
    // }
    // if (product.badges.includes('hot')) {
    //     badges.push(<div key="hot" className="product-card__badge product-card__badge--hot">Hot</div>);
    // }
    // if (product.badges.includes('new')) {
    //     badges.push(<div key="new" className="product-card__badge product-card__badge--new">New</div>);
    // }
    if (product.is_saleoff) {
        badges.push(<div key="sale" className="product-card__badge product-card__badge--sale">Sale</div>);
    }
    if (product.is_hot) {
        badges.push(<div key="hot" className="product-card__badge product-card__badge--hot">Hot</div>);
    }
    if (product.is_new) {
        badges.push(<div key="new" className="product-card__badge product-card__badge--new">New</div>);
    }

    if (product.images && product.images.length > 0) {
        image = (
            <div className="product-card__image product-image">
                <AppLink href={url.productDetail(product.slug)} className="product-image__body">
                    <img className="product-image__img" src={IMAGE_FOLDER + product.thumbnail} alt={product.product_name} />
                </AppLink>
            </div>
        );
    } else {
        image = (
            <div className="product-card__image product-image">
                <AppLink href={url.productDetail(product.slug)} className="product-image__body">
                    <img className="product-image__img" src={`${IMAGE_FOLDER_DEF}no-image.png`} alt={product.product_name} />
                </AppLink>
            </div>
        );
    }

    if (product.discount > 0) {
        price = (
            <div className="product-card__prices">
                <span className="product-card__new-price"><CurrencyFormat value={product.price_aft_discount} /></span>
                {' '}
                <span className="product-card__old-price"><CurrencyFormat value={product.price} /></span>
            </div>
        );
    } else if (product.price === 0) {
        price = (
            <div className="product-card__prices zero-price">
                Liên hệ
            </div>
        );
    } else {
        price = (
            <div className="product-card__prices">
                <CurrencyFormat value={product.price} />
            </div>
        );
    }

    let stockStatus;
    if (product.stock_status_id === 1) {
        stockStatus = (
            <span className="text-success">
                {product.stock_status}
            </span>
        );
    } else if (product.stock_status_id === 2) {
        stockStatus = (
            <span className="text-warning">
                {product.stock_status}
            </span>
        );
    } else if (product.stock_status_id === 3) {
        stockStatus = (
            <span className="text-danger">
                {product.stock_status}
            </span>
        );
    } else if (product.stock_status_id === 4) {
        stockStatus = (
            <span className="text-secondary">
                {product.stock_status}
            </span>
        );
    }

    if (product.specifications !== null) {
        features = (
            <ul className="product-card__features-list">
                {
                    product.specifications.map((spec: any, index) => (
                        <li key={index}>{`${spec.attribute}: ${spec.value}.`}</li>
                    ))
                }
            </ul>
        );
    }

    return (
        <div className={containerClasses}>
            <AsyncAction
                action={() => quickviewOpen(product.slug)}
                render={({ run, loading }) => (
                    <button
                        type="button"
                        onClick={run}
                        className={classNames('product-card__quickview', {
                            'product-card__quickview--preload': loading,
                        })}
                    >
                        <Quickview16Svg />
                    </button>
                )}
            />
            {badges.length > 0 && (
                <div className="product-card__badges-list">{badges}</div>
            )}
            {image}
            <div className="product-card__info">
                <div className="product-card__name">
                    <AppLink href={url.productDetail(product.slug)}>{product.product_name}</AppLink>
                </div>
                <div className="product-card__rating">
                    <Rating value={product.rating_star} />
                    {
                        product.total_rated
                        && (
                            <div className=" product-card__rating-legend">{`${product.total_rated}`}</div>
                        )
                    }
                </div>
                {features}
            </div>
            <div className="product-card__actions">
                <div className="product-card__availability">
                    Trạng thái:
                    {' '}
                    {stockStatus}
                    {/* <span className="text-success">In Stock</span> */}
                </div>
                {price}
                <div className="product-card__buttons">
                    <AsyncAction
                        action={() => cartAddItem(product)}
                        render={({ run, loading }) => (
                            <Fragment>
                                <button
                                    type="button"
                                    onClick={run}
                                    className={classNames('btn btn-primary product-card__addtocart', {
                                        'btn-loading': loading,
                                    })}
                                >
                                    Thêm vào giỏ
                                </button>
                                <button
                                    type="button"
                                    onClick={run}
                                    className={classNames('btn btn-secondary product-card__addtocart product-card__addtocart--list', {
                                        'btn-loading': loading,
                                    })}
                                >
                                    Thêm vào giỏ
                                </button>
                            </Fragment>
                        )}
                    />
                    <AsyncAction
                        action={() => wishlistAddItem(product)}
                        render={({ run, loading }) => (
                            <button
                                type="button"
                                onClick={run}
                                className={classNames('btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist', {
                                    'btn-loading': loading,
                                })}
                            >
                                <Wishlist16Svg />
                            </button>
                        )}
                    />
                    <AsyncAction
                        action={() => compareAddItem(product)}
                        render={({ run, loading }) => (
                            <button
                                type="button"
                                onClick={run}
                                className={classNames('btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__compare', {
                                    'btn-loading': loading,
                                })}
                            >
                                <Compare16Svg />
                            </button>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default memo(ProductCard);
