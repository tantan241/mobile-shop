import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Navbar from '../Navbar';
import Search from '../Search';
import useStore from '~/store/hooks';
import Overlay from '~/components/Overlay';
import logo from '~/images/Tan.png';
import Login from '~/layouts/MainLayout/components/Header/components/Login';
import Logout from './components/Logout';
import { actions } from '~/store';
const cx = classNames.bind(styles);
function Header() {
    const [store, dispatch] = useStore();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Link to="/">
                    <img className={cx('image')} src={logo} alt="Logo" />
                </Link>
                <Search />
                <div className={cx('cart-account')}>
                    <Link to="/cart" className={cx('cart')}>
                        <FontAwesomeIcon className={cx('icon-cart')} icon={faCartShopping}></FontAwesomeIcon>
                        {store.productsInCart.length > 0 && (
                            <span className={cx('number')}>{store.productsInCart.length}</span>
                        )}

                        <span className={cx('title')}>Giỏ hàng</span>
                    </Link>
                    {Object.keys(store.profileUser).length > 0 ? (
                        <Tippy
                            interactive="true"
                            placement="bottom"
                            trigger="click"
                            render={(attrs) => (
                                <div className={cx('logout')} tabIndex="-1" {...attrs}>
                                    <Logout />
                                </div>
                            )}
                        >
                            <div className={cx('user')}>
                                <img className={cx('avatar')} src={store.profileUser.imageUrl} alt="avatar" />
                                <p className={cx('name')}>{store.profileUser.name}</p>
                            </div>
                        </Tippy>
                    ) : (
                        <div className={cx('account')} onClick={() => dispatch(actions.setIsLogin(true))}>
                            <FontAwesomeIcon className={cx('icon-account')} icon={faUser}></FontAwesomeIcon>
                            <span className={cx('title')}>Đăng nhập</span>
                        </div>
                    )}
                </div>
                {store.isLogin && (
                    <Overlay>
                        <Login />
                    </Overlay>
                )}
            </div>
            <Navbar />
        </div>
    );
}

export default Header;
