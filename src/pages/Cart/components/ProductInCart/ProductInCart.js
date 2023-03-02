import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import { actions } from '~/store';
import useStore from '~/store/hooks';
import styles from './ProductInCart.module.scss';
import { fetchData } from '~/common';
import { API_CART, API_PRODUCT } from '~/urlConfig';
import Loading from '~/components/Loading';
const cx = classNames.bind(styles);
function ProductInCart({ product, reload }) {
    const [count, setCount] = useState(product && product.number);
    const [store, dispatch] = useStore();
    const [open, setOpen] = useState(false);
    const handleReduce = useCallback(() => {
        setOpen(true);
        fetchData(
            `${API_CART}/update-cart/`,
            { userId: store?.profileUser?.id, productId: product.product, type: 0 },
            'POST',
            true,
        ).then((res) => {
            if (res.status === 200) {
                setCount(res.data?.number);
                reload(new Date() * 1);
                setOpen(false);
            }
        });
    }, [product]);
    const handleIncrease = useCallback(() => {
        setOpen(true);
        fetchData(
            `${API_CART}/update-cart/`,
            { userId: store?.profileUser?.id, productId: product.product, type: 1 },
            'POST',
            true,
        ).then((res) => {
            if (res.status === 200) {
                setCount(res.data?.number);
                reload(new Date() * 1);
                setOpen(false);
            }
        });
    }, []);
    const handleDelete = useCallback(
        (productId) => {
            setOpen(true);
            fetchData(`${API_CART}/delete-cart/`, { userId: store?.profileUser?.id, productId }, 'POST', true).then(
                (res) => {
                    if (res.status === 200) {
                        setOpen(false);
                        reload(new Date() * 1);
                    }
                },
            );
        },
        [product.product],
    );
    console.log(product);
    const priceCur = product && product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const priceReal =
        product &&
        (product.price - (product.price * product.discount) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return (
        <li className={cx('wrapper')}>
            {product && (
                <>
                    <div className={cx('infor')}>
                        <img className={cx('img')} src={product.image} alt="ảnh" />
                        <div className={cx('name')}>{product.name}</div>
                    </div>
                    <div className={'price-actions'}>
                        <div className={cx('price')}>
                            <div className={cx('price-real')}>{priceReal} vnđ</div>
                            {product.discount > 0 && <div className={cx('price-current')}>{priceCur} vnđ</div>}
                            <div className={cx('actions')}>
                                <button disabled={count <= 1} className={cx('subtract')} onClick={() => handleReduce()}>
                                    <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                                </button>
                                <div className={cx('number')}>{count}</div>
                                <button disabled={count >= 99} className={cx('add')} onClick={() => handleIncrease()}>
                                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                </button>
                            </div>
                            <div className={cx('delete')} onClick={() => handleDelete(product.product)}>
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Loading open={open}></Loading>
        </li>
    );
}
ProductInCart.propTypes = {
    product: PropTypes.object,
};

export default ProductInCart;
