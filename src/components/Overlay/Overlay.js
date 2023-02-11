import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Overlay.module.scss';
import useStore from '~/store/hooks';
import { actions } from '~/store';
const cx = classNames.bind(styles);
function Overlay({ children, full_display }) {
    const [store, dispatch] = useStore();
    return (
        <div
            className={cx('wrapper')}
            onClick={() => {
                dispatch(actions.setIsLogin(false));
            }}
        >
            <div
                className={cx('content', {
                    full_display,
                })}
                onClick={(event) => {
                    event.stopPropagation();
                }}
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
