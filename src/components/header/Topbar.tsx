// third-party
import { useMemo, useState } from 'react';
import { GetMenuTop } from '../../repository/menus';
import url from '../../services/url';

// application
import AppLink from '../shared/AppLink';

function Topbar() {
    const [links, setLinks] = useState<any[]>([]);

    useMemo(async () => {
        const menuTop = await GetMenuTop();
        setLinks(menuTop);
    }, []);

    const linksList = links.map((item, index) => (
        <div key={index} className="topbar__item topbar__item--link">
            <AppLink href={url.mainMenu(item.slug)} className="topbar-link">{item.title}</AppLink>
        </div>
    ));

    return (
        <div className="site-header__topbar topbar">
            <div className="topbar__container container">
                <div className="topbar__row">
                    {linksList}
                </div>
            </div>
        </div>
    );
}

export default Topbar;
