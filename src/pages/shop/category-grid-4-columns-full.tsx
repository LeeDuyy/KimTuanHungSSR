/* eslint-disable @typescript-eslint/no-unused-vars */
// application
import getShopPageData from '../../store/shop/shopHelpers';
import ShopPageCategory from '../../components/shop/ShopPageCategory';
import { wrapper } from '../../store/store';
import SitePageNotFound from '../../components/site/SitePageNotFound';

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    await getShopPageData(store, context, 'power-tools');
    return { props: {} };
});

function Page() {
    return <SitePageNotFound />;
}

export default Page;
