import request from '~/utils/request';

export const brands = async () => {
    try {
        const res = await request.get('brands');
        return res.data;
    } catch (error) {
        console.log('Lỗi ở compareService ---> brands');
    }
};
export const products = async (prams) => {
    try {
        const res = await request.get('products', {
            params: prams,
        });
        return res.data;
    } catch (error) {
        console.log('Lỗi ở compareService ---> products');
    }
};
export const product2 = async (id) => {
    try {
        const res = await request.get('products', {
            params: {
                id,
            },
        });
        return res.data;
    } catch (error) {
        console.log('Lỗi ở compareService ---> product');
    }
};
// test
export const compare = async (id_1, id_2) => {
    try {
        const res = await request.get('compare', {
            params: {
                id_1,
                id_2,
            },
        });
        return res.data;
    } catch (error) {
        console.log('Lỗi ở compareService ---> compare');
    }
};
