import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Accessory.module.scss';
import AccessoryItem from './components/AccessoryItem';
import * as accessoryService from '~/apiServices/accessoryService';
import Filters from '~/components/Filters';
import Sort from '../../components/Sort';
import MobilePages from '../../components/Pages';
import useStore from '~/store/hooks';
import { actions } from '~/store';
import FilterPrice from '~/components/Filters/components/FilterPrice';
import FiltersMobile from '~/pages/Mobile/components/FiltersMobile';
import { fetchData } from '~/common';
import { API_FILTER, API_GET_PRODUCT, API_PRODUCT } from '~/urlConfig';
const cx = classNames.bind(styles);
function Accessory() {
    const [filters, setFilters] = useState();
    const [products, setProducts] = useState();
    const [pagesMax, setPagesMax] = useState(0);
    const [orderBy, setOrderBy] = useState('');
    const [store, dispatch] = useStore();

    useEffect(() => {
        dispatch(actions.setNumberPage(1));
        fetch(`${API_FILTER}/get-filter?type=accessory`)
            .then((res) => res.json())
            .then((data) => setFilters(data));
        // const fetchApi = async () => {
        //     const res = await accessoryService.filter();
        //     setFilters(res);
        // };
        // fetchApi();
        document.title = 'Phụ kiện | VuTan-Mobile';
    }, []);
    useEffect(() => {
        fetchData(
            `${API_GET_PRODUCT}`,
            {
                filter: store.paramsApiFilter,
                price: store.filterPrice,
                type: 1,
                order: orderBy,
                page: store.numberPage,
                numberProduct: store.numberProductInPage,
            },
            'POST',
        ).then((res) => {
            setProducts(res.data);
            setPagesMax(Math.ceil(res.data.length / 9));
        });
        // fetchData(API_PRODUCT, { filter: store.paramsApiFilter, type: 1 }, 'POST').then((res) => {
        //     setProducts(res.data);
        //     setPagesMax(Math.ceil(res.data.length / 9));
        // });
    }, [store, orderBy]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('filters')}>
                {filters && filters.map((filter) => <Filters data={filter} key={filter.id} />)}
                <FilterPrice />
            </div>

            <div className={cx('content')}>
                <Sort setOrderBy={setOrderBy} />
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
