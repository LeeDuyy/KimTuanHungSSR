// third-party
import classNames from 'classnames';

// application
import AppLink from '../shared/AppLink';
import { INestedLink } from '../../interfaces/menus/link';
import url from '../../services/url';

export interface MegamenuLinksProps {
    links: INestedLink[];
    depth?: number;
}

function MegamenuLinks(props: MegamenuLinksProps) {
    const { links, depth = 0 } = props;

    const linksList = links.map((link, index) => {
        let title = null;
        let subLinks = null;

        if (link.title) {
            if (link.url !== undefined) {
                title = <AppLink href={url.mainCat(link.url)}>{link.title}</AppLink>;
            }
        }

        if (link.links && link.links.length) {
            subLinks = <MegamenuLinks links={link.links} depth={depth + 1} />;
        }

        const classes = classNames('megamenu__item', {
            'megamenu__item--with-submenu': subLinks,
        });

        return (
            <li key={index} className={classes}>
                {title}
                {subLinks}
            </li>
        );
    });

    return (
        <ul className={`megamenu__links megamenu__links--level--${depth}`}>
            {linksList}
        </ul>
    );
}

export default MegamenuLinks;
