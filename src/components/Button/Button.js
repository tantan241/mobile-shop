import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);
function Button({ children, to, href, onClick, leftIcon, rightIcon, primary = false, more = false, width, big }) {
    let Button = 'button';
    const props = { href, to };
    const classNames = { more, primary, big };
    if (href) {
        Button = 'a';
        props.href = href;
    }
    if (to) {
        Button = Link;
        props.to = to;
    }
    return (
        <Button style={{ width }} onClick={onClick} {...props} className={cx('wrapper', classNames)}>
            {leftIcon && <div className={cx('left-icon')}>{leftIcon}</div>}
            <span className={cx('title')}> {children}</span>
            {rightIcon && <div className={cx('right-icon')}>{rightIcon}</div>}
        </Button>
    );
}

export default Button;
