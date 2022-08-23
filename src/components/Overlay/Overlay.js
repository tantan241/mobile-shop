import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Overlay.module.scss';
const cx = classNames.bind(styles);
function Overlay({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}
Overlay.propTypes = {
    children: PropTypes.node.isRequired,
};
export default Overlay;
