import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import useStore from '~/store/hooks';
import * as homeService from '~/apiServices/homeService';
import Filters from '~/components/Filters';
import MobileItem from '~/components/MobileItem';
import MostBuy from '~/pages/MostBuy';
import { actions } from '~/store';
import AccessoryItem from '../Accessory/components/AccessoryItem';
import Sort from '../../components/Sort';
import Pages from '../../components/Pages';
import FilterPrice from '~/components/Filters/components/FilterPrice';
import FiltersMobile from '~/pages/Mobile/components/FiltersMobile';
const cx = classNames.bind(styles);
function Home() {
    const [store, dispatch] = useStore();
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);
    const [pagesMax, setPagesMax] = useState(0);

    useEffect(() => {
        dispatch(actions.setNumberPage(1));
        const fetchApi = async () => {
            const res = await homeService.filterHome();
            setFilters(res);
        };
        fetchApi();
        document.title = 'VuTan-Mobile';
    }, []);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await homeService.products(store.paramsApiFilter);
            setProducts(res);
            setPagesMax(Math.ceil(res.length / 6));
        };
        fetchApi();
    }, [store]);

    return (
        <div className={cx('wrapper')}>
            <MostBuy />
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
                        {products
                            .slice((store.numberPage - 1) * 6, (store.numberPage - 1) * 6 + 6)
                            .map((product) =>
                                product.type === 'accessory' ? (
                                    <AccessoryItem m_2 s_2 key={product.id} product={product} buyNow />
                                ) : (
                                    <MobileItem m_2 l_3 s_2 key={product.id} product={product} buyNow />
                                ),
                            )}
                    </div>
                    <Pages pagesMax={pagesMax} />
                </div>
                {store.openFiltersMobile && <FiltersMobile filters={filters} />}
            </div>
        </div>
    );
}

export default Home;
