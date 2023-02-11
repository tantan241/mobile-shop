import classNames from 'classnames/bind';
import styles from './OrderItem.module.scss';
import Button from '~/components/Button';
const cx = classNames.bind(styles);
function OrderItem() {
    return (
        <li className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('code')}>33333</div>
                <Button primary className={cx('detail')}>
                    Xem chi tiết
                </Button>
            </div>
            <div className={cx('note')}>Giao thành công</div>
            <div className={cx('information-list')}>
                <div className={cx('information-item')}>
                    <div className={cx('label')}>Họ và tên:</div>
                    <div className={cx('information')}>Vũ Viêt Tân</div>
                </div>
                <div className={cx('information-item')}>
                    <div className={cx('label')}>Số điện thoại:</div>
                    <div className={cx('information')}>000000000</div>
                </div>
                <div className={cx('information-item')}>
                    <div className={cx('label')}>Địa chỉ nhận hàng:</div>
                    <div className={cx('information')}>
                        Trung Nghĩa ,Tp Hưng Yên Trung Nghĩa ,Tp Hưng Yên Trung Nghĩa ,Tp Hưng Yên
                    </div>
                </div>
                <div className={cx('information-item')}>
                    <div className={cx('label')}>Số lượng:</div>
                    <div className={cx('information')}>3</div>
                </div>
                <div className={cx('information-item')}>
                    <div className={cx('label')}>Tổng tiền:</div>
                    <div className={cx('information')}>20.000.000 vnđ</div>
                </div>
            </div>
        </li>
    );
}

export default OrderItem;
