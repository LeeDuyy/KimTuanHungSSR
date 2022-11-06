/* eslint-disable @typescript-eslint/no-unused-vars */
// react
import { Fragment } from 'react';

// third-party
import Head from 'next/head';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import Page from '../../models/page';

interface Props {
    page: Page
}

function TemplateSummary(props: Props) {
    const { page } = props;

    // const breadcrumb = [
    //     { title: 'Trang chủ', url: '' },
    //     { title: 'Frequently Asked Questions', url: '' },
    // ];

    return (
        <Fragment>
            <Head>
                <title>{`${page.title} | Kim Tuấn Hùng`}</title>
            </Head>

            {/* <PageHeader header="Frequently Asked Questions" breadcrumb={breadcrumb} /> */}

            <div className="block faq">
                <div className="container">
                    <div className="faq__section">
                        <div className="faq__section-body">
                            <div className="row">
                                <div className="faq__section-column col-12 col-lg-6">
                                    <div className="typography" dangerouslySetInnerHTML={{ __html: page.descriptions }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default TemplateSummary;
