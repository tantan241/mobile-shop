import Cart from '~/pages/Cart';
import Home from '~/pages/Home';
import Accessory from '~/pages/Accessory';
import Notification from '~/pages/Notification/Notification';
import Mobile from '~/pages/Mobile';
import SearchPage from '~/pages/SearchPage/SearchPage';
import Compare from '~/pages/Compare';
import ProductDetail from '~/pages/ProductDetail';
import Order from '~/pages/Order/Order';
import OrderDetail from '~/components/OrderDetail/OrderDetail';

const publicLayouts = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/mobile',
        component: Mobile,
    },
    {
        path: '/product-detail/:name',
        component: ProductDetail,
    },
    {
        path: '/notification',
        component: Notification,
    },
    {
        path: '/cart',
        component: Cart,
    },
    {
        path: '/accessory',
        component: Accessory,
    },
    {
        path: '/search',
        component: SearchPage,
    },
    {
        path: '/compare',
        component: Compare,
    },
    {
        path: '/order',
        component: Order,
    },
    {
        path: '/order-detail',
        component: OrderDetail,
    },
];
const privateLayouts = [];
export { privateLayouts, publicLayouts };
