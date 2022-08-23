import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import { actions } from '~/store';
import useStore from '~/store/hooks';
import styles from './ProductInCart.module.scss';
const cx = classNames.bind(styles);
function ProductInCart({ product }) {
    const [count, setCount] = useState(product && product.numberProduct);
    const [store, dispatch] = useStore();
    let number = product && product.numberProduct;
    const handleReduce = useCallback(() => {
        number -= 1;
        setCount(number);
        dispatch(actions.updateNumberProductBuy({ id: product.id, number }));
    }, []);
    const handleIncrease = useCallback(() => {
        number += 1;
        setCount(number);
        dispatch(actions.updateNumberProductBuy({ id: product.id, number }));
    }, []);
    const handleDelete = useCallback((id) => {
        dispatch(actions.deleteProductInCart(id));
    }, []);
    const priceCur = product && product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const priceReal =
        product &&
        (product.price - (product.price * product.discount) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return (
        <li className={cx('wrapper')}>
            {product && (
                <>
                    <div className={cx('infor')}>
                        <img className={cx('img')} src={product.path} alt="ảnh" />
                        <div className={cx('name')}>{product.name}</div>
                    </div>
                    <div>
                        <div className={cx('price')}>
                            <div className={cx('price-real')}>{priceReal} vnđ</div>
                            <div className={cx('price-current')}>{priceCur} vnđ</div>
                            <div className={cx('actions')}>
                                <button disabled={count <= 1} className={cx('subtract')} onClick={() => handleReduce()}>
                                    <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                                </button>
                                <div className={cx('number')}>{count}</div>
                                <button disabled={count >= 99} className={cx('add')} onClick={() => handleIncrease()}>
                                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                </button>
                            </div>
                            <div className={cx('delete')} onClick={() => handleDelete(product.id)}>
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </li>
    );
}

export default ProductInCart;
