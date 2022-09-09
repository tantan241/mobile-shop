import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './SelectFormItem.module.scss';
const cx = classNames.bind(styles);
function SelectFormItem({ name, title, handleChoose, data }) {
    const [brandValue, setBrandValue] = useState();
    const handleChange = useCallback((e) => {
        handleChoose(e.target.value);
        setBrandValue(e.target.value);
    }, []);
    return (
        <div className={cx('wrapper')}>
            <label className={cx('label')} htmlFor={name}>
                {title} :
            </label>
            <select className={cx('select')} name={name} id={name} value={brandValue} onChange={handleChange}>
                <option className={cx('option')}> -- {title} --</option>
                {data.map((item) => (
                    <option key={item.id} value={item.id} className={cx('option')}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
SelectFormItem.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    handleChoose: PropTypes.func,
    data: PropTypes.array,
};

export default SelectFormItem;
