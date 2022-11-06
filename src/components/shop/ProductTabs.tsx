// react
import { useState } from 'react';

// third-party
import classNames from 'classnames';

// application
import ProductTabDescription from './ProductTabDescription';
// import ProductTabSpecification from './ProductTabSpecification';
import ProductTabReviews from './ProductTabReviews';
import { Specification } from '../../models/product';

export interface ProductTabsProps {
    withSidebar?: boolean;
    descriptions: string,
    specifications: Specification[]
}

function ProductTabs(props: ProductTabsProps) {
    const {
        withSidebar = false,
        descriptions,
        specifications,
    } = props;
    const [currentTab, setCurrentTab] = useState('description');

    const classes = classNames('product-tabs', {
        'product-tabs--layout--sidebar': withSidebar,
    });

    const tabs = [
        { key: 'description', title: 'Mô tả', content: <ProductTabDescription descriptions={descriptions} specifications={specifications} /> },
        // { key: 'specification', title: 'Thông số Kỹ Thuật', content: <ProductTabSpecification /> },
        { key: 'reviews', title: 'Đánh giá', content: <ProductTabReviews /> },
    ];

    const tabsButtons = tabs.map((tab) => {
        const classes = classNames('product-tabs__item', {
            'product-tabs__item--active': currentTab === tab.key,
        });

        return (
            <button
                key={tab.key}
                type="button"
                onClick={() => setCurrentTab(tab.key)}
                className={classes}
            >
                {tab.title}
            </button>
        );
    });

    const tabsContent = tabs.map((tab) => {
        const classes = classNames('product-tabs__pane', {
            'product-tabs__pane--active': currentTab === tab.key,
        });

        return <div key={tab.key} className={classes}>{tab.content}</div>;
    });

    return (
        <div className={classes}>
            <div className="product-tabs__list">
                {tabsButtons}
            </div>
            <div className="product-tabs__content">
                {tabsContent}
            </div>
        </div>
    );
}

export default ProductTabs;
