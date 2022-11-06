// react
import { Fragment } from 'react';

// third-party
import classNames from 'classnames';
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import AsyncAction, { RenderFn } from '../shared/AsyncAction';
import Cross12Svg from '../../svg/cross-12.svg';
import CurrencyFormat from '../shared/CurrencyFormat';
import PageHeader from '../shared/PageHeader';
import Rating from '../shared/Rating';
import url from '../../services/url';
import { useWishlist, useWishlistRemoveItem } from '../../store/wishlist/wishlistHooks';

// data stubs
import { useCartAddItem } from '../../store/cart/cartHooks';
import { IMAGE_FOLDER, IMAGE_FOLDER_DEF } from '../../environment';

function ShopPageWishlist() {
    const { items } = useWishlist();
    const wishlistRemoveItem = useWishlistRemoveItem();
    const cartAddItem = useCartAddItem();
    const breadcrumb = [
        { title: 'Trang Chủ', url: '/' },
        { title: 'Danh Sách Yêu Thích', url: '' },
    ];

    let content;

    if (items.length) {
        const itemsList = items.map((item) => {
            let image;

            if (item.images.length > 0) {
                image = (
                    <div className="product-image">
                        <AppLink href={url.productDetail(item.slug)} className="product-image__body">
                            <img className="product-image__img" src={`${IMAGE_FOLDER}${item.thumbnail}`} alt="" />
                        </AppLink>
                    </div>
                );
            } else {
                image = (
                    <div className="product-image">
                        <AppLink href={url.productDetail(item.slug)} className="product-image__body">
                            <img className="product-image__img" src={`${IMAGE_FOLDER_DEF}no-image.jpg`} alt="" />
                        </AppLink>
                    </div>
                );
            }

            const renderAddToCarButton: RenderFn = ({ run, loading }) => {
                const classes = classNames('btn btn-primary btn-sm', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes}>Thêm vào giỏ</button>;
            };

            const renderRemoveButton: RenderFn = ({ run, loading }) => {
                const classes = classNames('btn btn-light btn-sm btn-svg-icon', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes} aria-label="Remove"><Cross12Svg /></button>;
            };

            let price;
            if (item.discount > 0) {
                price = (
                    <Fragment>
                        <span className="product-card__new-price"><CurrencyFormat value={item.price_aft_discount} /></span>
                        {' '}
                        <span className="product-card__old-price"><CurrencyFormat value={item.price} /></span>
                    </Fragment>
                );
            } else if (item.price === 0) {
                price = (
                    <span key={item.product_id} className="product-card__prices zero-price">
                        Liên hệ
                    </span>
                );
            } else {
                price = (
                    <span key={item.product_id} className="product-card__prices">
                        <CurrencyFormat value={item.price} />
                    </span>
                );
            }

            let stockStatus;
            if (item.stock_status_id === 1) {
                stockStatus = (
                    <div className="badge badge-success">
                        {item.stock_status}
                    </div>
                );
            } else if (item.stock_status_id === 2) {
                stockStatus = (
                    <div className="badge badge-warning">
                        {item.stock_status}
                    </div>
                );
            } else if (item.stock_status_id === 3) {
                stockStatus = (
                    <div className="badge badge-danger">
                        {item.stock_status}
                    </div>
                );
            } else if (item.stock_status_id === 4) {
                stockStatus = (
                    <div className="badge badge-secondary">
                        {item.stock_status}
                    </div>
                );
            }

            return (
                <tr key={item.product_id} className="wishlist__row">
                    <td className="wishlist__column wishlist__column--image">
                        {image}
                    </td>
                    <td className="wishlist__column wishlist__column--product">
                        <AppLink href={url.product(item)} className="wishlist__product-name">
                            {item.product_name}
                        </AppLink>
                        <div className="wishlist__product-rating">
                            <Rating value={item.total_rated} />
                            {/* <div className="wishlist__product-rating-legend">{`${item.reviews} Reviews`}</div> */}
                        </div>
                    </td>
                    <td className="wishlist__column wishlist__column--stock">
                        {stockStatus}
                    </td>
                    <td className="wishlist__column wishlist__column--price">{price}</td>
                    <td className="wishlist__column wishlist__column--tocart">
                        <AsyncAction
                            action={() => cartAddItem(item)}
                            render={renderAddToCarButton}
                        />
                    </td>
                    <td className="wishlist__column wishlist__column--remove">
                        <AsyncAction
                            action={() => wishlistRemoveItem(item.product_id)}
                            render={renderRemoveButton}
                        />
                    </td>
                </tr>
            );
        });

        content = (
            <div className="block">
                <div className="container">
                    <table className="wishlist">
                        <thead className="wishlist__head">
                            <tr className="wishlist__row">
                                <th className="wishlist__column wishlist__column--image">Hình</th>
                                <th className="wishlist__column wishlist__column--product">Sản phẩm</th>
                                <th className="wishlist__column wishlist__column--stock">Trạng thái</th>
                                <th className="wishlist__column wishlist__column--price">Giá</th>
                                <th className="wishlist__column wishlist__column--tocart" aria-label="Thêm vào giỏ" />
                                <th className="wishlist__column wishlist__column--remove" aria-label="Xóa" />
                            </tr>
                        </thead>
                        <tbody className="wishlist__body">
                            {itemsList}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="block block-empty">
                <div className="container">
                    <div className="block-empty__body">
                        <div className="block-empty__message">Danh sách yêu thích đang trống!</div>
                        <div className="block-empty__actions">
                            <AppLink href="/" className="btn btn-primary btn-sm">
                                Quay lại trang chủ
                            </AppLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>Kim Tuấn Hùng | Danh Sách Yêu Thích</title>
            </Head>

            <PageHeader header="Danh Sách Yêu Thíc" breadcrumb={breadcrumb} />

            {content}
        </Fragment>
    );
}

export default ShopPageWishlist;
