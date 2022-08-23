import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import Navbar from '../Navbar';
import Search from '../Search';
import useStore from '~/store/hooks';
import Overlay from '~/components/Overlay';
import LoginAndLogout from '~/pages/LoginAndLogout';

const cx = classNames.bind(styles);
function Header() {
    const isSignIn = false;
    const [store, dispatch] = useStore();
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
                    <Link to="/cart" className={cx('cart')}>
                        <FontAwesomeIcon className={cx('icon-cart')} icon={faCartShopping}></FontAwesomeIcon>
                        {store.productsInCart.length > 0 && (
                            <span className={cx('number')}>{store.productsInCart.length}</span>
                        )}

                        <span className={cx('title')}>Giỏ hàng</span>
                    </Link>
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
                </div>
                {/* <Overlay>
                    <LoginAndLogout />
                </Overlay> */}
            </div>
            <Navbar />
        </div>
    );
}

export default Header;
