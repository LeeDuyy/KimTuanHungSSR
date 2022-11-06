/* eslint-disable @typescript-eslint/no-unused-vars */
// react
import { Fragment } from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from '../shared/AppLink';
import ArrowRoundedLeft6x9Svg from '../../svg/arrow-rounded-left-6x9.svg';
import url from '../../services/url';
import { getCategoryParents } from '../../services/helpers';
import { ICategoryFilter } from '../../interfaces/filter';

export interface FilterCheckProps {
    data: ICategoryFilter;
}

function FilterCategory(props: FilterCheckProps) {
    const { data } = props;

    let categoriesList;
    if (data.items !== undefined) {
        if (data.items[0].sibblings !== undefined) {
            categoriesList = data.items[0].sibblings.map((category) => {
                const itemClasses = classNames('filter-categories__item', {
                    'filter-categories__item--current': data.value === category.slug,
                });
                return (
                    <Fragment key={category.category_id}>
                        <li className={itemClasses}>
                            <AppLink href={url.mainCat(category.slug)}>{category.category_name}</AppLink>
                        </li>
                        {
                            data.items && data.items[0].children
                            && (
                                data.items[0].children.map((child) => (
                                    category.category_id === child.parent_id
                                    && (
                                        <li key={child.category_id} className="filter-categories__item filter-categories__item--child">
                                            <AppLink href={url.mainCat(child.slug)}>{child.category_name}</AppLink>
                                        </li>
                                    )
                                ))
                            )
                        }
                        {/* <li className="filter-categories__item filter-categories__item--child">
                            <AppLink href={url.category(child)}>{child.name}</AppLink>
                        </li> */}
                    </Fragment>
                    // <Fragment key={category.id}>
                    //     {getCategoryParents(category).map((parent) => (
                    //         <li key={parent.id} className="filter-categories__item filter-categories__item--parent">
                    //             <ArrowRoundedLeft6x9Svg className="filter-categories__arrow" />
                    //             <AppLink href={url.category(parent)}>{parent.name}</AppLink>
                    //         </li>
                    //     ))}
                    //     <li className={itemClasses}>
                    //         <AppLink href={url.category(category)}>{category.name}</AppLink>
                    //     </li>
                    //     {category.children && category.children.map((child) => (
                    //         <li key={child.id} className="filter-categories__item filter-categories__item--child">
                    //             <AppLink href={url.category(child)}>{child.name}</AppLink>
                    //         </li>
                    //     ))}
                    // </Fragment>
                );
            });
        }
    }

    // if (data.value) {
    //     categoriesList.unshift(
    //         <li key="[shop]" className="filter-categories__item filter-categories__item--parent">
    //             <ArrowRoundedLeft6x9Svg className="filter-categories__arrow" />
    //             <AppLink href={url.catalog()}>All Products</AppLink>
    //         </li>,
    //     );
    // }

    return (
        <div className="filter-categories">
            <ul className="filter-categories__list">
                {categoriesList}
            </ul>
        </div>
    );
}

export default FilterCategory;
