/* eslint-disable camelcase */

interface Tags {
    tag_name: string;
}

interface Post {
    active_date: string
    author: string
    descriptions: string
    post_id: number
    short_descriptions: string
    slug: string
    thumbnail: string
    title: string
    menu_name: string
    menu_slug: string
    tags?: Tags[]
}

export default Post;
