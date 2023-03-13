import { useCallback, useEffect, useState } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import useStore from '~/store/hooks';
import styles from './Cart.module.scss';
import ProductInCart from './components/ProductInCart';
import * as cartServices from '~/apiServices/cartServices';
import { CART, PROFILE } from '~/constants';
import NoCart from './components/NoCart';
import FormCart from './components/FormCart';
import Overlay from '~/components/Overlay';
import Loading from '~/components/Loading';
import { fetchData } from '~/common';
import { API_CART, API_GET_INFO_CART } from '~/urlConfig';
import { actions } from '~/store';
const cx = classNames.bind(styles);
function Cart() {
    const [store, dispatch] = useStore();
    const [products, setProducts] = useState([]);
    const [openLoading, setOpenLoading] = useState(false);
    const [totalMoney, setTotalMoney] = useState(0);
    const [profile, setProfile] = useState({});

    const [reload, setReload] = useState(0);
    useEffect(() => {
        document.title = 'Giỏ hàng | VuTan-Mobile';
        setProfile(JSON.parse(localStorage.getItem(PROFILE)) || {});
    }, []);
    useEffect(() => {
        console.log(222);
        setOpenLoading(true);
        profile?.id &&
            fetchData(`${API_GET_INFO_CART}?id=${profile?.id}`, '', 'GET', true).then((res) => {
                if (res.status === 200) {
                    setProducts(res.data);
                    setOpenLoading(false);
                    dispatch(actions.addProductInCart(res.data.length));
                    const total = res.data.reduce((sum, product) => {
                        return (sum += (product.price - (product.price * product.discount) / 100) * product.number);
                    }, 0);
                    setTotalMoney(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
                }
            });
    }, [profile?.id, reload, store.reload]);

    return (
        <>
            {products.length > 0 ? (
                <div className={cx('wrapper')}>
                    <div className={cx('center')}>
                        <Link to="/" className={cx('header')}>
                            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> &nbsp; Mua thêm sản phẩm
                        </Link>
                        <div className={cx('content')}>
                            <ul className={cx('product-list')}>
                                {products &&
                                    products.map((product) => (
                                        <ProductInCart
                                            key={product.id}
                                            product={product}
                                            reload={(a) => {
                                                setReload(a);
                                            }}
                                        />
                                    ))}
                            </ul>
                            <div className={cx('total')}>
                                <div className={cx('quantity')}>
                                    Tổng tiền ({products && products.length} sản phẩm) :
                                </div>
                                <div className={cx('money-total')}>{totalMoney} vnđ</div>
                            </div>
                            <FormCart totalMoney={totalMoney} products={products} />
                        </div>
                    </div>
                </div>
            ) : (
                <NoCart />
            )}
            <Loading open={openLoading}></Loading>
        </>
    );
}

export default Cart;
