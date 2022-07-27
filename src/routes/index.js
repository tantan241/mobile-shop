import Mobile from '~/pages/Mobile';
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
];
const privateLayouts = [{}];
export { privateLayouts, publicLayouts };
