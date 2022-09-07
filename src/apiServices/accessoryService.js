import qs from 'qs';
import request from '~/utils/request';
export const filter = async () => {
    try {
        const res = await request.get('filtersAccessory');
        return res.data;
    } catch (error) {
        console.log(' lỗi ở apiService -> filterAccessory');
    }
};
export const accessories = async (parameter) => {
    try {
        const res = await request.get('accessories', {
            params: parameter,
            paramsSerializer: function (params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            },
        });
        return res.data;
    } catch (error) {
        console.log(' lỗi ở apiService -> accessoriesAccessory');
    }
};
