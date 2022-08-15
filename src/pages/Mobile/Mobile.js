import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Mobile.module.scss';

import useStore from '~/store/hooks';
import * as mobileService from '~/apiServices/mobileService';

import Filter from '~/components/Filter';
import MobileItem from '~/pages/Mobile/components/MobileItem';
import MostBuy from '~/pages/Mobile/components/MostBuy';
import Sort from './components/Sort';
import MobilePages from './components/MobilePages';
import { actions } from '~/store';

const cx = classNames.bind(styles);
function Mobile() {
    const [store, dispatch] = useStore();
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);
    const [pagesMax, setPagesMax] = useState(2);
    // useEffect(() => {
    //     fetch(store.pathApi)
    //         .then((responsive) => responsive.json())
    //         .then((data) => {
    //             return setProducts(data);
    //         });
    // }, [store]);
    useEffect(() => {
        // dispatch(actions.setMaxPageNumber(9));
        dispatch(actions.setParamsApiFilter({ page: 1 }));
    }, []);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await mobileService.filter();
            setFilters(res);
        };
        fetchApi();
    }, []);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await mobileService.mobile(store.paramsApiFilter);
            setProducts(res);
            setPagesMax(19); // lấy số trang từ BE
        };
        fetchApi();
    }, [store]);

    return (
        <div className="wapper">
            <MostBuy />
            <div className={cx('content')}>
                <div className={cx('filters')}>
                    {filters.map((filter) => (
                        <Filter data={filter} key={filter.id} />
                    ))}
                </div>
                <div className={cx('products')}>
                    <Sort />
                    <div className={cx('products-content')}>
                        {products.map((product) => (
                            <MobileItem l_3 key={product.id} product={product} buyNow />
                        ))}
                    </div>
                    <MobilePages pagesMax={pagesMax} />
                </div>
            </div>
        </div>
    );
}

export default Mobile;
