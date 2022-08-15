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
        (type, name) => {
            dispatch(actions.setParamsApiFilter({ type, page: 1 }));
            handleName(name);
        },
        [store],
    );
    return (
        <li onClick={() => handleSort(data.type, data.name)} className={cx('wrapper')}>
            {data.name}
        </li>
    );
}
SortItem.propTypes = {
    data: PropTypes.object.isRequired,
    handleName: PropTypes.func.isRequired,
};

export default SortItem;
