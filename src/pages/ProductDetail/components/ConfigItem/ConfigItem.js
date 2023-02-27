import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './ConfigItem.module.scss';
const cx = classNames.bind(styles);
function ConfigItem({ data }) {
    return (
        <li className={cx('wrapper')}>
            <span className={cx('left')}>{data[0]}:</span>
            <span className={cx('right')}>{data[1]}</span>
        </li>
    );
}
ConfigItem.propTypes = {
    data: PropTypes.object,
};

export default ConfigItem;
