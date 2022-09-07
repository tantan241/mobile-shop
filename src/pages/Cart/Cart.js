import { useEffect, useState } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import Button from '~/components/Button';
import useStore from '~/store/hooks';
import styles from './Cart.module.scss';
import ProductInCart from './components/ProductInCart';
import * as cartServices from '~/apiServices/cartServices';
import { CART } from '~/constants';
import NoCart from './components/NoCart';
import FormCart from './components/FormCart';
const cx = classNames.bind(styles);
function Cart() {
    const [store, dispatch] = useStore();
    const [products, setProduct] = useState();
    const [totalMoney, setTotalMoney] = useState(0);
    useEffect(() => {
        localStorage.setItem(CART, JSON.stringify(store.productsInCart));
    }, [store.productsInCart]);

    useEffect(() => {
        if (store.productsInCart) {
            const productsId = store.productsInCart.map((product) => product.idProduct);
            const fetchApi = async () => {
                const productsInCart = [];
                const res = await cartServices.products({ id: productsId });
                res.map((product) => {
                    for (const item of store.productsInCart) {
                        product.id === item.idProduct &&
                            productsInCart.push({ ...product, numberProduct: item.number });
                    }
                });

                const total = productsInCart.reduce((sum, product) => {
                    return (sum += (product.price - (product.price * product.discount) / 100) * product.numberProduct);
                }, 0);
                setTotalMoney(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
                setProduct(productsInCart);
            };
            fetchApi();
        }
    }, [store]);
    return (
        <>
            {store.productsInCart.length > 0 ? (
                <div className={cx('wrapper')}>
                    <div className={cx('center')}>
                        <Link to="/" className={cx('header')}>
                            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> &nbsp; Mua thêm sản phẩm
                        </Link>
                        <div className={cx('content')}>
                            <ul className={cx('product-list')}>
                                {products &&
                                    products.map((product) => <ProductInCart key={product.id} product={product} />)}
                            </ul>
                            <div className={cx('total')}>
                                <div className={cx('quantity')}>
                                    Tổng tiền ({products && products.length} sản phẩm) :
                                </div>
                                <div className={cx('money-total')}>{totalMoney} vnđ</div>
                            </div>
                            <FormCart />
                            <div className={cx('action')}>
                                <Button primary>Đặt hàng</Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <NoCart />
            )}
        </>
    );
}

export default Cart;
