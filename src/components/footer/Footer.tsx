/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    useMemo,
    useState,
} from 'react';

// application
import FooterContacts from './FooterContacts';
import FooterLinks from './FooterLinks';
import FooterNewsletter from './FooterNewsletter';
import ToTop from './ToTop';
import ContactBubble from './ContactBubble';

// data stubs
import { useConfig, useInitConfig } from '../../store/config/configHook';
import { IConfigState } from '../../store/config/configType';
import GetConfig from '../../repository/config';
import { GetMenuFooter } from '../../repository/menus';

function Footer() {
    const [configState, setConfigState] = useState<IConfigState | null>(null);
    const [menuFooter, setMenuFooter] = useState<any[]>([]);
    const initConfig = useInitConfig();

    useMemo(async () => {
        const configRes = await GetConfig();
        setConfigState(configRes);
        initConfig(configRes);
    }, []);

    useMemo(async () => {
        const menuFooterRes = await GetMenuFooter();
        setMenuFooter(menuFooterRes);
    }, []);

    const footerLinks = menuFooter.map((menu, idx) => (
        <div key={idx} className="col-6 col-md-3 col-lg-2">
            <FooterLinks title={menu.title} items={menu.items} />
        </div>
    ));

    return (
        <div className="site-footer">
            <div className="container">
                <div className="site-footer__widgets">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4">
                            <FooterContacts configState={configState} />
                        </div>
                        {footerLinks}
                        <div className="col-12 col-md-12 col-lg-4">
                            <FooterNewsletter />
                        </div>
                    </div>
                </div>

                <div className="site-footer__bottom">
                    <div className="site-footer__copyright">
                        © CAPXICHKIMTUANHUNG.COM 2021. All Rights Reserved
                    </div>
                    <div className="site-footer__payments">
                        <img src="/images/payments-1.png" alt="" />
                    </div>
                </div>
            </div>
            <ToTop />
            <ContactBubble />
        </div>
    );
}

export default Footer;
