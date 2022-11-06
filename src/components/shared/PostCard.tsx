// third-party
import classNames from 'classnames';
import Moment from 'react-moment';

// application
import AppLink from './AppLink';
import url from '../../services/url';
import Post from '../../models/post';
import { IMAGE_FOLDER } from '../../environment';
// import { IPost } from '../../interfaces/post';

export type PostCardLayout = 'grid-nl' | 'grid-lg' | 'list-nl' | 'list-sm';

export interface PostCardProps {
    layout?: PostCardLayout;
    postDetail: Post;
}

function PostCard(props: PostCardProps) {
    const {
        layout,
        postDetail,
    } = props;
    const cardClasses = classNames(
        'post-card',
        {
            'post-card--layout--grid': layout && ['grid-nl', 'grid-lg'].includes(layout),
            'post-card--layout--list': layout && ['list-nl', 'list-sm'].includes(layout),
            'post-card--size--nl': layout && ['grid-nl', 'list-nl'].includes(layout),
            'post-card--size--lg': layout === 'grid-lg',
            'post-card--size--sm': layout === 'list-sm',
        },
    );

    return (
        <div className={cardClasses}>
            <div className="post-card__image">
                <AppLink href={url.postDetail(postDetail.slug)}>
                    <img src={IMAGE_FOLDER + postDetail.thumbnail} alt="" />
                </AppLink>
            </div>
            <div className="post-card__info">

                <div className="post-card__name">
                    <AppLink href={url.postDetail(postDetail.slug)}>
                        {postDetail.title}
                    </AppLink>
                </div>
                <div className="post-card__content">
                    {postDetail.short_descriptions}
                </div>
                <div style={{
                    width: '100%', display: 'flex', flexWrap: 'wrap', marginTop: 5,
                }}
                >
                    <div className="post-card__category">
                        {postDetail.author}
                    </div>

                    <div className="post-card__date">
                        <Moment format="DD/MM/YYYY HH:mm">{new Date(postDetail.active_date)}</Moment>
                    </div>
                </div>

                <div className="post-card__read-more">
                    <AppLink href={url.postDetail(postDetail.slug)} className="btn btn-secondary btn-sm">
                        Đọc Tiếp
                    </AppLink>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
