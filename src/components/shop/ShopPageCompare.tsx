// react
import { Fragment } from 'react';

// third-party
import classNames from 'classnames';
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import AsyncAction, { RenderFn } from '../shared/AsyncAction';
import CurrencyFormat from '../shared/CurrencyFormat';
import PageHeader from '../shared/PageHeader';
import Rating from '../shared/Rating';
import url from '../../services/url';
import { useCompare, useCompareRemoveItem } from '../../store/compare/compareHooks';

// data stubs
import { useCartAddItem } from '../../store/cart/cartHooks';
import { IMAGE_FOLDER, IMAGE_FOLDER_DEF } from '../../environment';

function ShopPageCompare() {
    const { items } = useCompare();
    const cartAddItem = useCartAddItem();
    const compareRemoveItem = useCompareRemoveItem();
    const breadcrumb = [
        { title: 'Trang Chủ', url: '/' },
        { title: 'So Sánh', url: '' },
    ];

    let content;

    if (items.length) {
        const attributes: {
            name: string;
            values: {[productId: number]: string};
        }[] = [];
        // items.forEach((product) => product.attributes.forEach((productAttribute) => {
        //     let attribute = attributes.find((x) => x.name === productAttribute.name);

        //     if (!attribute) {
        //         attribute = {
        //             name: productAttribute.name,
        //             values: {},
        //         };
        //         attributes.push(attribute);
        //     }

        //     attribute.values[product.id] = productAttribute.values.map((x) => x.name).join(', ');
        // }));

        const productInfoRow = items.map((product) => {
            let image;

            if (product.thumbnail) {
                image = (
                    <div className="compare-table__product-image product-image">
                        <div className="product-image__body">
                            <img className="product-image__img" src={`${IMAGE_FOLDER}${product.thumbnail}`} alt="" />
                        </div>
                    </div>
                );
            } else {
                image = (
                    <div className="compare-table__product-image product-image">
                        <div className="product-image__body">
                            <img className="product-image__img" src={`${IMAGE_FOLDER_DEF}no-image.jpg`} alt="" />
                        </div>
                    </div>
                );
            }

            return (
                <td key={product.product_id}>
                    <AppLink href={url.productDetail(product.slug)} className="compare-table__product-link">
                        {image}
                        <div className="compare-table__product-name">{product.product_name}</div>
                    </AppLink>
                </td>
            );
        });

        const ratingRow = items.map((product) => (
            <td key={product.category_id}>
                <div className="compare-table__product-rating">
                    <Rating value={product.total_rated} />
                </div>
                {/* <div className=" compare-table__product-rating-legend">
                    {`${product.reviews} Reviews`}
                </div> */}
            </td>
        ));

        const availabilityRow = items.map((product) => {
            let badge;

            if (product.stock_status_id === 1) {
                badge = <span className="compare-table__product-badge badge badge-success">{product.stock_status}</span>;
            } else if (product.stock_status_id === 2) {
                badge = <span className="compare-table__product-badge badge badge-warning">{product.stock_status}</span>;
            } else if (product.stock_status_id === 3) {
                badge = <span className="compare-table__product-badge badge badge-danger">{product.stock_status}</span>;
            } else if (product.stock_status_id === 4) {
                badge = <span className="compare-table__product-badge badge badge-secondary">{product.stock_status}</span>;
            }

            return <td key={product.product_id}>{badge}</td>;
        });

        const priceRow = items.map((product) => {
            let price;
            if (product.discount > 0) {
                price = (
                    <td key={product.product_id} className="product-card__prices">
                        <span className="product-card__new-price"><CurrencyFormat value={product.price_aft_discount} /></span>
                        {' '}
                        <span className="product-card__old-price"><CurrencyFormat value={product.price} /></span>
                    </td>
                );
            } else if (product.price === 0) {
                price = (
                    <td key={product.product_id} className="product-card__prices zero-price">
                        Liên hệ
                    </td>
                );
            } else {
                price = (
                    <td key={product.product_id} className="product-card__prices">
                        <CurrencyFormat value={product.price} />
                    </td>
                );
            }

            return price;
        });

        const addToCartRow = items.map((product) => {
            const renderButton: RenderFn = ({ run, loading }) => {
                const classes = classNames('btn btn-primary', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes}>Thêm vào giỏ</button>;
            };

            return (
                <td key={product.product_id}>
                    <AsyncAction
                        action={() => cartAddItem(product)}
                        render={renderButton}
                    />
                </td>
            );
        });

        const attributeRows = attributes.map((feature, index) => {
            const rows = items.map((product) => (
                <td key={product.product_id}>{feature.values[product.product_id]}</td>
            ));

            return (
                <tr key={index}>
                    <th>{feature.name}</th>
                    {rows}
                </tr>
            );
        });

        const removeRow = items.map((product) => {
            const renderButton: RenderFn = ({ run, loading }) => {
                const classes = classNames('btn btn-secondary btn-sm', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes}>Xóa</button>;
            };

            return (
                <td key={product.product_id}>
                    <AsyncAction
                        action={() => compareRemoveItem(product.product_id)}
                        render={renderButton}
                    />
                </td>
            );
        });

        content = (
            <div className="block">
                <div className="container">
                    <div className="table-responsive">
                        <table className="compare-table">
                            <tbody>
                                <tr>
                                    <th>Sản phẩm</th>
                                    {productInfoRow}
                                </tr>
                                <tr>
                                    <th>Đánh giá</th>
                                    {ratingRow}
                                </tr>
                                <tr>
                                    <th>Tình trạng</th>
                                    {availabilityRow}
                                </tr>
                                <tr>
                                    <th>Giá</th>
                                    {priceRow}
                                </tr>
                                <tr>
                                    <th>Thêm vào giỏ</th>
                                    {addToCartRow}
                                </tr>
                                {attributeRows}
                                <tr>
                                    <th aria-label="Remove" />
                                    {removeRow}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="block block-empty">
                <div className="container">
                    <div className="block-empty__body">
                        <div className="block-empty__message">Danh sách so sánh đang trống!</div>
                        <div className="block-empty__actions">
                            <AppLink href="/" className="btn btn-primary btn-sm">Quay lại trang chủ</AppLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>Bảng So Sánh | Kim Tuấn Hùng</title>
            </Head>

            <PageHeader header="Bảng So Sánh" breadcrumb={breadcrumb} />

            {content}
        </Fragment>
    );
}

export default ShopPageCompare;
