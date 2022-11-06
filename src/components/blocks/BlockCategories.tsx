// application
import AppLink from '../shared/AppLink';
import BlockHeader from '../shared/BlockHeader';
// import url from '../../services/url';
// import { ICategory } from '../../interfaces/category';
import Category from '../../models/category';
import { IMAGE_FOLDER } from '../../environment';
import url from '../../services/url';

export type BlockCategoriesLayout = 'classic' | 'compact';

export interface BlockCategoriesProps {
    title: string;
    categories?: Category[];
    layout?: BlockCategoriesLayout;
}

function BlockCategories(props: BlockCategoriesProps) {
    const { title, layout = 'classic', categories = [] } = props;
    const categoriesList = categories.map((category, index) => {
        const classes = `block-categories__item category-card category-card--layout--${layout}`;
        const { subs }: { subs?: Category[] } = category;

        const subcategories = subs && subs.map((sub, subIndex) => (
            <li key={subIndex}>
                <AppLink href={url.mainCat(sub.slug)}>{sub.category_name}</AppLink>
            </li>
        ));

        return (
            <div key={index} className={classes}>
                <div className=" category-card__body">
                    <div className=" category-card__image">
                        <AppLink href={url.mainCat(category.slug)}>
                            <img src={IMAGE_FOLDER + category.image} alt="" />
                        </AppLink>
                    </div>
                    <div className=" category-card__content">
                        <div className=" category-card__name">
                            <AppLink href={url.mainCat(category.slug)}>{category.category_name}</AppLink>
                        </div>
                        <ul className="category-card__links">
                            {subcategories}
                        </ul>
                        {/* <div className="category-card__all">
                            <AppLink href={url.category(category)}>Show All</AppLink>
                        </div>
                        <div className="category-card__products">
                            {`${category.items} Products`}
                        </div> */}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className={`block block--highlighted block-categories block-categories--layout--${layout}`}>
            <div className="container">
                <BlockHeader title={title} />

                <div className="block-categories__list">
                    {categoriesList}
                </div>
            </div>
        </div>
    );
}

export default BlockCategories;
