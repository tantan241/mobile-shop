import classNames from 'classnames/bind';
import styles from './ConfigItem.module.scss';
const cx = classNames.bind(styles);
function ConfigItem() {
    return (
        <li className={cx('wrapper')}>
            <span className={cx('left')}>Ram</span>
            <span className={cx('right')}>8 GB</span>
        </li>
    );
}

export default ConfigItem;
