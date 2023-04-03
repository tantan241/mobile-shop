import { IconButton } from '@mui/material';
import styles from './OrderDetail.module.scss';
import classNames from 'classnames/bind';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const cx = classNames.bind(styles);
function OrderDetail() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <IconButton aria-label="delete" style={{ color: 'black', fontSize: '2.4rem' }}>
                    <ArrowBackIcon fontSize="2.4rem" />
                    <div style={{ marginLeft: '10px' }}>Quay lại</div>
                </IconButton>
                <div className={cx('status')}>Trạng thái đơn hàng</div>
                <div style={{ padding: '20px 0', display: 'flex' }}>
                    <LocationOnIcon style={{ fontSize: '25px' }}></LocationOnIcon>
                    <div>
                        <div style={{ fontSize: '25px' }}>Địa chỉ nhận hàng</div>
                        <div style={{ lineHeight: '1.5', marginTop: '10px' }}>Vũ Viết Tân</div>
                        <div style={{ lineHeight: '1.5' }}>0984035114</div>
                        <div style={{ lineHeight: '1.5' }}>Số nhà 25, Ngõ 155, Phương canh, Nam từ liêm, hà Nội</div>
                    </div>
                </div>
                <div className={cx('product-item')}>
                    <img
                        src="https://cdn.tgdd.vn/Products/Images/54/289781/tai-nghe-bluetooth-airpods-pro-2-magsafe-charge-apple-mqd83-trang-090922-034128-600x600.jpeg"
                        style={{ width: '20%' }}
                    />
                    <div style={{ padding: '10px' }}>
                        <div>
                            Tên sản phẩm Tên sản phẩm Tên sản phẩm Tên sản phẩm Tên sản phẩm Tên sản phẩm Tên sản phẩm
                            Tên sản phẩm
                        </div>
                        <div className={cx('content-number')}>
                            <div style={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.6rem' }}>4GB-128GB</div>
                            <div>x1</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>12.000.000 vnđ</div>
                    </div>
                </div>
                <div className={cx('product-item')}>
                    <img
                        src="https://cdn.tgdd.vn/Products/Images/54/289781/tai-nghe-bluetooth-airpods-pro-2-magsafe-charge-apple-mqd83-trang-090922-034128-600x600.jpeg"
                        style={{ width: '20%' }}
                    />
                    <div style={{ padding: '10px' }}>
                        <div>
                            Tên sản phẩm Tên sản phẩm Tên sản phẩm Tên sản phẩm Tên sản phẩm Tên sản phẩm Tên sản phẩm
                            Tên sản phẩm
                        </div>
                        <div className={cx('content-number')}>
                            <div style={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.6rem' }}>4GB-128GB</div>
                            <div>x1</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>12.000.000 vnđ</div>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <div>Tổng tiền thanh toán:</div>
                    <div>20.000.000 vnđ</div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
