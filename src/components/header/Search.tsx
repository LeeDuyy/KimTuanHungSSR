/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
// react
import {
    ChangeEvent,
    KeyboardEvent,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

// third-party
import classNames from 'classnames';
import { useRouter } from 'next/router';

// application
import Cross20Svg from '../../svg/cross-20.svg';
import Search20Svg from '../../svg/search-20.svg';
// import shopApi, { GetSuggestionsOptions } from '../../api/shop';
// import { ICategory } from '../../interfaces/category';
// import { IProduct } from '../../interfaces/product';
import Suggestions from './Suggestions';
import Category from '../../models/category';
import { GetCategoryMobileSideBar } from '../../repository/category';
import { GetProductList } from '../../repository/product';
import { IListOptions } from '../../interfaces/list';
import Products from '../../models/product';

// type CategoryWithDepth = ICategory & {depth: number};
type CategoryWithDepth = Category & { depth: number };

function useCategories() {
    // const [categories, setCategories] = useState<CategoryWithDepth[]>([]);
    const [categories, setCategories] = useState<CategoryWithDepth[]>([]);

    useMemo(async () => {
        // let canceled = false;

        const treeToList = (categories: Category[], depth = 0): CategoryWithDepth[] => (
            categories.reduce(
                (result: CategoryWithDepth[], category) => [
                    ...result,
                    { depth, ...category },
                    ...treeToList(category.children || [], depth + 1),
                ],
                [],
            )
        );

        const responseMobile: Category[] = await GetCategoryMobileSideBar();
        setCategories(treeToList(responseMobile));
        // shopApi.getCategories({ depth: 1 }).then((categories: ICategory[]) => {
        //     if (canceled) {
        //         return;
        //     }

        //     setCategories(treeToList(categories));
        // });

        // return () => {
        //     canceled = true;
        // };
    }, [setCategories]);

    return categories;
}

export interface SearchProps {
    context: 'header' | 'mobile-header' | 'indicator';
    className?: string;
    inputRef?: RefObject<HTMLInputElement>;
    onClose?: () => void;
}

function Search(props: SearchProps) {
    const {
        context,
        className,
        inputRef,
        onClose,
    } = props;
    const [cancelFn, setCancelFn] = useState(() => () => { });
    const [suggestionsOpen, setSuggestionsOpen] = useState(false);
    const [hasSuggestions, setHasSuggestions] = useState(false);
    const [suggestedProducts, setSuggestedProducts] = useState<Products[]>([]);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('-1');
    const categories = useCategories();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const close = useCallback(() => {
        if (onClose) {
            onClose();
        }

        setSuggestionsOpen(false);
    }, [onClose]);

    // Close suggestions when the location has been changed.
    useEffect(() => close(), [close, router.asPath]);

    // Close suggestions when a click has been made outside component.
    useEffect(() => {
        const onGlobalClick = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as HTMLElement)) {
                close();
            }
        };

        document.addEventListener('mousedown', onGlobalClick);

        return () => document.removeEventListener('mousedown', onGlobalClick);
    }, [close]);

    // Cancel previous typing.
    useEffect(() => () => cancelFn(), [cancelFn]);

    const handleFocus = () => {
        setSuggestionsOpen(true);
    };

    const handleChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        // let canceled = false;
        let timer: ReturnType<typeof setTimeout>;

        const newCancelFn = () => {
            // canceled = true;
            clearTimeout(timer);
        };

        const query = event.target.value;

        setQuery(query);

        if (query === '') {
            setHasSuggestions(false);
        } else {
            timer = setTimeout(async () => {
                const option: IListOptions = {
                    categoryId: Number(category),
                    keyword: query,
                    sort: -1,
                    limit: 18,
                    page: 1,
                };

                const products = await GetProductList(option, {});

                setSuggestedProducts(products);
                setHasSuggestions(products.length > 0);
                setSuggestionsOpen(true);

                // const options: GetSuggestionsOptions = { limit: 5 };

                // if (category !== '-1') {
                //     options.category = category;
                // }

                // shopApi.getSuggestions(query, options).then((products) => {
                //     if (canceled) {
                //         return;
                //     }

                //     setSuggestedProducts(products);
                //     setHasSuggestions(products.length > 0);
                //     setSuggestionsOpen(true);
                // });
            }, 500);
        }

        setCancelFn(() => newCancelFn);
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (!document.activeElement || document.activeElement === document.body) {
                return;
            }

            // Close suggestions if the focus received an external element.
            if (wrapperRef.current && !wrapperRef.current.contains(document.activeElement)) {
                close();
            }
        }, 10);
    };

    // Close suggestions when the Escape key has been pressed.
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        // Escape.
        if (event.which === 27) {
            close();
        }
    };

    const rootClasses = classNames(`search search--location--${context}`, className, {
        'search--suggestions-open': suggestionsOpen,
        'search--has-suggestions': hasSuggestions,
    });

    const closeButton = context !== 'mobile-header' ? '' : (
        <button className="search__button search__button--type--close" type="button" onClick={close}>
            <Cross20Svg />
        </button>
    );

    const categoryOptions = categories.map((category, idx) => (
        <option key={idx} value={category.categoryId}>
            {'\u00A0'.repeat(4 * category.depth)}
            {category.label}
        </option>
    ));

    return (
        <div className={rootClasses} ref={wrapperRef} onBlur={handleBlur}>
            <div className="search__body">
                <div className="search__form">
                    {context === 'header' && (
                        <select
                            className="search__categories"
                            aria-label="Category"
                            value={category}
                            onFocus={close}
                            onChange={handleChangeCategory}
                        >
                            <option value="-1">Tất Cả Danh Mục</option>
                            {categoryOptions}
                        </select>
                    )}
                    <input
                        ref={inputRef}
                        onChange={handleChangeQuery}
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        value={query}
                        className="search__input"
                        name="search"
                        placeholder="Tìm kiếm sản phẩm"
                        aria-label="Site search"
                        type="text"
                        autoComplete="off"
                    />
                    {/* <button className="search__button search__button--type--submit" type="submit">
                        <Search20Svg />
                    </button> */}
                    {closeButton}
                    <div className="search__border" />
                </div>
                <Suggestions className="search__suggestions" context={context} products={suggestedProducts} />
            </div>
        </div>
    );
}

export default Search;
