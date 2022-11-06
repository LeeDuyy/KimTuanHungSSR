/* eslint-disable @typescript-eslint/no-unused-vars */
// react
import { Fragment } from 'react';

// third-party
import Head from 'next/head';

// application
import PageHeader from '../shared/PageHeader';

// blocks
import BlockMap from '../blocks/BlockMap';

// data stubs
import theme from '../../data/theme';
import Page from '../../models/page';
import { IMAGE_FOLDER } from '../../environment';

interface Props {
    page: Page
}

function TemplateBackground(props: Props) {
    const { page } = props;

    return (
        <div className="block about-us">
            <Head>
                <title>{`${page.title} | Kim Tuấn Hùng`}</title>
            </Head>

            {
                page.background_image
                    ? (
                        <div className="about-us__image" style={{ backgroundImage: `url(${IMAGE_FOLDER}${page.background_image})` }} />
                    )
                    : (
                        <div className="about-us__image" style={{ backgroundImage: 'url("images/aboutus.jpg")' }} />
                    )
            }
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-10">
                        <div className="about-us__body">
                            <div className="about-us__text typography" dangerouslySetInnerHTML={{ __html: page.descriptions }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplateBackground;
