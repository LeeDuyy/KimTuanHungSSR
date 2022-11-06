/* eslint-disable linebreak-style */

const HOST = 'https://capxichkimtuanhung.com';
const HOST_API = 'https://capxichkimtuanhung.com/api/v1.0';
const HOST_API_SV = 'https://capxichkimtuanhung.com/api/v1.0';
const IMAGE_FOLDER = 'https://capxichkimtuanhung.com';
const IMAGE_FOLDER_DEF = 'https://capxichkimtuanhung.com/images/system/';

const API_LINKS = {
    // --------------------------CATEGORY------------------------------
    getCategorySideBarApi: '/client/category/sidebar',
    getCategoryMobleSideBarApi: '/client/category/mobile',
    getCategoryInfoApi: '/client/category/info',
    // getCategoryInfoApi: '/cats/client/cat-slug',
    // getCategoryUrlApi: '/cats/client/cat-url',
    // getCategoryDetailApi: '/cats/client/cat-id',
    // ----------------------------------------------------------------

    // --------------------------PRODUCT-------------------------------
    getProductListApi: '/client/product/list',
    getProductBySlugApi: '/client/product/info',
    getProductRelatedApi: '/client/product/related',
    // ----------------------------------------------------------------

    // -----------------------------MENU-------------------------------
    getMenuTop: '/client/menu/top',
    getMenuMain: '/client/menu/main',
    getMenuFooter: '/client/menu/footer',
    getMenuDetail: '/client/menu/detail',
    getMenuMobile: '/client/menu/mobile',
    // ----------------------------------------------------------------

    // -----------------------------POST-------------------------------
    getPostList: '/client/post/list',
    getPostDetail: '/client/post/detail',
    // ----------------------------------------------------------------

    // -----------------------------CONFIG-------------------------------
    getConfig: '/client/config',
    getHomeBlock: '/client/home',
    getPostHome: '/client/home/post',
    // ----------------------------------------------------------------

    // -----------------------------SLIDE-------------------------------
    getSlide: '/client/slide',
    // ----------------------------------------------------------------

};

export {
    HOST,
    HOST_API,
    IMAGE_FOLDER,
    IMAGE_FOLDER_DEF,
    API_LINKS,
    HOST_API_SV,
};
