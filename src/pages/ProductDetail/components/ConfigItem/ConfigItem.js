import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './ConfigItem.module.scss';
const cx = classNames.bind(styles);
function ConfigItem({ data }) {
    return (
        <li className={cx('wrapper')}>
            <span className={cx('left')}>{data.title}:</span>
            <span className={cx('right')}>{data.value}</span>
        </li>
    );
}
ConfigItem.propTypes = {
    data: PropTypes.object,
};

export default ConfigItem;
