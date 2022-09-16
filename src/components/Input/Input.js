import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './Input.module.scss';
const cx = classNames.bind(styles);
function Input({
    textarea,
    text,
    type = 'text',
    name,
    classNames,
    value,
    onChange,
    onBlur,
    register = () => {},
    borderRed,
}) {
    let Comp = 'input';
    if (textarea) {
        Comp = 'textarea';
    }
    return (
        <label className={cx('wrapper', classNames)}>
            <Comp
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                className={cx('field', {
                    borderRed,
                })}
                type={type}
                placeholder=" "
                {...register(name, { required: true })}
            />
            <span className={cx('label')}>{text}</span>
        </label>
    );
}
Input.propTypes = {
    textarea: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    classNames: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    register: PropTypes.func,
    borderRed: PropTypes.bool,
};

export default Input;
