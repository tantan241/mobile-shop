import qs from 'qs';
import request from '~/utils/request';

export const products = async (parameter) => {
    try {
        const res = await request.get('products', {
            params: parameter,
            paramsSerializer: function (params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            },
        });
        return res.data;
    } catch (error) {
        console.log(' lỗi ở apiService -> product in cart');
    }
};
