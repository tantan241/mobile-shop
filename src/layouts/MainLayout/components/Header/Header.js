import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import Navbar from '../Navbar';
import Search from '../Search';

const cx = classNames.bind(styles);
function Header() {
    const isSignIn = true;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <img
                    className={cx('image')}
                    src="https://cdn.nguyenkimmall.com/images/companies/_1/html/2017/T11/homepage/Logo_NK.svg?v=2020"
                    alt="Logo"
                />
                <Search />
                <div className={cx('cart-account')}>
                    <div className={cx('cart')}>
                        <FontAwesomeIcon className={cx('icon-cart')} icon={faCartShopping}></FontAwesomeIcon>
                        <span className={cx('number')}>3</span>
                        <span className={cx('title')}>Giỏ hàng</span>
                    </div>
                    {isSignIn ? (
                        <div className={cx('user')}>
                            <img
                                className={cx('avatar')}
                                src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                                alt="avater"
                            />
                            <p className={cx('name')}>Nguyễn Văn A</p>
                        </div>
                    ) : (
                        <div className={cx('account')}>
                            <FontAwesomeIcon className={cx('icon-account')} icon={faUser}></FontAwesomeIcon>
                            <span className={cx('title')}>Tài khoản</span>
                        </div>
                    )}
                    {/* <div className={cx('account')}>
                        <FontAwesomeIcon className={cx('icon-account')} icon={faUser}></FontAwesomeIcon>
                        <span className={cx('title')}>Tài khoản</span>
                    </div> */}
                </div>
            </div>
            <Navbar />
        </div>
    );
}

export default Header;
