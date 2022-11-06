import axios from 'axios';
import { API_LINKS, HOST_API_SV } from '../environment';
import Post from '../models/post';

class PostList {
    postList: Post[] = [];
    totalPage: number = 0;
}

const GetPostList = async (
    isNew: boolean = false,
    postId: number = 0,
    slug: string,
    keyword: string = '',
    page: number = 1,
    limit: number = 12,
) => {
    const response: PostList = new PostList();
    const API = HOST_API_SV + API_LINKS.getPostList;
    const headers = {
        'Content-Type': 'application/json',
    };
    const payload = {
        isNew,
        postId,
        slug,
        keyword,
        page,
        limit,
    };

    const res = await axios.post(API, payload, { headers });
    const { data } = res;
    if (data != null && data !== '') {
        response.postList = data;
        response.totalPage = 0;
        if (data[0]) {
            response.totalPage = data[0].total_page;
        }
    }

    return response;
};

const GetPostDetail = async (slug: string) => {
    let response: Post | null = null;
    const API = HOST_API_SV + API_LINKS.getPostDetail;
    const headers = {
        'Content-Type': 'application/json',
    };
    const payload = {
        slug,
    };

    const res = await axios.post(API, payload, { headers });
    const { data } = res;

    if (data != null) {
        response = data;
    }

    return response;
};

export { GetPostList, GetPostDetail };
