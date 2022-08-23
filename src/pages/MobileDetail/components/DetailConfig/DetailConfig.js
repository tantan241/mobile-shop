import classNames from 'classnames/bind';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { actions } from '~/store';
import useStore from '~/store/hooks';
import MobileConfig from '../MobileConfig';
import styles from './DetailConfig.module.scss';
const cx = classNames.bind(styles);
function DetailConfig({ data }) {
    const [store, dispatch] = useStore();
    const price = (data.price - (data.price * data.discount) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const handleBuyNow = useCallback((id) => {
        dispatch(actions.addProductInCart({ idProduct: id, number: 1 }));
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('advertise')}>
                <img src="https://cdn.tgdd.vn/2022/08/banner/Banner---Desk-920x220.png" alt="Quảng cáo" />
            </div>
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

export default DetailConfig;
