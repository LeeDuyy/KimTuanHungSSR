/* eslint-disable func-names */
/* eslint-disable prefer-const */
// application
import { useEffect } from 'react';
import { useConfig } from '../../store/config/configHook';
import SocialLinks from '../shared/SocialLinks';

declare global {
    interface Window {
        FB: any;
        // fbAsyncInit: any;
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

function FooterNewsletter() {
    const config = useConfig();

    useEffect(() => {
        initFacebookSdk();
    }, []);

    return (
        <div className="site-footer__widget footer-newsletter">
            <h5 className="footer-newsletter__title">Đăng ký email để nhận thêm thông tin</h5>
            {/* <div className="footer-newsletter__text">
                Praesent pellentesque volutpat ex, vitae auctor lorem pulvinar mollis felis
                at lacinia.
            </div> */}

            {/* <form action="" className="footer-newsletter__form">
                <label className="sr-only" htmlFor="footer-newsletter-address">Email Address</label>
                <input
                    type="text"
                    className="footer-newsletter__form-input form-control"
                    id="footer-newsletter-address"
                    placeholder="Email Address..."
                />
                <button type="submit" className="footer-newsletter__form-button btn btn-primary">Subscribe</button>
            </form> */}

            <form action="" className="footer-newsletter__form">
                <label className="sr-only" htmlFor="footer-newsletter-address">Email</label>
                <input
                    type="text"
                    className="footer-newsletter__form-input form-control"
                    id="footer-newsletter-address"
                    placeholder="Email..."
                />
                <button type="submit" className="footer-newsletter__form-button btn btn-primary">
                    Gửi
                </button>
            </form>

            <div className="footer-newsletter__text footer-newsletter__text--social">
                Theo dõi chúng tôi
            </div>

            <SocialLinks className="footer-newsletter__social-links" shape="circle" />

            <div className="fanpage" style={{ marginTop: 15 }}>
                <div
                    className="fb-page"
                    data-href={config?.facebook}
                    data-tabs=""
                    data-width="350"
                    data-height=""
                    data-small-header="true"
                    data-adapt-container-width="true"
                    data-hide-cover="false"
                    data-show-facepile="false"
                >
                    <blockquote cite={config?.facebook} className="fb-xfbml-parse-ignore">
                        <a href={config?.facebook}>
                            {config?.short_name}
                        </a>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}

export default FooterNewsletter;
