import PropTypes, { number } from 'prop-types';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './MobileItem.module.scss';
import useStore from '~/store/hooks';
import { actions } from '~/store';
import Button from '~/components/Button';
import Rating from '~/components/Rating';
import Overlay from '../Overlay';
import Login from '~/layouts/MainLayout/components/Header/components/Login';
import { fetchData } from '~/common';
import { API_ADD_PRODUCT_GO_CART, API_CART } from '~/urlConfig';
import Loading from '../Loading';
import { PROFILE } from '~/constants';
import { URL_IMAGE } from '~/utils/urlConfig';
const cx = classNames.bind(styles);
function MobileItem({ product, l_5, l_3, m_4, m_2, s_2, buyNow }) {
    const [store, dispatch] = useStore();
    const [login, setLogin] = useState(false);
    const [openLoading, setOpenLoading] = useState(false);
    const [profile, setProfile] = useState({});
    const [ramAndRom, setRamAndRom] = useState([]);
    const moneyDiscount = (product.price * product.discount) / 100;
    const priceCurrent = (product.price - moneyDiscount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const priceOld = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const priceSaved = moneyDiscount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    let linkTo = `/product-detail/${product.slug}`;
    const specifications = product?.specifications || [];

    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem(PROFILE)) || {});

        const res = specifications.map((item) => {
            if (item.name === 'ram' || item.name === 'rom') {
                return item;
            }
        });
        setRamAndRom(res);
    }, []);
    const handleClose = useCallback(() => {
        setLogin(false);
    }, []);
    const handleClick = useCallback((product, e) => {
        dispatch(actions.setProduct(product));
    }, []);
    const handleBuyNow = useCallback(
        (id) => {
            const profile = JSON.parse(localStorage.getItem(PROFILE)) || {};
            if (Object.keys(profile).length > 0) {
                setOpenLoading(true);
                dispatch(actions.addProductInCart({ idProduct: id, number: 1 }));
                const user = {
                    user: profile?.id || '',
                    product: id,
                    number: 1,
                    price: product.price - moneyDiscount,
                };
                fetchData(`${API_ADD_PRODUCT_GO_CART}`, user, 'POST', true).then((res) => {
                    if (res.status === 200) {
                        setOpenLoading(false);
                    }
                });
            } else {
                setLogin(true);
            }
        },
        [store],
    );
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
            onClick={() => handleClick(product)}
        >
            <Link to={linkTo} className={cx('content')}>
                <img className={cx('image')} src={`${URL_IMAGE}/${product?.image}`} alt={product.name} />
                {product.discount > 0 && <div className={cx('discount')}>{product.discount}%</div>}
                <div className={cx('noti_specification')}>
                    <p className={cx('noti-1')}>Trả góp 0%</p>
                    {ramAndRom.length > 0 && (
                        <div className={cx('specifications')}>
                            {ramAndRom.map((item, index) => (
                                <div key={index} className={cx(`${item.name}`)}>
                                    {item.value}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
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

            {buyNow && product.number !== 0 && (
                <div className={cx('actions')}>
                    <div className={cx('actions-content')}>
                        <Button
                            className={cx('btn-buy-now')}
                            onClick={() => handleBuyNow(product.id)}
                            to={Object.keys(profile).length > 0 ? '/cart' : ''}
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
            {product.number === 0 ? (
                <div className={cx('overlay-item')} onClick={() => handleClick(product)}>
                    <Link to={linkTo} className={cx('overlay-item-wrapper')}>
                        <div className={cx('overlay-item-text')}>Đã hết hàng</div>
                    </Link>
                </div>
            ) : (
                ''
            )}

            {login && (
                <Overlay>
                    <Login handleClose={handleClose} setProfile={setProfile}></Login>
                </Overlay>
            )}
            <Loading open={openLoading}></Loading>
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
