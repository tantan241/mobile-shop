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
import { fetchData, handleClickVariant } from '~/common';
import { API_FILTER, API_GET_PRODUCT, API_PRODUCT } from '~/urlConfig';
import { useSnackbar } from 'notistack';
import { URL } from '~/utils/urlConfig';
const cx = classNames.bind(styles);
function Home() {
    const { enqueueSnackbar } = useSnackbar();
    const [store, dispatch] = useStore();
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);
    const [pagesMax, setPagesMax] = useState(0);
    const [orderBy, setOrderBy] = useState('');
    useEffect(() => {
        dispatch(actions.setFilterPrice({ fromPrice: 0, toPrice: 0 }));
    }, []);
    useEffect(() => {
        dispatch(actions.setNumberPage(1));
        fetch(`${API_FILTER}/get-filter?type=home`)
            .then((res) => res.json())
            .then((data) => {
                setFilters(data);
            });
        // const fetchApi = async () => {
        //     const res = await homeService.filterHome();
        //     setFilters(res);
        // };
        // fetchApi();
        document.title = 'VuTan-Mobile';
    }, []);

    useEffect(() => {
        fetchData(
            `${API_GET_PRODUCT}`,
            {
                filter: store.paramsApiFilter,
                price: store.filterPrice,
                order: orderBy,
                page: store.numberPage,
                numberProduct: store.numberProductInPage,
            },
            'POST',
        ).then((res) => {
            res.status === 400 && handleClickVariant('error', res.messenger, enqueueSnackbar);
            if (res.status === 200) {
                setProducts(res.data);
                setPagesMax(Math.ceil(res.data.length / 9));
            }
        });
    }, [store, orderBy]);
    return (
        <div className={cx('wrapper')}>
            <MostBuy />
            <div className={cx('content')}>
                <div className={cx('filters')}>
                    {filters.length > 0 && filters.map((filter) => <Filters data={filter} key={filter.id} />)}
                    <FilterPrice />
                </div>
                <div className={cx('products')}>
                    <Sort setOrderBy={setOrderBy} />
                    <div className={cx('products-content')}>
                        {products.length > 0 &&
                            products
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
