import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './HistoryItem.module.scss';

import { actions } from '~/store';
import useStore from '~/store/hooks';

const cx = classNames.bind(styles);
function HistoryItem({ title, index }) {
    const [state, dispatch] = useStore();
    return (
        <li className={cx('wrapper')}>
            <p className={cx('title')}>{title}</p>
            <span className={cx('btn')} onClick={() => dispatch(actions.deleteSearchHistory(index))}>
                xóa
            </span>
        </li>
    );
}
HistoryItem.propTypes = {
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

export default HistoryItem;
