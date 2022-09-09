import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Overlay.module.scss';
const cx = classNames.bind(styles);
function Overlay({ children, full_display }) {
    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('content', {
                    full_display,
                })}
            >
                {children}
            </div>
        </div>
    );
}
Overlay.propTypes = {
    children: PropTypes.node.isRequired,
    full_display: PropTypes.bool,
};
export default Overlay;
