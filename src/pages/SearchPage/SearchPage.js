import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './SearchPage.module.scss';
import useStore from '~/store/hooks';
import * as homeService from '~/apiServices/homeService';
import AccessoryItem from '../Accessory/components/AccessoryItem';
import MobileItem from '../../components/MobileItem';
import MobilePages from '../../components/Pages';
import { fetchData } from '~/common';
import { API_PRODUCT } from '~/urlConfig';
const cx = classNames.bind(styles);
function SearchPage(props) {
    const [store, dispatch] = useStore();
    const [products, setProducts] = useState([]);
    const [pagesMax, setPagesMax] = useState(0);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const q = params.get('q');

    useEffect(() => {
        document.title = ' VuTan-Mobile';
    }, []);
    useEffect(() => {
        fetchData(`${API_PRODUCT}?q=${q}`).then((res) => {
            if (res.status === 200) {
                setProducts(res.data);
            }
        });
        // console.log(store);
        // const fetchApi = async () => {
        //     const res = await homeService.products(store.paramsApiFilter);
        //     setProducts(res);
        //     setPagesMax(Math.ceil(res.length / 15));
        // };
        // fetchApi();
    }, [store]);
    return (
        <>
            {products.length < 1 ? (
                <h1 className={cx('header')}> Không tìm thấy kết qủa tìm kiếm</h1>
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('products')}>
                        {products
                            .slice((store.numberPage - 1) * 15, (store.numberPage - 1) * 15 + 15)
                            .map((product) =>
                                product.type === 'accessory' ? (
                                    <AccessoryItem s_2 m_4 l_5 key={product.id} product={product} />
                                ) : (
                                    <MobileItem s_2 m_4 l_5 key={product.id} product={product} />
                                ),
                            )}
                    </div>
                    <MobilePages pagesMax={pagesMax} />
                </div>
            )}
        </>
    );
}

export default SearchPage;
