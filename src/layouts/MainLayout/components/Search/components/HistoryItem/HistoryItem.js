import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './HistoryItem.module.scss';
import { actions } from '~/store';
import useStore from '~/store/hooks';
const cx = classNames.bind(styles);
function HistoryItem({ title, index }) {
    const [state, dispatch] = useStore();
    return (
        // <Link  className={cx('wrapper')}>
        <div className={cx('wrapper')}>
            <Link
                to={'/search?q=' + title}
                style={{ width: '100%' }}
                onClick={() => dispatch(actions.setReload(new Date() * 1))}
            >
                <p className={cx('title')}>{title}</p>
            </Link>
            <span
                className={cx('btn')}
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(actions.deleteSearchHistory(index));
                }}
            >
                xóa
            </span>
        </div>

        // </Link>
    );
}
HistoryItem.propTypes = {
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

export default HistoryItem;
