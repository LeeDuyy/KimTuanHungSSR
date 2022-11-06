/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
// third-party
import classNames from 'classnames';

// data stubs
// import theme from '../../data/theme';
import { useConfig } from '../../store/config/configHook';

export type SocialLinksShape = 'circle' | 'rounded';

export interface SocialLinksProps {
    shape?: SocialLinksShape;
    className?: string;
}

function SocialLinks(props: SocialLinksProps) {
    const { shape, className } = props;
    const config = useConfig();
    const classes = classNames(className, 'social-links', {
        'social-links--shape--circle': shape === 'circle',
        'social-links--shape--rounded': shape === 'rounded',
    });

    const items = [
        { type: 'facebook', url: config?.facebook, icon: 'fab fa-facebook-f' },
        { type: 'youtube', url: config?.youtube, icon: 'fab fa-youtube' },
        { type: 'instagram', url: config?.instagram, icon: 'fab fa-instagram' },
        // { type: 'twitter', url: theme.author.profile_url, icon: 'fab fa-twitter' },
        // { type: 'rss', url: theme.author.profile_url, icon: 'fas fa-rss' },
    ].map((item) => {
        if (item.url !== '') {
            return (
                <li key={item.type} className="social-links__item">
                    <a
                        className={`social-links__link social-links__link--type--${item.type}`}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className={item.icon} />
                    </a>
                </li>
            );
        }

        return (
            <li key={item.type} className="social-links__item">
                <a
                    className={`social-links__link social-links__link--type--${item.type}`}
                    href="#"
                >
                    <i className={item.icon} />
                </a>
            </li>
        );
    });

    return (
        <div className={classes}>
            <ul className="social-links__list">
                {items}
            </ul>
        </div>
    );
}

export default SocialLinks;
