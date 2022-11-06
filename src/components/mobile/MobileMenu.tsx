// react
import { memo, useMemo, useState } from 'react';

// third-party
import classNames from 'classnames';

// application
import Cross20Svg from '../../svg/cross-20.svg';
import MobileLinks from './MobileLinks';
import { useCurrencyChange } from '../../store/currency/currencyHooks';
import { useLocaleChange } from '../../store/locale/localeHooks';
import { useMobileMenu, useMobileMenuClose } from '../../store/mobile-menu/mobileMenuHooks';

// data stubs
import dataShopCurrencies from '../../data/shopCurrencies';
import { IMobileMenuLink } from '../../interfaces/menus/mobile-menu';
import { GetCategoryMobileSideBar } from '../../repository/category';
import { GetMenuMobile } from '../../repository/menus';

const topMenu: any[] = [
    {
        type: 'link',
        label: 'Trang Chủ',
        url: '/',
    },

    {
        type: 'link',
        label: 'Sản Phẩm',
        url: '/',
        children: [] as any[],
    },
];

const bottomMenu: any[] = [
    {
        type: 'template',
        label: 'Yêu Thích',
        url: '/shop/wishlist',
    },

    {
        type: 'template',
        label: 'So Sánh',
        url: '/shop/compare',
    },

    // {
    //     type: 'template',
    //     label: 'Tài Khoản',
    //     url: '/account',
    //     children: [
    //         { type: 'template', label: 'Đăng Nhập', url: '/account/login' },
    //         { type: 'template', label: 'Tổng Quan', url: '/account/dashboard' },
    //         { type: 'template', label: 'Thông Tin', url: '/account/profile' },
    //         { type: 'template', label: 'Lịch Sử Mua Hàng', url: '/account/orders' },
    //         { type: 'template', label: 'Đơn Hàng', url: '/account/orders/5' },
    //         { type: 'template', label: 'Địa Chỉ', url: '/account/addresses' },
    //         { type: 'template', label: 'Edit Address', url: '/account/addresses/5' },
    //         { type: 'template', label: 'Mật Khẩu', url: '/account/password' },
    //         { type: 'template', label: 'Checkout', url: '/shop/checkout' },
    //         { type: 'template', label: 'Order Success', url: '/shop/checkout/success' },
    //         { type: 'template', label: 'Track Order', url: '/shop/track-order' },
    //     ],
    // },
];

function MobileMenu() {
    const mobileMenu = useMobileMenu();
    const mobileMenuClose = useMobileMenuClose();
    const localeChange = useLocaleChange();
    const currencyChange = useCurrencyChange();
    const [menuMobile, setMenuMobile] = useState<any[]>([]);

    useMemo(async () => {
        const categoryChildren = await GetCategoryMobileSideBar();
        const menuMobileExpand = await GetMenuMobile();
        topMenu[1].children = categoryChildren;
        setMenuMobile(topMenu.concat(menuMobileExpand).concat(bottomMenu));
    }, []);

    const classes = classNames('mobilemenu', {
        'mobilemenu--open': mobileMenu.open,
    });

    const handleItemClick = (item: IMobileMenuLink) => {
        if (item.data) {
            if (item.data.type === 'language') {
                localeChange(item.data.locale);
                mobileMenuClose();
            }
            if (item.data.type === 'currency') {
                const currency = dataShopCurrencies.find((x) => x.code === item.data.code);

                if (currency) {
                    currencyChange(currency);
                    mobileMenuClose();
                }
            }
        }
        if (item.type === 'link') {
            mobileMenuClose();
        }
    };

    return (
        <div className={classes}>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
            <div className="mobilemenu__backdrop" onClick={mobileMenuClose} />
            <div className="mobilemenu__body">
                <div className="mobilemenu__header">
                    <div className="mobilemenu__title">Danh Mục</div>
                    <button type="button" className="mobilemenu__close" onClick={mobileMenuClose}>
                        <Cross20Svg />
                    </button>
                </div>
                <div className="mobilemenu__content">
                    <MobileLinks links={menuMobile} onItemClick={handleItemClick} />
                </div>
            </div>
        </div>
    );
}

export default memo(MobileMenu);
