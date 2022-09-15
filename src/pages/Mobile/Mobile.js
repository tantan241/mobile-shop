import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Mobile.module.scss';
import useStore from '~/store/hooks';
import * as mobileService from '~/apiServices/mobileService';
import Filters from '~/components/Filters';
import MobileItem from '~/components/MobileItem';
import Sort from '../../components/Sort';
import MobilePages from '../../components/Pages';
import { actions } from '~/store';
import Advertise from '~/components/Advertise';
import FilterPrice from '~/components/Filters/components/FilterPrice';
import FiltersMobile from '~/components/FiltersMobile';
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
            setPagesMax(Math.ceil(res.length / 9));
        };
        fetchApi();
    }, [store]);
    return (
        <div className={cx('wrapper')}>
            <Advertise width="100%" src="https://cdn.tgdd.vn/2022/08/banner/1200-44-1200x44-13.png" />
            <div className={cx('content')}>
                <div className={cx('filters')}>
                    {filters.map((filter) => (
                        <Filters data={filter} key={filter.id} />
                    ))}
                    <FilterPrice />
                </div>
                <div className={cx('products')}>
                    <Sort />
                    <div className={cx('products-content')}>
                        {products.slice((store.numberPage - 1) * 9, (store.numberPage - 1) * 9 + 9).map((product) => (
                            <MobileItem s_2 m_2 l_3 key={product.id} product={product} buyNow />
                        ))}
                    </div>
                    <MobilePages pagesMax={pagesMax} />
                </div>
            </div>
            {store.openFiltersMobile && <FiltersMobile filters={filters} />}
        </div>
    );
}

export default Mobile;
