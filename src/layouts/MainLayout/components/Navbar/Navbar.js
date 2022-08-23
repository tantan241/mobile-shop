import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faHouse, faMobileScreen, faNewspaper } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);
function Navbar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar-list')}>
                <Link to="/" className={cx('navbar-item')}>
                    <i className={cx('icon')}>
                        <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
                    </i>
                    <span className={cx('title')}> Trang chủ</span>
                </Link>
                <Link to="/cart" className={cx('navbar-item')}>
                    <i className={cx('icon')}>
                        <FontAwesomeIcon icon={faMobileScreen}></FontAwesomeIcon>
                    </i>
                    <span className={cx('title')}> Điện thoại</span>
                </Link>
                <Link to="/" className={cx('navbar-item')}>
                    <i className={cx('icon')}>
                        <FontAwesomeIcon icon={faHeadphones}></FontAwesomeIcon>
                    </i>
                    <span className={cx('title')}>Phụ kiện </span>
                </Link>
                <Link to="/" className={cx('navbar-item')}>
                    <i className={cx('icon')}>
                        <FontAwesomeIcon icon={faNewspaper}></FontAwesomeIcon>
                    </i>
                    <span className={cx('title')}>Liên hệ</span>
                </Link>
                {/* <div className={cx('navbar-item')}>
                    <i className={cx('icon')}>
                        <FontAwesomeIcon icon={faSimCard}></FontAwesomeIcon>
                    </i>
                    <span className={cx('title')}>Sim số đẹp</span>
                </div> */}
            </div>
        </div>
    );
}

export default Navbar;
