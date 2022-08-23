import Cart from '~/pages/Cart';
import Mobile from '~/pages/Mobile';
import MobileDetail from '~/pages/MobileDetail';
import Notification from '~/pages/Notification/Notification';

const publicLayouts = [
    {
        path: '/',
        component: Mobile,
    },

    {
        path: '/mobile-detail/:name',
        component: MobileDetail,
    },
    {
        path: '/notification',
        component: Notification,
    },
    {
        path: '/cart',
        component: Cart,
    },
];
const privateLayouts = [];
export { privateLayouts, publicLayouts };
