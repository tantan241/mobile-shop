import classNames from 'classnames/bind';
import Button from '~/components/Button';
import OrderItem from './Components/OrderItem';
import styles from './Order.module.scss';
const cx = classNames.bind(styles);
function Order() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <ul className={cx('order-list')}>
                    <OrderItem />
                    <OrderItem />
                    <OrderItem />
                </ul>
            </div>
        </div>
    );
}

export default Order;
