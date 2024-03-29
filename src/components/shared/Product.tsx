/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
// react
import { useEffect, useState } from 'react';

// third-party
import classNames from 'classnames';

// application
// import AppLink from './AppLink';
import AsyncAction from './AsyncAction';
import Compare16Svg from '../../svg/compare-16.svg';
import CurrencyFormat from './CurrencyFormat';
import InputNumber from './InputNumber';
import ProductGallery from './ProductGallery';
import Rating from './Rating';
import Wishlist16Svg from '../../svg/wishlist-16.svg';
// import { IProduct } from '../../interfaces/product';
import { useCompareAddItem } from '../../store/compare/compareHooks';
import { useWishlistAddItem } from '../../store/wishlist/wishlistHooks';
import { useCartAddItem } from '../../store/cart/cartHooks';
import Products from '../../models/product';

export type ProductLayout = 'standard' | 'sidebar' | 'columnar' | 'quickview';

export interface ProductProps {
    productInfo: Products;
    // product: IProduct;
    layout: ProductLayout;
}

declare global {
    interface Window {
        FB: any;
    }
}

function initFacebookSdk() {
    if (window.FB) {
        window.FB.XFBML.parse();
    }

    // load facebook sdk script
    const facebookScript = document.createElement('script');
    facebookScript.async = true;
    facebookScript.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v12.0&appId=624480075233868&autoLogAppEvents=1';
    document.body.appendChild(facebookScript);
}

