import PropTypes from 'prop-types';
import { useCallback } from 'react';

import classNames from 'classnames/bind';
import styles from './DetailConfig.module.scss';
import Advertise from '~/components/Advertise';
import Button from '~/components/Button';
import { actions } from '~/store';
import useStore from '~/store/hooks';
import MobileConfig from '../ProductConfig';
const cx = classNames.bind(styles);
function DetailConfig({ data }) {
    const [store, dispatch] = useStore();
    const price = (data.price - (data.price * data.discount) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const handleBuyNow = useCallback((id) => {
        dispatch(actions.addProductInCart({ idProduct: id, number: 1 }));
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Advertise width="100%" src="https://cdn.tgdd.vn/2022/08/banner/Banner---Desk-920x220.png" />
            <Button to="/cart" big primary width="100%" onClick={() => handleBuyNow(data.id)}>
                Mua ngay với giá {price} vnđ
            </Button>
            <Button to="/notification" big width="100%">
                Trả góp với 0% lãi suất
            </Button>
            <MobileConfig configs={data.data} name={data.name} />
        </div>
    );
}
DetailConfig.propTypes = {
    data: PropTypes.object,
};

export default DetailConfig;