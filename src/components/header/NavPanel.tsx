// application
import Departments from './Departments';
import Heart20Svg from '../../svg/heart-20.svg';
import Compare16Svg from '../../svg/compare-16.svg';
import Indicator from './Indicator';
// import CartIndicator from './IndicatorCart';
// import IndicatorAccount from './IndicatorAccount';
import IndicatorSearch from './IndicatorSearch';
import NavLinks from './NavLinks';
import { useWishlist } from '../../store/wishlist/wishlistHooks';
import { useCompare } from '../../store/compare/compareHooks';
import { IMAGE_FOLDER } from '../../environment';
import { useConfig } from '../../store/config/configHook';

export type NavPanelLayout = 'default' | 'compact';

export interface NavPanelProps {
    layout?: NavPanelLayout;
}

function NavPanel(props: NavPanelProps) {
    const { layout = 'default' } = props;
    const { items: { length: wishlistCount } } = useWishlist();
    const { items: { length: compareCount } } = useCompare();
    const config = useConfig();
    let logo = null;
    let departments = null;
    let searchIndicator;

    if (layout === 'compact') {
        logo = (
            <div className="nav-panel__logo">
                <img src={`${IMAGE_FOLDER}${config?.logo_small}`} width="50" height="50" alt="" />
            </div>
        );

        searchIndicator = <IndicatorSearch />;
    }

    if (layout === 'default') {
        departments = (
            <div className="nav-panel__departments">
                <Departments />
            </div>
        );
    }

    return (
        <div className="nav-panel">
            <div className="nav-panel__container container">
                <div className="nav-panel__row">
                    {logo}
                    {departments}

                    <div className="nav-panel__nav-links nav-links">
                        <NavLinks />
                    </div>

                    <div className="nav-panel__indicators">
                        {searchIndicator}

                        <Indicator url="/shop/compare" value={compareCount} icon={<Compare16Svg />} />
                        <Indicator url="/shop/wishlist" value={wishlistCount} icon={<Heart20Svg />} />

                        {/* <CartIndicator />
                        <IndicatorAccount /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavPanel;
