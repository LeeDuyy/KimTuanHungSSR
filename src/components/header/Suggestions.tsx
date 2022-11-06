// react
import { Fragment } from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from '../shared/AppLink';
import AsyncAction from '../shared/AsyncAction';
import Cart16Svg from '../../svg/cart-16.svg';
import CurrencyFormat from '../shared/CurrencyFormat';
import url from '../../services/url';
// import { IProduct } from '../../interfaces/product';
import { useCartAddItem } from '../../store/cart/cartHooks';
import Products from '../../models/product';
import { IMAGE_FOLDER, IMAGE_FOLDER_DEF } from '../../environment';

export interface SuggestionsProps {
    context: 'header' | 'mobile-header' | 'indicator';
    className?: string;
    products: Products[];
}

function Suggestions(props: SuggestionsProps) {
    const {
        context,
        className,
        products,
    } = props;
    const rootClasses = classNames(`suggestions suggestions--location--${context}`, className);
    const cartAddItem = useCartAddItem();

    const list = (products && products.map((product) => (
        <li key={product.product_id} className="suggestions__item">
            {product.images && product.images.length > 0 ? (
                <div className="suggestions__item-image product-image">
                    <div className="product-image__body">
                        <img className="product-image__img" src={`${IMAGE_FOLDER}${product.thumbnail}`} alt="" />
                    </div>
                </div>
            ) : (
                <div className="suggestions__item-image product-image">
                    <div className="product-image__body">
                        <img className="product-image__img" src={`${IMAGE_FOLDER_DEF}no-image.png`} alt="" />
                    </div>
                </div>
            )}
            <div className="suggestions__item-info">
                <AppLink href={url.productDetail(product.slug)} className="suggestions__item-name">
                    {product.product_name}
                </AppLink>
                <div className="suggestions__item-meta">
                    SKU:
                    {' '}
                    {product.sku}
                </div>
            </div>
            <div className="suggestions__item-price">
                {product.discount > 0
                    ? (
                        <Fragment>
                            <span className="product-card__new-price"><CurrencyFormat value={product.price_aft_discount} /></span>
                            {' '}
                            <span className="product-card__old-price"><CurrencyFormat value={product.price} /></span>
                        </Fragment>
                    ) : product.price === 0 && (
                        <Fragment>
                            <div className="product-card__prices zero-price">
                                Liên hệ
                            </div>
                        </Fragment>
                    )}
                {product.discount === 0 && product.price !== 0 && (
                    <Fragment>
                        <div className="product-card__prices">
                            <CurrencyFormat value={product.price} />
                        </div>
                    </Fragment>
                )}
            </div>
            {context === 'header' && (
                <div className="suggestions__item-actions">
                    <AsyncAction
                        action={() => cartAddItem(product)}
                        render={({ run, loading }) => (
                            <button
                                type="button"
                                onClick={run}
                                title="Add to cart"
                                className={classNames('btn btn-primary btn-sm btn-svg-icon', {
                                    'btn-loading': loading,
                                })}
                            >
                                <Cart16Svg />
                            </button>
                        )}
                    />
                </div>
            )}
        </li>
    )));

    return (
        <div className={rootClasses}>
            <ul className="suggestions__list">
                {list}
            </ul>
        </div>
    );
}

export default Suggestions;
