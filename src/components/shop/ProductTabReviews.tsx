/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable prefer-const */
// application
// import Pagination from '../shared/Pagination';
// import Rating from '../shared/Rating';

import { useEffect, useMemo, useState } from 'react';

// data stubs
// import dataShopProductReviews from '../../data/shopProductReviews';

declare global {
    interface Window {
        FB: any;
    }
}

function initFacebookSdk() {
    if (window.FB) {
        window.FB.XFBML.parse();
    }

    // load facebook sdk script
    const facebookScript = document.createElement('script');
    facebookScript.async = true;
    facebookScript.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v12.0&appId=624480075233868&autoLogAppEvents=1';
    document.body.appendChild(facebookScript);
}
// let FB;
function ProductTabReviews() {
    const commentsWidth = 800;
    const numposts = 5;
    let currentUrl = '';

    if (typeof window !== 'undefined') {
        currentUrl = window.location.href;
    }
    useEffect(() => {
        initFacebookSdk();
    }, [currentUrl]);

    return (
        <div className="comment-fb" style={{ display: 'flex', justifyContent: 'center' }}>
            <div
                className="fb-comments"
                data-href={currentUrl}
                data-width={commentsWidth}
                data-numposts={numposts}
                data-order-by="reverse_time"
            />
        </div>
    );
}

export default ProductTabReviews;
