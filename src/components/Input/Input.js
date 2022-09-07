import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
const cx = classNames.bind(styles);
function Input({ textarea, text, type = 'text', name }) {
    let Comp = 'input';
    if (textarea) {
        Comp = 'textarea';
    }
    return (
        <label className={cx('wrapper')}>
            <Comp className={cx('field')} type={type} name={name} placeholder=" " />
            <span className={cx('label')}>{text}</span>
        </label>
    );
}
Input.propTypes = {
    textarea: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
};

export default Input;
