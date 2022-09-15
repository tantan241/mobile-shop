import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';

import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Rating from '~/components/Rating';
import { actions } from '~/store';
import useStore from '~/store/hooks';
import styles from './AccessoryItem.module.scss';
const cx = classNames.bind(styles);
function AccessoryItem({ product, l_5, m_2, m_4, s_2, buyNow }) {
    const [store, dispatch] = useStore();
    const price_cur = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const price_real = (product.price - (product.price * product.discount) / 100)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const handleClick = useCallback((productId) => {
        dispatch(actions.setIdProduct(productId));
    }, []);
    const handleBuy = useCallback((id) => {
        dispatch(actions.addProductInCart({ idProduct: id, number: 1 }));
    }, []);
    const handleCompareClick = useCallback((id, type, type_accessory) => {
        dispatch(actions.setProductCompare({ id, type, type_accessory }));
    }, []);
    let linkTo = `/product-detail/${product.slug}`;
    return (
        <div
            className={cx('wrapper', {
                l_5,
                m_2,
                m_4,
                s_2,
            })}
            onClick={() => handleClick(product.id)}
        >
            <Link to={linkTo}>
                <img className={cx('img')} alt="ảnh" src={product.path} />
                <div className={cx('content')}>
                    <p className={cx('name')}>{product.name}</p>
                    <div className={cx('price_cur-discount')}>
                        <div className={cx('price-cur')}>{price_cur} vnđ</div>
                        <p className={cx('discount')}>-{product.discount}%</p>
                    </div>
                    <div className={cx('price-real')}>{price_real} vnđ</div>
                    <div className={cx('rating')}>
                        <Rating number={product.rating} />
                        <span className={cx('number-rating')}>{product.rating_number}</span>
                    </div>
                </div>
            </Link>
            {buyNow && (
                <div className={cx('actions')}>
                    <div className={cx('actions-content')}>
                        <Button
                            className={cx('btn-buy-now')}
                            onClick={() => handleBuy(product.id)}
                            to="/cart"
                            primary
                            rightIcon={<FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>}
                        >
                            Mua ngay
                        </Button>

                        <Button
                            className={cx('btn-compare')}
                            onClick={() => handleCompareClick(product.id, product.type, product.type_accessory)}
                            to="/compare"
                        >
                            So sánh
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
AccessoryItem.propTypes = {
    product: PropTypes.object,
    l_5: PropTypes.bool,
    buyNow: PropTypes.bool,
};

export default AccessoryItem;
