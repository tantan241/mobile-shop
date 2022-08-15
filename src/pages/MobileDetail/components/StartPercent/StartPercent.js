import PropTypes from 'prop-types';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './StartPercent.module.scss';

const cx = classNames.bind(styles);
function StartPercent({ number }) {
    return (
        <li className={cx('wrapper')}>
            <span className={cx('number')}>{number}</span>
            <FontAwesomeIcon icon={faStar} className={cx('icon')} />
            <div className={cx('percent')}></div>
            <span className={cx('number-percent')}>75%</span>
        </li>
    );
}
StartPercent.propTypes = {
    number: PropTypes.string.isRequired,
};
export default StartPercent;
