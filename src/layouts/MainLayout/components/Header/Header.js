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
import { API_CART, API_COUNT_ORDER, API_GET_INFO_CART } from '~/urlConfig';
import { PROFILE } from '~/constants';
const cx = classNames.bind(styles);
function Header() {
    const [store, dispatch] = useStore();
    const [login, setLogin] = useState(false);
    const [profile, setProfile] = useState({});
    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem(PROFILE)) || {});
    }, [store.reload]);
    const handleClose = useCallback(() => {
        setLogin(false);
    }, []);
    const handleCartOnClick = useCallback(
        (id) => {
            const profile = JSON.parse(localStorage.getItem(PROFILE)) || {};
            if (Object.keys(profile).length === 0) {
                setLogin(true);
            }
        },
        [store],
    );
    useEffect(() => {
        if (Object.keys(profile).length > 0) {
            fetchData(`${API_GET_INFO_CART}?id=${profile?.id}`, '', 'GET', true).then((res) => {
                if (res.status === 200) {
                    dispatch(actions.addProductInCart(res.data.length));
                }
            });
            fetchData(`${API_COUNT_ORDER}?user=${profile?.id}`, '', 'GET', true).then((res) => {
                if (res.status === 200) {
                    dispatch(actions.countOrder(res.count));
                }
            });
        }
    }, [profile?.id, store.reload]);
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
                        to={Object.keys(profile).length > 0 ? '/cart' : ''}
                        className={cx('cart')}
                        onClick={handleCartOnClick}
                    >
                        <FontAwesomeIcon className={cx('icon-cart')} icon={faCartShopping}></FontAwesomeIcon>
                        {store.productsInCart > 0 && <span className={cx('number')}>{store.productsInCart}</span>}

                        <span className={cx('title', 'hidden')}>Giỏ hàng</span>
                    </Link>
                    {Object.keys(profile).length > 0 ? (
                        <Link to={'/order'} className={cx('order')}>
                            <FontAwesomeIcon className={cx('icon-order')} icon={faFileInvoice}></FontAwesomeIcon>
                            <span className={cx('title', 'hidden')}>Đơn hàng</span>
                            {store.countOrder > 0 ? <span className={cx('number')}>{store.countOrder}</span> : ''}
                        </Link>
                    ) : (
                        ''
                    )}

                    {Object.keys(profile).length > 0 ? (
                        <Tippy
                            interactive="true"
                            placement="bottom"
                            trigger="click"
                            render={(attrs) => (
                                <div className={cx('logout')} tabIndex="-1" {...attrs}>
                                    <Logout setProfile={setProfile} />
                                </div>
                            )}
                        >
                            <div className={cx('user')}>
                                <img className={cx('avatar')} src={profile?.imageUrl} alt="" />
                                <p className={cx('name', 'hidden')}>{profile?.fullName}</p>
                            </div>
                        </Tippy>
                    ) : (
                        <div
                            className={cx('account')}
                            onClick={() => {
                                setLogin(true);
                            }}
                        >
                            <FontAwesomeIcon className={cx('icon-account')} icon={faUser}></FontAwesomeIcon>
                            <span className={cx('title')}>Đăng nhập</span>
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('search-mobile')}>
                <Search />
            </div>
            <Navbar />
            {login ? (
                <Overlay>
                    <Login handleClose={handleClose} setProfile={setProfile}></Login>
                </Overlay>
            ) : (
                ''
            )}
        </div>
    );
}

export default Header;
