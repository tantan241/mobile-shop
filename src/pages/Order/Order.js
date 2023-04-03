import classNames from 'classnames/bind';
import Button from '~/components/Button';
import OrderItem from './Components/OrderItem';
import styles from './Order.module.scss';
import { useEffect, useState } from 'react';
import { fetchData } from '~/common';
import { API_GET_LIST_ORDER } from '~/urlConfig';
import { PROFILE } from '~/constants';
const cx = classNames.bind(styles);
function Order() {
    const [orders, setOrders] = useState([]);
    const profile = JSON.parse(localStorage.getItem(PROFILE));
    useEffect(() => {
        fetchData(`${API_GET_LIST_ORDER}?userId=${profile.id}`, {}, 'GET', true).then((res) => {
            if (res.status === 200) {
                setOrders(res.data);
            }
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <ul className={cx('order-list')}>
                    {orders.length > 0 && orders.map((item) => <OrderItem data={item} />)}
                </ul>
            </div>
        </div>
    );
}

export default Order;