function Product(props: ProductProps) {
    const { productInfo, layout } = props;
    const [quantity, setQuantity] = useState<number | string>(1);
    const cartAddItem = useCartAddItem();
    const wishlistAddItem = useWishlistAddItem();
    const compareAddItem = useCompareAddItem();

    let currentUrl = '';

    if (typeof window !== 'undefined') {
        currentUrl = window.location.href;
    }

    useEffect(() => {
        initFacebookSdk();
    }, [currentUrl]);

    const addToCart = () => {
        if (typeof quantity === 'string') {
            return Promise.resolve();
        }

        return cartAddItem(productInfo, [], quantity);
    };

    let prices;

    if (productInfo.discount > 0) {
        prices = (
            <div className="product-card__prices">
                <span className="product-card__new-price"><CurrencyFormat value={productInfo.price} /></span>
                {' '}
                <span className="product-card__old-price"><CurrencyFormat value={productInfo.price_aft_discount} /></span>
            </div>
        );
    } else if (productInfo.price === 0) {
        prices = (
            <div className="product-card__prices zero-price">
                Liên hệ
            </div>
        );
    } else {
        prices = (
            <div className="product-card__prices">
                <CurrencyFormat value={productInfo.price} />
            </div>
        );
    }

    let stockStatus;
    if (productInfo.stock_status_id === 1) {
        stockStatus = (
            <span className="text-success">
                {productInfo.stock_status}
            </span>
        );
    } else if (productInfo.stock_status_id === 2) {
        stockStatus = (
            <span className="text-warning">
                {productInfo.stock_status}
            </span>
        );
    } else if (productInfo.stock_status_id === 3) {
        stockStatus = (
            <span className="text-danger">
                {productInfo.stock_status}
            </span>
        );
    } else if (productInfo.stock_status_id === 4) {
        stockStatus = (
            <span className="text-secondary">
                {productInfo.stock_status}
            </span>
        );
    }

    let tagList;
    if (productInfo.tags) {
        tagList = productInfo.tags.map((item, index) => (
            <a key={index} href="#">{item.tag_name}</a>
        ));
    }

    let images: string[] = [];
    if (productInfo.images !== undefined) {
        images = productInfo.images.map((row) => (
            row.image_name
        ));
    }

    return (
        <div className={`product product--layout--${layout}`}>
            <div className="product__content">
                <ProductGallery layout={layout} images={images} />

                <div className="product__info">
                    <div className="product__wishlist-compare">
                        <AsyncAction
                            action={() => wishlistAddItem(productInfo)}
                            render={({ run, loading }) => (
                                <button
                                    type="button"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Wishlist"
                                    onClick={run}
                                    className={classNames('btn btn-sm btn-light btn-svg-icon', {
                                        'btn-loading': loading,
                                    })}
                                >
                                    <Wishlist16Svg />
                                </button>
                            )}
                        />
                        <AsyncAction
                            action={() => compareAddItem(productInfo)}
                            render={({ run, loading }) => (
                                <button
                                    type="button"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Compare"
                                    onClick={run}
                                    className={classNames('btn btn-sm btn-light btn-svg-icon', {
                                        'btn-loading': loading,
                                    })}
                                >
                                    <Compare16Svg />
                                </button>
                            )}
                        />
                    </div>
                    <h1 className="product__name">{productInfo.product_name}</h1>
                    <div className="product__rating">
                        <div className="product__rating-stars">
                            <Rating value={productInfo.rating_star} />
                        </div>
                        {/* <div className="product__rating-legend">
                            <AppLink href="/">{`${product.reviews} Reviews`}</AppLink>
                            <span>/</span>
                            <AppLink href="/">Write A Review</AppLink>
                        </div> */}
                    </div>
                    <div className="product__description">
                        {productInfo.short_descriptions}
                    </div>
                    {/* <ul className="product__features">
                        <li>Speed: 750 RPM</li>
                        <li>Power Source: Cordless-Electric</li>
                        <li>Battery Cell Type: Lithium</li>
                        <li>Voltage: 20 Volts</li>
                        <li>Battery Capacity: 2 Ah</li>
                    </ul> */}
                    <ul className="product__meta">
                        <li className="product__meta-availability">
                            Trạng thái:
                            {' '}
                            {stockStatus}
                        </li>
                        <li>
                            Thương hiệu:
                            {' '}
                            <a>
                                {
                                    productInfo.brand !== ''
                                        ? productInfo.brand
                                        : 'Đang cập nhật.'
                                }
                            </a>
                        </li>
                        <li>
                            SKU:
                            {' '}
                            {productInfo.sku}
                        </li>
                    </ul>
                </div>

                <div className="product__sidebar">
                    {/* <div className="product__availability">
                        Availability:
                        {' '}
                        <span className="text-success">In Stock</span>
                    </div> */}

                    <div className="product__prices">
                        {prices}
                    </div>

                    <form className="product__options">
                        {/* <div className="form-group product__option">
                            <div className="product__option-label">Color</div>
                            <div className="input-radio-color">
                                <div className="input-radio-color__list">
                                    <label
                                        className="input-radio-color__item input-radio-color__item--white"
                                        style={{ color: '#fff' }}
                                        data-toggle="tooltip"
                                        title="White"
                                    >
                                        <input type="radio" name="color" />
                                        <span />
                                    </label>
                                    <label
                                        className="input-radio-color__item"
                                        style={{ color: '#ffd333' }}
                                        data-toggle="tooltip"
                                        title="Yellow"
                                    >
                                        <input type="radio" name="color" />
                                        <span />
                                    </label>
                                    <label
                                        className="input-radio-color__item"
                                        style={{ color: '#ff4040' }}
                                        data-toggle="tooltip"
                                        title="Red"
                                    >
                                        <input type="radio" name="color" />
                                        <span />
                                    </label>
                                    <label
                                        className="input-radio-color__item input-radio-color__item--disabled"
                                        style={{ color: '#4080ff' }}
                                        data-toggle="tooltip"
                                        title="Blue"
                                    >
                                        <input type="radio" name="color" disabled />
                                        <span />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group product__option">
                            <div className="product__option-label">Material</div>
                            <div className="input-radio-label">
                                <div className="input-radio-label__list">
                                    <label>
                                        <input type="radio" name="material" />
                                        <span>Metal</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="material" />
                                        <span>Wood</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="material" disabled />
                                        <span>Plastic</span>
                                    </label>
                                </div>
                            </div>
                        </div> */}
                        <div className="form-group product__option">
                            <label htmlFor="product-quantity" className="product__option-label">Số lượng</label>
                            <div className="product__actions">
                                <div className="product__actions-item">
                                    <InputNumber
                                        id="product-quantity"
                                        aria-label="Quantity"
                                        className="product__quantity"
                                        size="lg"
                                        min={1}
                                        value={quantity}
                                        onChange={setQuantity}
                                    />
                                </div>
                                <div className="product__actions-item product__actions-item--addtocart">
                                    <AsyncAction
                                        action={() => addToCart()}
                                        render={({ run, loading }) => (
                                            <button
                                                type="button"
                                                onClick={run}
                                                disabled={!quantity}
                                                className={classNames('btn btn-primary btn-lg', {
                                                    'btn-loading': loading,
                                                })}
                                            >
                                                Thêm vào giỏ
                                            </button>
                                        )}
                                    />
                                </div>
                                <div className="product__actions-item product__actions-item--wishlist">
                                    <AsyncAction
                                        action={() => wishlistAddItem(productInfo)}
                                        render={({ run, loading }) => (
                                            <button
                                                type="button"
                                                data-toggle="tooltip"
                                                title="Wishlist"
                                                onClick={run}
                                                className={classNames('btn btn-secondary btn-svg-icon btn-lg', {
                                                    'btn-loading': loading,
                                                })}
                                            >
                                                <Wishlist16Svg />
                                            </button>
                                        )}
                                    />
                                </div>
                                <div className="product__actions-item product__actions-item--compare">
                                    <AsyncAction
                                        action={() => compareAddItem(productInfo)}
                                        render={({ run, loading }) => (
                                            <button
                                                type="button"
                                                data-toggle="tooltip"
                                                title="Compare"
                                                onClick={run}
                                                className={classNames('btn btn-secondary btn-svg-icon btn-lg', {
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
                    </form>
                </div>

                <div className="product__footer">
                    <div className="product__tags tags">
                        <div className="tags__list">
                            <strong style={{ display: 'flex', alignItems: 'center' }}>
                                <i className="footer-contacts__icon fas fa-tags" />
                                Tags:
                            </strong>
                            {' '}
                            {tagList}
                            {/* <AppLink href="/">Mounts</AppLink>
                            <AppLink href="/">Electrodes</AppLink>
                            <AppLink href="/">Chainsaws</AppLink> */}
                        </div>
                    </div>

                    <div className="product__share-links share-links">
                        <ul className="share-links__list">
                            <li className="share-links__item share-links__item--type--like">
                                <div
                                    className="fb-like"
                                    data-href={currentUrl}
                                    data-width=""
                                    data-layout="button"
                                    data-action="like"
                                    data-size="small"
                                    data-share="true"
                                />
                            </li>
                        </ul>
                    </div>

                    {/* <div className="product__share-links share-links">
                        <ul className="share-links__list">
                            <li className="share-links__item share-links__item--type--like">
                                <AppLink href="/">Like</AppLink>
                            </li>
                            <li className="share-links__item share-links__item--type--tweet">
                                <AppLink href="/">Tweet</AppLink>
                            </li>
                            <li className="share-links__item share-links__item--type--pin">
                                <AppLink href="/">Pin It</AppLink>
                            </li>
                            <li className="share-links__item share-links__item--type--counter">
                                <AppLink href="/">4K</AppLink>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Product;
