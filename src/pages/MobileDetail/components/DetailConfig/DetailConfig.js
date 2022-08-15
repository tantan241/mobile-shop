import classNames from 'classnames/bind';
import MobileConfig from '../MobileConfig';
import styles from './DetailConfig.module.scss';
const cx = classNames.bind(styles);
function DetailConfig() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('advertise')}>
                <img src="https://cdn.tgdd.vn/2022/08/banner/Banner---Desk-920x220.png" alt="Quảng cáo" />
            </div>
            <button className={cx('buy-now')}>Mua ngay với giá 10.000.000 vnđ</button>
            <button className={cx('buy-installment')}>Trả góp với 0% lãi suất</button>
            <MobileConfig />
        </div>
    );
}

export default DetailConfig;
