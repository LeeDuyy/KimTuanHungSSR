// application
// import AppLink from '../shared/AppLink';
import { useMemo, useState } from 'react';
import StroykaSlick from '../shared/StroykaSlick';

// data stubs
// import dataShopBrands from '../../data/shopBrands';
import GetSlide from '../../repository/system';
import { IMAGE_FOLDER } from '../../environment';

const slickSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 650,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: 'linear',
    responsive: [
        {
            breakpoint: 1199,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            },
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ],
};

export default function BlockBrands() {
    const [brandsListData, setBrandsListData] = useState<any[]>([]);

    useMemo(async () => {
        const slidesRes = await GetSlide();
        setBrandsListData(slidesRes.partner);
    }, []);

    const brandsList = brandsListData.map((brand, index) => (
        <div key={index} className="block-brands__item">
            <img src={`${IMAGE_FOLDER}${brand.image_classic}`} alt={brand.title} />
        </div>
    ));

    return (
        <div className="block block-brands">
            <div className="container">
                <div className="block-brands__slider">
                    <StroykaSlick {...slickSettings}>
                        {brandsList}
                    </StroykaSlick>
                </div>
            </div>
        </div>
    );
}
