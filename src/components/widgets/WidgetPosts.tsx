// application
import { useMemo, useState } from 'react';
import Moment from 'react-moment';
import AppLink from '../shared/AppLink';
import url from '../../services/url';
import Post from '../../models/post';
import { GetPostHome } from '../../repository/home';
import { IMAGE_FOLDER } from '../../environment';

function WidgetPosts() {
    const [postHome, setPostHome] = useState<Post[]>([]);

    useMemo(async () => {
        const response: Post[] = await GetPostHome();
        setPostHome(response);
    }, []);

    const postsList = postHome.map((post) => (
        <div key={post.post_id} className="widget-posts__item">
            <div className="widget-posts__image">
                <AppLink href={url.postDetail(post.slug)}>
                    <img src={`${IMAGE_FOLDER}${post.thumbnail}`} alt="" />
                </AppLink>
            </div>
            <div className="widget-posts__info">
                <div className="widget-posts__name">
                    <AppLink href={url.postDetail(post.slug)}>{post.title}</AppLink>
                </div>
                <div className="widget-posts__date">
                    <Moment format="DD/MM/YYYY HH:mm">{new Date(post.active_date)}</Moment>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="widget-posts widget">
            <h4 className="widget__title">Bài Đăng mới</h4>
            <div className="widget-posts__list">
                {postsList}
            </div>
        </div>
    );
}

export default WidgetPosts;
