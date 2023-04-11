import { IconButton } from '@mui/material';
import styles from './OrderDetail.module.scss';
import classNames from 'classnames/bind';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from 'react';
import { fetchData } from '~/common';
import { API_GET_ORDER_DETAIL } from '~/urlConfig';
import { URL_IMAGE } from '~/utils/urlConfig';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function OrderDetail() {
    const [order, setOrder] = useState({});
    useEffect(() => {
        let id = '';
        const path = window.location.pathname.split('/');

        if (path.length > 1) {
            id = path[2];
        }
        fetchData(API_GET_ORDER_DETAIL, { orderId: id }, 'POST', true).then((res) => {
            if (res.status === 200) {
                setOrder(res.data);
            }
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            {Object.keys(order).length > 0 && (
                <div className={cx('content')}>
                    <Link to="/order">
                        <IconButton aria-label="delete" style={{ color: 'black', fontSize: '2.4rem' }}>
                            <ArrowBackIcon fontSize="2.4rem" />
                            <div style={{ marginLeft: '10px' }}>Quay lại</div>
                        </IconButton>
                    </Link>

                    <div
                        className={cx(
                            'status',
                            order.status == 2
                                ? 'green'
                                : order.status == 0
                                ? 'yellow'
                                : order.status == 1
                                ? 'blue'
                                : '',
                        )}
                    >
                        {order.status == 2
                            ? 'Giao hàng thành công'
                            : order.status == 0
                            ? 'Đang xử lý'
                            : order.status == 1
                            ? 'Đang giao hàng'
                            : ''}
                    </div>
                    <div style={{ padding: '20px 0', display: 'flex' }}>
                        <LocationOnIcon style={{ fontSize: '25px' }}></LocationOnIcon>
                        <div style={{ lineHeight: '1.5' }}>
                            <div style={{ fontSize: '25px', lineHeight: '1', marginBottom: '10px' }}>
                                Địa chỉ nhận hàng
                            </div>
                            <div>{order.name}</div>
                            <div>{order.phone}</div>
                            <div>{order.address}</div>
                        </div>
                    </div>
                    {order.orderDetail.map((item) => (
                        <div className={cx('product-item')}>
                            <img src={`${URL_IMAGE}/${item.image}`} alt="" style={{ width: '20%' }} />
                            <div style={{ padding: '10px', flex: 1, position: 'relative' }}>
                                <div>{item.name}</div>
                                <div className={cx('content-number')}>
                                    <div style={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.6rem' }}>
                                        {item.specifications}
                                    </div>
                                    <div>x{item.number}</div>
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                    {(item.price - (item.price * item.discount) / 100)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                    VNĐ
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className={cx('footer')}>
                        <div>Tổng tiền thanh toán:</div>
                        <div>
                            {parseInt(order.totalMoney)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                            VNĐ
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderDetail;
