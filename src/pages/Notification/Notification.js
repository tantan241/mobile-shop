import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
const cx = classNames.bind(styles);
function Notification() {
    return <h1 className={cx('title')}>Chức năng đang được bảo trì</h1>;
}

export default Notification;
