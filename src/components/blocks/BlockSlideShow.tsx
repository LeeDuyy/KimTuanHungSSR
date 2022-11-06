/* eslint-disable max-len */
// react
import {
    useEffect, useMemo, useRef, useState,
} from 'react';

// third-party
import classNames from 'classnames';

// application
import AppLink from '../shared/AppLink';
import departmentsService from '../../services/departmentsService';
import StroykaSlick from '../shared/StroykaSlick';
// import { useDirection } from '../../store/locale/localeHooks';
import { useMedia } from '../../services/hooks';
import GetSlide from '../../repository/system';
import { IMAGE_FOLDER } from '../../environment';

export interface BlockSlideShowProps {
    withDepartments?: boolean;
}

const slickSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
};

// const slides = [
//     {
//         title: 'Big choice of<br>Plumbing products',
//         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
//         image_classic: {
//             ltr: '/images/slides/slide-1-ltr.jpg',
//             rtl: '/images/slides/slide-1-rtl.jpg',
//         },
//         image_full: {
//             ltr: '/images/slides/slide-1-full-ltr.jpg',
//             rtl: '/images/slides/slide-1-full-rtl.jpg',
//         },
//         image_mobile: {
//             ltr: '/images/slides/slide-1-mobile.jpg',
//             rtl: '/images/slides/slide-1-mobile.jpg',
//         },
//     },
//     {
//         title: 'Screwdrivers<br>Professional Tools',
//         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
//         image_classic: {
//             ltr: '/images/slides/slide-2-ltr.jpg',
//             rtl: '/images/slides/slide-2-rtl.jpg',
//         },
//         image_full: {
//             ltr: '/images/slides/slide-2-full-ltr.jpg',
//             rtl: '/images/slides/slide-2-full-rtl.jpg',
//         },
//         image_mobile: {
//             ltr: '/images/slides/slide-2-mobile.jpg',
//             rtl: '/images/slides/slide-2-mobile.jpg',
//         },
//     },
//     {
//         title: 'One more<br>Unique header',
//         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Etiam pharetra laoreet dui quis molestie.',
//         image_classic: {
//             ltr: '/images/slides/slide-3-ltr.jpg',
//             rtl: '/images/slides/slide-3-rtl.jpg',
//         },
//         image_full: {
//             ltr: '/images/slides/slide-3-full-ltr.jpg',
//             rtl: '/images/slides/slide-3-full-rtl.jpg',
//         },
//         image_mobile: {
//             ltr: '/images/slides/slide-3-mobile.jpg',
//             rtl: '/images/slides/slide-3-mobile.jpg',
//         },
//     },
// ];

function BlockSlideShow(props: BlockSlideShowProps) {
    const { withDepartments = false } = props;
    // const direction = useDirection();
    const departmentsAreaRef = useRef<HTMLDivElement | null>(null);
    const isDesktop = useMedia('(min-width: 992px)');
    const [slides, setSlides] = useState<any[]>([]);

    useMemo(async () => {
        const slidesRes = await GetSlide();
        setSlides(slidesRes.main.reverse());
    }, []);

    useEffect(() => () => {
        departmentsService.area = null;
    }, []);

    useEffect(() => {
        departmentsService.area = departmentsAreaRef.current;
    }, [isDesktop, departmentsAreaRef]);

    const setDepartmentsAreaRef = (ref: HTMLDivElement | null) => {
        departmentsAreaRef.current = ref;

        if (isDesktop) {
            departmentsService.area = departmentsAreaRef.current;
        }
    };

    const blockClasses = classNames(
        'block-slideshow block',
        {
            'block-slideshow--layout--full': !withDepartments,
            'block-slideshow--layout--with-departments': withDepartments,
        },
    );

    const layoutClasses = classNames(
        'col-12',
        {
            'col-lg-12': !withDepartments,
            'col-lg-9': withDepartments,
        },
    );

    let slidesList: any[] = [];
    if (slides.length > 0) {
        slidesList = slides.map((slide, index) => {
            const image = (withDepartments ? slide.image_classic : slide.image_full);
            // const image = (withDepartments ? slide.image_classic : slide.image_full)[direction];
            return (
                <div key={index} className="block-slideshow__slide">
                    <div
                        className="block-slideshow__slide-image block-slideshow__slide-image--desktop"
                        style={{
                            backgroundImage: `url(${IMAGE_FOLDER}${image})`,
                        }}
                    />
                    <div
                        className="block-slideshow__slide-image block-slideshow__slide-image--mobile"
                        style={{
                            backgroundImage: `url(${IMAGE_FOLDER}${slide.image_mobile})`,
                            // backgroundImage: `url(${IMAGE_FOLDER}${slide.image_mobile[direction]})`,
                        }}
                    />
                    <div className="block-slideshow__slide-content">
                        <div
                            className="block-slideshow__slide-title"
                            dangerouslySetInnerHTML={{ __html: slide.title }}
                        />
                        <div
                            className="block-slideshow__slide-text"
                            dangerouslySetInnerHTML={{ __html: slide.text }}
                        />
                        {
                            slide.action_label !== '' && slide.action_label !== undefined
                            && (
                                <div className="block-slideshow__slide-button">
                                    <AppLink href="/" className="btn btn-primary btn-lg">{slide.action_label}</AppLink>
                                </div>
                            )
                        }
                    </div>
                </div>
            );
        });
    }

    return (
        <div className={blockClasses}>
            <div className="container">
                <div className="row">
                    {withDepartments && (
                        <div className="col-3 d-lg-block d-none" ref={setDepartmentsAreaRef} />
                    )}

                    <div className={layoutClasses}>
                        <div className="block-slideshow__body">
                            {
                                slides !== null && slides.length > 0
                                && (
                                    <StroykaSlick {...slickSettings}>
                                        {slidesList}
                                    </StroykaSlick>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlockSlideShow;
