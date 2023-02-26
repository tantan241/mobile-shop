import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './FilterItem.module.scss';
import { actions } from '~/store';
import useStore from '~/store/hooks';
const cx = classNames.bind(styles);
function FilterItem({ name, data }) {
    const [store, dispatch] = useStore();
    const [checked, setChecked] = useState(false);
    console.log(data, 'data');
    useEffect(() => {
        dispatch(actions.setParamsApiFilter({ [name]: [] }));
    }, []);
    const handleClick = useCallback(
        (nameFilterItem) => {
            let paramValues = [];
            setChecked((checked) => !checked);

            Object.keys(store.paramsApiFilter).forEach((key) => {
                if (key === name) {
                    if (checked) {
                        paramValues = store.paramsApiFilter[key].filter((item) => item !== nameFilterItem);
                    } else {
                        paramValues = [...store.paramsApiFilter[key], nameFilterItem];
                    }
                    dispatch(actions.setParamsApiFilter({ [key]: paramValues }));
                    dispatch(actions.setNumberPage(1));
                }
            });
        },
        [store],
    );

    return (
        <li onClick={() => handleClick(data.value)} className={cx('wrapper')}>
            <input
                checked={checked}
                id={data.id}
                className={cx('checkbox')}
                name={name}
                value={data.value}
                type="checkbox"
                onChange={(e) => setChecked(e.target.checked)} //Cầm xem lại đoạn này ( fix báo warning)
            />{' '}
            <span className={cx('name')}>{data.name}</span>
        </li>
    );
}
FilterItem.propTypes = {
    name: PropTypes.string,
    data: PropTypes.object,
};

export default FilterItem;
