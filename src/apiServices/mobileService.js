import qs from 'qs';
import request, { requestPy } from '~/utils/request';

export const mobile = async (parameter) => {
    try {
        const res = await requestPy.post('api/get-products/', {
            // filter: parameter,
            paramsSerializer: function (params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            },
            Headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filter: parameter }),
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
        const res = await request.get('product_detail', {
            params: {
                id,
            },
        });
        return res.data;
    } catch (error) {
        console.log(' lỗi ở apiService -> mobileDetail');
    }
};
