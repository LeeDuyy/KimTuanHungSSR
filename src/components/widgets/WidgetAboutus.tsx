// application
import SocialLinks from '../shared/SocialLinks';

function WidgetAboutus() {
    return (
        <div className="widget-aboutus widget">
            <h4 className="widget__title">Blog</h4>
            <div className="widget-aboutus__text">
                Chúng tôi chia sẻ các tin tức mới nhất, các blog chi sẻ kiến thức về cái loại thép, cáp, dụng cụ, ...
            </div>

            <SocialLinks className="widget-aboutus__socials" shape="rounded" />
        </div>
    );
}

export default WidgetAboutus;
