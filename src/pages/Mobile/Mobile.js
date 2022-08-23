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
    const [pagesMax, setPagesMax] = useState(0);

    useEffect(() => {
        dispatch(actions.setNumberPage(1));
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
            setPagesMax(Math.ceil(res.length / 6));
        };
        fetchApi();
    }, [store]);

    return (
        <div className="wrapper">
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
                        {products.slice((store.numberPage - 1) * 6, (store.numberPage - 1) * 6 + 6).map((product) => (
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
