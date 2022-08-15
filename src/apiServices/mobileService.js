import qs from 'qs';
import request from '~/utils/request';

export const mobile = async (parameter) => {
    try {
        const res = await request.get('products', {
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
        const res = await request.get('filters');
        return res.data;
    } catch (error) {
        console.log(' lỗi ở apiService -> filter');
    }
};
export const mobileDetail = async (id) => {
    try {
        const res = await request.get('products', {
            params: {
                id,
            },
        });
        return res.data;
    } catch (error) {
        console.log(' lỗi ở apiService -> mobileDetail');
    }
};
