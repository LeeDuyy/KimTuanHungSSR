/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable max-len */
// third-party
import classNames from 'classnames';

// application
import Moment from 'react-moment';
import { useEffect, useMemo, useState } from 'react';
import AppLink from '../shared/AppLink';

// data stubs
import Post from '../../models/post';
import url from '../../services/url';
import { GetPostList } from '../../repository/post';
import { IMAGE_FOLDER } from '../../environment';

export type BlogPostLayout = 'classic' | 'full';

export interface BlogPostProps {
    layout?: BlogPostLayout;
    post: Post;
}

declare global {
    interface Window {
        FB: any;
    }
}

function initFacebookSdk() {
    if (window.FB) {
        window.FB.XFBML.parse();
    }

    // load facebook sdk script
    const facebookScript = document.createElement('script');
    facebookScript.async = true;
    facebookScript.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v12.0&appId=624480075233868&autoLogAppEvents=1';
    document.body.appendChild(facebookScript);
}

function BlogPost(props: BlogPostProps) {
    const commentsWidth = 700;
    const numposts = 5;
    const { layout = 'classic', post } = props;
    const [postRelatedData, setPostRelatedData] = useState<Post[]>([]);
    const postClasses = classNames('post__content typography', {
        'typography--expanded': layout === 'full',
    });

    let currentUrl = '';

    if (typeof window !== 'undefined') {
        currentUrl = window.location.href;
    }

    useEffect(() => {
        initFacebookSdk();
    }, [currentUrl]);

    useMemo(async () => {
        const responseListPost = await GetPostList(false, post.post_id, '', '', 0, 2);
        setPostRelatedData(responseListPost.postList);
    }, []);

    const relatedPostsList = postRelatedData.map((relatedPost) => (
        <div key={relatedPost.post_id} className="related-posts__item post-card post-card--layout--related">
            <div className="post-card__image">
                <AppLink href={url.postDetail(relatedPost.slug)}>
                    <img src={`${IMAGE_FOLDER}${relatedPost.thumbnail}`} alt="" />
                </AppLink>
            </div>
            <div className="post-card__info">
                <div className="post-card__name">
                    <AppLink href={url.postDetail(relatedPost.slug)}>{relatedPost.title}</AppLink>
                </div>
                <div className="post-card__date">
                    <Moment format="DD/MM/YYYY HH:mm">{new Date(relatedPost.active_date)}</Moment>
                </div>
            </div>
        </div>
    ));

    let tags;
    if (post.tags) {
        tags = post.tags.map((tag, idx) => (
            <a key={idx} href="#">{tag.tag_name}</a>
        ));
    }

    return (
        <div className={`block post post--layout--${layout}`}>
            <div className={`post__header post-header post-header--layout--${layout}`}>
                {/* <div className="post-header__categories">
                    <AppLink href="/">Latest news</AppLink>
                </div> */}
                <h1 className="post-header__title">{post.title}</h1>
                <div className="post-header__meta">
                    <div className="post-header__meta-item">
                        <Moment format="DD/MM/YYYY HH:mm">{new Date(post.active_date)}</Moment>
                    </div>
                    <div className="post-header__meta-item">
                        {post.author}
                    </div>
                </div>
            </div>

            <div className={postClasses} dangerouslySetInnerHTML={{ __html: post.descriptions }} />

            <div className="post__footer">
                <div className="post__tags-share-links">
                    <div className="post__tags tags">
                        <div className="tags__list">
                            <strong style={{ display: 'flex', alignItems: 'center' }}>
                                <i className="footer-contacts__icon fas fa-tags" />
                                Tags:
                            </strong>
                            {' '}
                            {tags}
                        </div>
                    </div>
                    <div className="post__share-links share-links">
                        <ul className="share-links__list">
                            {/* <li className="share-links__item share-links__item--type--like"><AppLink href="/">Like</AppLink></li>
                            <li className="share-links__item share-links__item--type--tweet"><AppLink href="/">Tweet</AppLink></li>
                            <li className="share-links__item share-links__item--type--pin"><AppLink href="/">Pin It</AppLink></li>
                            <li className="share-links__item share-links__item--type--counter"><AppLink href="/">4K</AppLink></li> */}
                            <li className="share-links__item share-links__item--type--like">
                                <div
                                    className="fb-like"
                                    data-href={currentUrl}
                                    data-width=""
                                    data-layout="button"
                                    data-action="like"
                                    data-size="small"
                                    data-share="true"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="post__section">
                <h4 className="post__section-title">Bình luận</h4>
                {/* <BlogCommentsList comments={dataBlogPostComments.items} /> */}
                <div className="comment-fb" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                        className="fb-comments"
                        data-href={currentUrl}
                        data-width={commentsWidth}
                        data-numposts={numposts}
                        data-order-by="reverse_time"
                    />
                </div>
            </section>

            <section className="post__section">
                <h4 className="post__section-title">Bài viết liên quan</h4>
                <div className="related-posts">
                    <div className="related-posts__list">
                        {relatedPostsList}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BlogPost;
