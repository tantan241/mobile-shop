import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faMobile, faMobileScreen, faSimCard } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);
function Navbar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar-list')}>
                <Link to="/" className={cx('navbar-item')}>
                    <i className={cx('icon')}>
                        {' '}
                        <FontAwesomeIcon icon={faMobileScreen}></FontAwesomeIcon>
                    </i>
                    <span className={cx('title')}> Điện thoại</span>
                </Link>
                <div className={cx('navbar-item')}>
                    <i className={cx('icon')}>
                        <FontAwesomeIcon icon={faHeadphones}></FontAwesomeIcon>
                    </i>
                    <span className={cx('title')}> Phụ kiện </span>
                </div>
                <Link to="/mobile-old" className={cx('navbar-item')}>
                    <i className={cx('icon')}>
                        <FontAwesomeIcon icon={faMobile}></FontAwesomeIcon>
                    </i>
                    <span className={cx('title')}>Máy cũ giá tốt</span>
                </Link>
                <div className={cx('navbar-item')}>
                    <i className={cx('icon')}>
                        <FontAwesomeIcon icon={faSimCard}></FontAwesomeIcon>
                    </i>
                    <span className={cx('title')}>Sim số đẹp</span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
