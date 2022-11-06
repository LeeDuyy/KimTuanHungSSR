// application
import { useMemo, useState } from 'react';
import { IMAGE_FOLDER } from '../../environment';
import GetSlide from '../../repository/system';
import url from '../../services/url';
import AppLink from '../shared/AppLink';

export default function BlockBanner() {
    const [banner, setBanner] = useState<any>({});

    useMemo(async () => {
        const slidesRes = await GetSlide();
        setBanner(slidesRes.banner[0]);
    }, []);

    return (
        <div className="block block-banner">
            <div className="container">
                {
                    banner.slug
                    && (
                        <AppLink href={url.mainCat(banner.slug)} className="block-banner__body">
                            <div
                                className="block-banner__image block-banner__image--desktop"
                                style={{ backgroundImage: `url(${IMAGE_FOLDER}${banner.image_classic})` }}
                            />

                            <div
                                className="block-banner__image block-banner__image--mobile"
                                style={{ backgroundImage: `url(${IMAGE_FOLDER}${banner.image_mobile})` }}
                            />

                            <div className="block-banner__title">
                                {banner.title}
                                {/* <br className="block-banner__mobile-br" />
                                Hand Tools */}
                            </div>

                            <div className="block-banner__text">
                                {banner.descriptions}
                            </div>

                            {
                                banner.acction_label
                                && (
                                    <div className="block-banner__button">
                                        <span className="btn btn-sm btn-primary">{banner.acction_label}</span>
                                    </div>
                                )
                            }
                        </AppLink>
                    )
                }
            </div>
        </div>
    );
}
