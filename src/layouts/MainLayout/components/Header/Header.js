import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
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
import { useCallback, useEffect, useState } from 'react';
import { fetchData } from '~/common';
import { API_CART } from '~/urlConfig';
const cx = classNames.bind(styles);
function Header() {
    const [store, dispatch] = useStore();
    const [login, setLogin] = useState(false);
    const handleClose = useCallback(() => {
        setLogin(false);
    }, []);
    const handleCartOnClick = useCallback(
        (id) => {
            if (Object.keys(store.profileUser).length === 0) {
                setLogin(true);
            }
        },
        [store],
    );
    useEffect(() => {
        fetchData(`${API_CART}/get-cart?id=${store?.profileUser?.id}`, '', 'GET', true).then((res) => {
            if (res.status === 200) {
                dispatch(actions.addProductInCart(res.data.length));
            }
        });
    }, [store.profileUser]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Link to="/" className={cx('logo')}>
                    <img className={cx('image')} src={logo} alt="Logo" />
                </Link>
                <div className={cx('search')}>
                    <Search />
                </div>
                <div className={cx('cart-account')}>
                    <Link
                        to={Object.keys(store.profileUser).length > 0 ? '/cart' : ''}
                        className={cx('cart')}
                        onClick={handleCartOnClick}
                    >
                        <FontAwesomeIcon className={cx('icon-cart')} icon={faCartShopping}></FontAwesomeIcon>
                        {store.productsInCart > 0 && <span className={cx('number')}>{store.productsInCart}</span>}

                        <span className={cx('title', 'hidden')}>Giỏ hàng</span>
                    </Link>
                    {Object.keys(store.profileUser).length > 0 ? (
                        <Link to={'/order'} className={cx('order')}>
                            <FontAwesomeIcon className={cx('icon-order')} icon={faFileInvoice}></FontAwesomeIcon>
                            <span className={cx('title', 'hidden')}>Đơn hàng</span>
                        </Link>
                    ) : (
                        ''
                    )}

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
                                <img className={cx('avatar')} src={store.profileUser?.imageUrl} alt="" />
                                <p className={cx('name', 'hidden')}>{store.profileUser?.fullName}</p>
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
            <div className={cx('search-mobile')}>
                <Search />
            </div>
            <Navbar />
            {login && (
                <Overlay>
                    <Login handleClose={handleClose}></Login>
                </Overlay>
            )}
        </div>
    );
}

export default Header;
