/* eslint-disable max-len */
// third-party
import Head from 'next/head';

// application
import AppLink from '../shared/AppLink';
import url from '../../services/url';

function SitePageNotFound() {
    return (
        <div className="block">
            <Head>
                <title>404 | Kim Tuấn Hùng - Không Tìm Thấy Trang</title>
            </Head>

            <div className="container">
                <div className="not-found">
                    <div className="not-found__404">
                        Oops! Error 404
                    </div>

                    <div className="not-found__content">
                        <h1 className="not-found__title">Không Tìm Thấy Trang</h1>

                        <p className="not-found__text">
                            Đường dẫn hiện tại không tìm thấy, hãy quay lại trang chủ!
                        </p>

                        {/* <form className="not-found__search">
                            <input type="text" className="not-found__search-input form-control" placeholder="Search Query..." />
                            <button type="submit" className="not-found__search-button btn btn-primary">Search</button>
                        </form>

                        <p className="not-found__text">
                            Or go to the home page to start over.
                        </p> */}

                        <AppLink href={url.home()} className="btn btn-secondary btn-sm">
                            Quay Lại Trang Chủ
                        </AppLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SitePageNotFound;
