import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import ConfigItem from '../ConfigItem';
import styles from './MobileConfig.module.scss';
const cx = classNames.bind(styles);
function MobileConfig() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('name')}>Cấu hình Điện thoại iPhone 13 Pro Max 1TB</div>
            <ul className={cx('config-list')}>
                <ConfigItem />
                <ConfigItem />
                <ConfigItem />
                <ConfigItem />
            </ul>
            <button className={cx('config-more')}>
                Xem thêm cấu hình chi tiết <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>
            </button>
        </div>
    );
}

export default MobileConfig;
