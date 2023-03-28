import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './DetailConfig.module.scss';
import Advertise from '~/pages/Advertise';
import Button from '~/components/Button';
import { actions } from '~/store';
import useStore from '~/store/hooks';
import MobileConfig from '../ProductConfig';
import { PROFILE } from '~/constants';
import { fetchData } from '~/common';
import { API_ADD_PRODUCT_GO_CART } from '~/urlConfig';
import Overlay from '~/components/Overlay';
import { Login } from '@mui/icons-material';
import Loading from '~/components/Loading';
const cx = classNames.bind(styles);
function DetailConfig({ data }) {
    const [store, dispatch] = useStore();
    const [openLoading, setOpenLoading] = useState(false);
    const [login, setLogin] = useState(false);
    const [profile, setProfile] = useState({});
    const price = data.price - (data.price * data.discount) / 100;
    const price_str = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const configs = data.specifications ? data.specifications : [];
    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem(PROFILE)) || {});
    }, [store]);
    const handleClose = useCallback(() => {
        setLogin(false);
    }, []);

    const handleBuyNow = useCallback(
        (id) => {
            // dispatch(actions.addProductInCart({ idProduct: id, number: 1 }));
            if (Object.keys(profile).length > 0) {
                setOpenLoading(true);
                dispatch(actions.addProductInCart({ idProduct: id, number: 1 }));
                const user = {
                    user: profile?.id || '',
                    product: id,
                    number: 1,
                    price: price,
                };
                fetchData(`${API_ADD_PRODUCT_GO_CART}`, user, 'POST', true).then((res) => {
                    if (res.status === 200) {
                        setOpenLoading(false);
                        dispatch(actions.setReload(new Date() * 1));
                    }
                });
            } else {
                setLogin(true);
            }
        },
        [price],
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('advertise')}>
                <Advertise width="100%" src="https://cdn.tgdd.vn/2022/08/banner/Banner---Desk-920x220.png" />
            </div>
            {data.number === 0 ? (
                ''
            ) : (
                <>
                    {' '}
                    <Button
                        className={cx('btn-buy-now')}
                        to="/cart"
                        big
                        primary
                        width="100%"
                        onClick={() => handleBuyNow(data.id)}
                    >
                        Mua ngay với giá {price_str} vnđ
                    </Button>
                    <Button to="/notification" big width="100%">
                        Trả góp với 0% lãi suất
                    </Button>
                </>
            )}

            <MobileConfig configs={configs} name={data.name} />
            {login && (
                <Overlay>
                    <Login handleClose={handleClose} setProfile={setProfile}></Login>
                </Overlay>
            )}
            <Loading open={openLoading}></Loading>
        </div>
    );
}
DetailConfig.propTypes = {
    data: PropTypes.object,
};

export default DetailConfig;
