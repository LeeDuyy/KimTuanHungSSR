/* eslint-disable no-use-before-define */
import React from 'react';
// data stubs
import { IConfigState } from '../../store/config/configType';

interface FooterContactsProps {
    configState: IConfigState | null
}

function FooterContacts(props: FooterContactsProps) {
    const { configState } = props;
    return (
        <React.Fragment>
            {
                configState
                && (
                    <div className="site-footer__widget footer-contacts">

                        <h5 className="footer-contacts__title">
                            {configState.company_name}
                        </h5>

                        {/* <div className="footer-contacts__text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat
                            lorem. Pellentque ac placerat tellus.
                        </div> */}

                        <ul className="footer-contacts__contacts">
                            <li>
                                <i className="footer-contacts__icon fas fa-money-check" />
                                {configState.tax_code}
                            </li>
                            <li>
                                <i className="footer-contacts__icon fas fa-globe-americas" />
                                {configState.tax_address}
                            </li>
                            <li>
                                <i className="footer-contacts__icon far fa-envelope" />
                                {configState.email}
                            </li>
                            <li>
                                <i className="footer-contacts__icon fas fa-mobile-alt" />
                                {`${configState.phone_number} - Hotline:  ${configState.hotline}`}
                            </li>
                            <li>
                                <i className="footer-contacts__icon far fa-clock" />
                                <span dangerouslySetInnerHTML={{ __html: configState.clock }} />
                            </li>
                        </ul>
                    </div>
                )
            }
        </React.Fragment>
    );
}

export default FooterContacts;
