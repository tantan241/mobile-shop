import classNames from 'classnames/bind';
import Input from '~/components/Input';
import styles from './FormCart.module.scss';
const cx = classNames.bind(styles);
function FormCart() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Thông tin người nhận</div>
            <div className={cx('input-name-number')}>
                <div className={cx('input-name')}>
                    <Input text="Họ và tên" name="name" />
                </div>
                <div className={cx('input-number')}>
                    <Input text="Số điện thoại" type="number" name="phone" />
                </div>
            </div>
            <div className={cx('input-address')}>
                <Input
                    text="Địa chỉ cụ thế (Số nhà, tên đường - phường/xã - quận/huyện - tỉnh/thành phố)"
                    textarea
                    name="address"
                />
            </div>
            <Input text="Yêu cầu khác(Không bắt buộc)" textarea name="other" />
        </div>
    );
}

export default FormCart;
