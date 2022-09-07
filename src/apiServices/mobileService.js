import qs from 'qs';
import request from '~/utils/request';

export const mobile = async (parameter) => {
    try {
        const res = await request.get('mobiles', {
            params: parameter,
            paramsSerializer: function (params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            },
        });
        return res.data;
    } catch (error) {
        console.log(' lỗi ở apiService -> mobile');
    }
};
export const filter = async () => {
    try {
        const res = await request.get('filtersMobile');
        return res.data;
    } catch (error) {
        console.log(' lỗi ở apiService -> filter');
    }
};
export const mobileDetail = async (id) => {
    try {
        const res = await request.get('mobile_detail', {
            params: {
                id,
            },
        });
        return res.data;
    } catch (error) {
        console.log(' lỗi ở apiService -> mobileDetail');
    }
};
