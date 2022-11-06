// react
import { Fragment } from 'react';

// third-party
import Head from 'next/head';

// application
import PageHeader from '../shared/PageHeader';

// blocks
import BlockMap from '../blocks/BlockMap';
import { useConfig } from '../../store/config/configHook';

// data stubs
// import theme from '../../data/theme';

function SitePageContactUs() {
    const breadcrumb = [
        { title: 'Trang chủ', url: '/' },
        { title: 'Liên hệ', url: '' },
    ];

    const config = useConfig();

    return (
        <Fragment>
            <Head>
                <title>Liên Hệ | Kim Tuấn Hùng</title>
            </Head>

            <BlockMap />

            <PageHeader header="Liên Hệ" breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="card mb-0">
                        <div className="card-body contact-us">
                            <div className="contact-us__container">
                                <div className="row">
                                    <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                                        <h4 className="contact-us__header card-title">Địa Chỉ</h4>

                                        <div className="contact-us__address">
                                            <p>
                                                <b>Địa Chỉ:</b>
                                                {' '}
                                                {config?.tax_address}
                                                <br />
                                                <b>Email:</b>
                                                {' '}
                                                {config?.email}
                                                <br />
                                                <b>SĐT:</b>
                                                {' '}
                                                {config?.phone_number}
                                                <br />
                                                <b>Hotline:</b>
                                                {' '}
                                                {config?.hotline}
                                            </p>

                                            {
                                                config != null
                                                && (
                                                    <p>
                                                        <strong>Giờ Mở Cửa</strong>
                                                        <div dangerouslySetInnerHTML={{ __html: config.clock }} />
                                                    </p>
                                                )
                                            }

                                            <p>
                                                <strong>Nhận Xét</strong>
                                                <br />
                                                Doanh nghiệp sản phẩm chất lượng cao.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-6">
                                        <h4 className="contact-us__header card-title">Gửi Liên Lạc</h4>
                                        <form>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="form-name">Họ Tên</label>
                                                    <input type="text" id="form-name" className="form-control" placeholder="Họ Tên" />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="form-email">Email</label>
                                                    <input
                                                        type="email"
                                                        id="form-email"
                                                        className="form-control"
                                                        placeholder="Email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="form-subject">Tiêu Đề</label>
                                                <input type="text" id="form-subject" className="form-control" placeholder="Tiêu Đề" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="form-message">Nội Dung</label>
                                                <textarea id="form-message" className="form-control" rows={4} />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Gửi</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default SitePageContactUs;
