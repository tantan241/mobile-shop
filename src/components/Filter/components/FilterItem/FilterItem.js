import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';

import { actions } from '~/store';
import useStore from '~/store/hooks';

import classNames from 'classnames/bind';
import styles from './FilterItem.module.scss';

const cx = classNames.bind(styles);

function FilterItem({ name, data }) {
    const [store, dispatch] = useStore();
    const [checked, setChecked] = useState(false);

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

                    data.max
                        ? dispatch(actions.setParamsApiFilter({ min: data.min, max: data.max }))
                        : dispatch(actions.setParamsApiFilter({ [key]: paramValues }));
                    dispatch(actions.setNumberPage(1));
                    // dispatch(actions.setMaxPageNumber(2));
                }
            });
        },
        [store],
    );

    return (
        <li onClick={() => handleClick(data.name)} className={cx('wrapper')}>
            <input
                checked={checked}
                id={data.id}
                className={cx('checkbox')}
                name={name}
                value={data.name}
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
