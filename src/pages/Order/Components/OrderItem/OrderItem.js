import classNames from 'classnames/bind';
import styles from './OrderItem.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import moment from 'moment';
const cx = classNames.bind(styles);
function OrderItem(props) {
    const { data } = props;

    return (
        <li className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('code')}>#{data.id}</div>
                <Button primary className={cx('detail')}>
                    Xem chi tiết
                </Button>
            </div>
            <div
                className={cx(
                    'note',
                    data.status == 2 ? 'green' : data.status == 0 ? 'yellow' : data.status == 1 ? 'blue' : '',
                )}
            >
                {data.status == 2
                    ? 'Giao hàng thành công'
                    : data.status == 0
                    ? 'Đang xử lý'
                    : data.status == 1
                    ? 'Đang giao hàng'
                    : ''}
            </div>
            <div className={cx('information-list')}>
                <div className={cx('information-item')}>
                    <div className={cx('label')}>Ngày lập:</div>
                    <div className={cx('information')}>{moment(data.createdAt).format('HH:mm [ngày] DD-MM-YYYY')}</div>
                </div>
                <div className={cx('information-item')}>
                    <div className={cx('label')}>Họ và tên:</div>
                    <div className={cx('information')}>{data.name}</div>
                </div>
                <div className={cx('information-item')}>
                    <div className={cx('label')}>Số điện thoại:</div>
                    <div className={cx('information')}>{data.phone}</div>
                </div>
                <div className={cx('information-item')}>
                    <div className={cx('label')}>Địa chỉ nhận hàng:</div>
                    <div className={cx('information')}>{data.address}</div>
                </div>
                <div className={cx('information-item')}>
                    <div className={cx('label')}>Số sản phẩm:</div>
                    <div className={cx('information')}>{data.count}</div>
                </div>
                <div className={cx('information-item')}>
                    <div className={cx('label')}>Tổng tiền:</div>
                    <div className={cx('information')}>
                        {Math.round(data.totalMoney)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                        VNĐ
                    </div>
                </div>
            </div>
        </li>
    );
}

export default OrderItem;
