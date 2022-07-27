import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './MobileItem.module.scss';

const cx = classNames.bind(styles);

function MobileItem({ product, l_5, l_3, buyNow }) {
    const priceCurrent = product.price_current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const priceOld = product.price_old.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const priceSaved = (product.price_old - product.price_current).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const linkTo = `mobile-detail?id=${priceCurrent}`;
    return (
        <Link
            to={linkTo}
            className={cx('wrapper', {
                l_5,
                l_3,
            })}
        >
            <img className={cx('image')} src={product.path} alt={product.name} />
            <div className={cx('discount')}>{product.discount}%</div>
            <p className={cx('noti-1')}>Trả góp 0%</p>
            <span className={cx('name')}>{product.name}</span>
            <div className={cx('price')}>
                <span className={cx('price-current')}>{priceCurrent} vnđ</span>
                <span className={cx('price-old')}>{priceOld} vnđ</span>
            </div>
            <p className={cx('price-saved')}>Tiết kiếm: {priceSaved} vnđ </p>
            <div className={cx('noti-2')}>Mua online giảm thêm đến 1.000.000 vnđ</div>
            {buyNow && (
                <div className={cx('footer')}>
                    <div className={cx('footer-content')}>
                        <button className={cx('btn-buy')}>
                            <span className={cx('btn-buy-title')}>Mua ngay</span>
                            <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon>
                        </button>
                        <button className={cx('btn-compare')}>So sánh</button>
                    </div>
                </div>
            )}
        </Link>
    );
}
MobileItem.propTypes = {
    product: PropTypes.object.isRequired,
    l_3: PropTypes.bool,
    l_5: PropTypes.bool,
    buyNow: PropTypes.bool,
};
export default MobileItem;
