import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);
function Button({
    children,
    to,
    href,
    onClick,
    leftIcon,
    rightIcon,
    primary = false,
    more = false,
    width,
    big,
    disabled,
    mobile,
    className,
}) {
    let Button = 'button';
    const props = { href, to, disabled };
    const classNames = { more, primary, big, mobile };
    if (href) {
        Button = 'a';
        props.href = href;
    }
    if (to) {
        Button = Link;
        props.to = to;
    }
    return (
        <Button style={{ width }} onClick={onClick} {...props} className={cx('wrapper', className, classNames)}>
            {leftIcon && <div className={cx('left-icon')}>{leftIcon}</div>}
            <span className={cx('title')}> {children}</span>
            {rightIcon && <div className={cx('right-icon')}>{rightIcon}</div>}
        </Button>
    );
}
Button.propTypes = {
    children: PropTypes.node,
    to: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    primary: PropTypes.bool,
    more: PropTypes.bool,
    width: PropTypes.string,
    big: PropTypes.bool,
    disabled: PropTypes.bool,
    mobile: PropTypes.bool,
    className: PropTypes.string,
};

export default Button;
