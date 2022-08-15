import Mobile from '~/pages/Mobile';
import MobileDetail from '~/pages/MobileDetail';
import MobileOld from '~/pages/MobileOld';

const publicLayouts = [
    {
        path: '/',
        component: Mobile,
    },
    {
        path: '/mobile-old',
        component: MobileOld,
    },
    {
        path: '/mobile-detail/:name',
        component: MobileDetail,
    },
];
const privateLayouts = [{}];
export { privateLayouts, publicLayouts };
