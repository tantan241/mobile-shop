import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Accessory.module.scss';
import AccessoryItem from '../../components/AccessoryItem';
import * as accessoryService from '~/apiServices/accessoryService';
import Filters from '~/components/Filters';
import Sort from '../../components/Sort';
import MobilePages from '../../components/Pages';
import useStore from '~/store/hooks';
import { actions } from '~/store';
import FilterPrice from '~/components/Filters/components/FilterPrice';
import FiltersMobile from '~/components/FiltersMobile';
const cx = classNames.bind(styles);
function Accessory() {
    const [filters, setFilters] = useState();
    const [products, setProducts] = useState();
    const [pagesMax, setPagesMax] = useState(0);
    const [store, dispatch] = useStore();

    useEffect(() => {
        dispatch(actions.setNumberPage(1));
        const fetchApi = async () => {
            const res = await accessoryService.filter();
            setFilters(res);
        };
        fetchApi();
    }, []);
    useEffect(() => {
        const fetchApi = async () => {
            const resProducts = await accessoryService.accessories(store.paramsApiFilter);
            setProducts(resProducts);
            setPagesMax(Math.ceil(resProducts.length / 9));
        };
        fetchApi();
    }, [store]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('filters')}>
                {filters && filters.map((filter) => <Filters data={filter} key={filter.id} />)}
                <FilterPrice />
            </div>

            <div className={cx('content')}>
                <Sort />
                <div className={cx('products')}>
                    {products &&
                        products
                            .slice((store.numberPage - 1) * 9, (store.numberPage - 1) * 9 + 9)
                            .map((product) => <AccessoryItem s_2 m_2 key={product.id} product={product} buyNow />)}
                </div>
                <MobilePages pagesMax={pagesMax} />
            </div>
            {store.openFiltersMobile && <FiltersMobile filters={filters} />}
        </div>
    );
}

export default Accessory;
