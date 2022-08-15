import classNames from 'classnames/bind';
import Rating from '../Rating';
import styles from './Comment.module.scss';
const cx = classNames.bind(styles);
function Comment() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('name')}>Nguyễn Văn A</div>
            <Rating number="4" />
            <p className={cx('content')}>
                Đã chuyển từ XS Mã qua, cảm nhận về đt nhỏ gọn. Màn hình không phải là OLED nhưng cũng không tệ như mọi
                người nói đâu ạ. Do ko phải là OLED nên cũng rất ít tốn pin.
            </p>
        </div>
    );
}

export default Comment;
