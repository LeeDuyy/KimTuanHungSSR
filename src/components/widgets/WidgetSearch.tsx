// application
import { useState } from 'react';
import { ISearchParam } from '../../interfaces/searchParam';
import { useSearch, useSearchPost } from '../../store/search/searchHook';
import Search20Svg from '../../svg/search-20.svg';

function WidgetSearch() {
    const [keyword, setKeyword] = useState('');
    const searchPost = useSearchPost();
    const search = useSearch();

    const onSearchEvent = () => {
        const searchParam: ISearchParam = {
            categoryId: 0,
            menuSlug: search.searchParam.menuSlug,
            keyword,
        };
        searchPost(searchParam);
    };

    const onHandleInput = (event: any) => {
        setKeyword(event.target.value);
    };

    const onSearchPost = (event: any) => {
        if (event.which === 13) {
            onSearchEvent();
        }
    };

    return (
        <div className="widget-search">
            <form className="widget-search__body">
                <input
                    className="widget-search__input"
                    placeholder="Tìm kiếm bài viết..."
                    type="text"
                    autoComplete="off"
                    spellCheck="false"
                    onChange={onHandleInput}
                    onKeyDown={onSearchPost}
                />
                <button className="widget-search__button" type="button" onClick={onSearchEvent}>
                    <Search20Svg />
                </button>
            </form>
        </div>
    );
}

export default WidgetSearch;
