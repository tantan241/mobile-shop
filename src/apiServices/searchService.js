import request from '~/utils/request';

export const search = async (q) => {
    try {
        const res = await request.get('products', {
            params: {
                q,
            },
        });
        return res.data;
    } catch (error) {
        console.log('Lỗi Search Service -> search');
    }
};
