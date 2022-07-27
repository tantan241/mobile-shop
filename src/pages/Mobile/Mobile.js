import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Mobile.module.scss';

import useStore from '~/store/hooks';
import * as mobileService from '~/apiServices/mobileService';

import Filter from '~/components/Filter';
import MobileItem from '~/pages/Mobile/components/MobileItem';
import MostBuy from '~/pages/Mobile/components/MostBuy';
import Sort from './components/Sort';

const cx = classNames.bind(styles);
function Mobile() {
    const [store, dispatch] = useStore();
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);
    useEffect(() => {
        fetch(store.pathApi)
            .then((responsive) => responsive.json())
            .then((data) => {
                return setProducts(data);
            });
    }, [store]);
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
                </div>
            </div>
        </div>
    );
}

export default Mobile;
