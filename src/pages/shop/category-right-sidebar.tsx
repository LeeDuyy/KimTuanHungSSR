// application
import getShopPageData from '../../store/shop/shopHelpers';
// import ShopPageCategory from '../../components/shop/ShopPageCategory';
import { wrapper } from '../../store/store';
import SitePageNotFound from '../../components/site/SitePageNotFound';

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    await getShopPageData(store, context, 'power-tools');

    return { props: {} };
});

function Page() {
    // return <ShopPageCategory columns={3} viewMode="grid" sidebarPosition="end" />;
    return <SitePageNotFound />;
}

export default Page;
