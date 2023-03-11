import PropTypes from 'prop-types';
import { useCallback } from 'react';

import classNames from 'classnames/bind';
import styles from './SortItem.module.scss';
import { actions } from '~/store';
import useStore from '~/store/hooks';
const cx = classNames.bind(styles);
function SortItem({ data, handleName }) {
    const [store, dispatch] = useStore();
    const handleSort = useCallback(
        (data) => {
            dispatch(actions.setParamsApiFilter({ type_sort: data.type }));
            handleName(data);
        },
        [store],
    );
    return (
        <li onClick={() => handleSort(data)} className={cx('wrapper')}>
            {data.name}
        </li>
    );
}
SortItem.propTypes = {
    data: PropTypes.object.isRequired,
    handleName: PropTypes.func.isRequired,
};

export default SortItem;
