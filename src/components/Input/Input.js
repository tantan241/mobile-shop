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

export default Input;
