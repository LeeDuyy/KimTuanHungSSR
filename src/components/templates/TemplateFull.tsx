/* eslint-disable @typescript-eslint/no-unused-vars */
// react
import { Fragment } from 'react';

// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import PageHeader from '../shared/PageHeader';
import url from '../../services/url';
import Page from '../../models/page';

interface Props {
    page: Page
}

function TemplateFull(props: Props) {
    const { page } = props;

    // const breadcrumb = [
    //     { title: 'Home', url: '' },
    //     { title: 'Terms And Conditions', url: '' },
    // ];

    return (
        <Fragment>
            <Head>
                <title>{`${page.title} | Kim Tuấn Hùng`}</title>
            </Head>

            {/* <PageHeader breadcrumb={breadcrumb} /> */}

            <div className="block">
                <div className="container">
                    <div className="document">
                        <div className="document__content typography" dangerouslySetInnerHTML={{ __html: page.descriptions }} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default TemplateFull;
