import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './SearchPage.module.scss';
import useStore from '~/store/hooks';
import * as homeService from '~/apiServices/homeService';
import AccessoryItem from '../Accessory/components/AccessoryItem';
import MobileItem from '../Mobile/components/MobileItem';
import MobilePages from '../../components/Pages';
const cx = classNames.bind(styles);
function SearchPage() {
    const [store, dispatch] = useStore();
    const [products, setProducts] = useState([]);
    const [pagesMax, setPagesMax] = useState(0);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await homeService.products(store.paramsApiFilter);
            setProducts(res);
            setPagesMax(Math.ceil(res.length / 15));
        };
        fetchApi();
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
                                    <AccessoryItem l_5 key={product.id} product={product} />
                                ) : (
                                    <MobileItem l_5 key={product.id} product={product} />
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
