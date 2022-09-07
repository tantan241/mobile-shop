import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './NoCart.module.scss';
const cx = classNames.bind(styles);
function NoCart() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('header')}>Chưa có sản phẩm nào trong giỏ hàng</h1>
            <h2 className={cx('text')}>
                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                <Link to="/"> &nbsp;Tìm sản phẩm</Link>
            </h2>
        </div>
    );
}

export default NoCart;
