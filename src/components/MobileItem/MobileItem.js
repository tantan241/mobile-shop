import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './MobileItem.module.scss';
import useStore from '~/store/hooks';
import { actions } from '~/store';
import Button from '~/components/Button';
import Rating from '~/components/Rating';
const cx = classNames.bind(styles);
function MobileItem({ product, l_5, l_3, m_4, m_2, s_2, buyNow }) {
    const [store, dispatch] = useStore();
    const moneyDiscount = (product.price * product.discount) / 100;
    const priceCurrent = (product.price - moneyDiscount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const priceOld = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const priceSaved = moneyDiscount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    let linkTo = `/product-detail/${product.slug}`;
    const handleClick = useCallback((productId, e) => {
        dispatch(actions.setIdProduct(productId));
    }, []);
    const handleBuyNow = useCallback((id) => {
        dispatch(actions.addProductInCart({ idProduct: id, number: 1 }));
    }, []);
    const handCompareClick = useCallback((id, type) => {
        dispatch(actions.setProductCompare({ id, type }));
    }, []);
    return (
        <div
            className={cx('wrapper', {
                l_5,
                l_3,
                m_4,
                m_2,
                s_2,
            })}
            onClick={() => handleClick(product.id)}
        >
            <Link to={linkTo} className={cx('content')}>
                <img className={cx('image')} src={product.path} alt={product.name} />
                {product.discount > 0 && <div className={cx('discount')}>{product.discount}%</div>}
                <p className={cx('noti-1')}>Trả góp 0%</p>
                <span className={cx('name')}>{product.name}</span>
                <div className={cx('price')}>
                    <span className={cx('price-current')}>{priceCurrent} vnđ</span>
                    <span className={cx('price-old')}>{priceOld} vnđ</span>
                </div>
                <p className={cx('price-saved')}>Tiết kiệm: {priceSaved} vnđ </p>
                {product.rating && (
                    <div className={cx('rating')}>
                        <Rating number={product.rating} />
                        <span className={cx('number-rating')}>{product.rating_number}</span>
                    </div>
                )}

                {product.note && <div className={cx('noti-2')}>{product.note}</div>}
            </Link>

            {buyNow && (
                <div className={cx('actions')}>
                    <div className={cx('actions-content')}>
                        <Button
                            className={cx('btn-buy-now')}
                            onClick={() => handleBuyNow(product.id)}
                            to="/cart"
                            primary
                            rightIcon={<FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>}
                        >
                            Mua ngay
                        </Button>
                        <Button
                            className={cx('btn-compare')}
                            to="/compare"
                            onClick={() => handCompareClick(product.id, product.type)}
                        >
                            So sánh
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
MobileItem.propTypes = {
    product: PropTypes.object.isRequired,
    l_3: PropTypes.bool,
    l_5: PropTypes.bool,
    buyNow: PropTypes.bool,
};
export default MobileItem;
