import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Rating from '../../../../components/Rating';
import styles from './Comment.module.scss';
const cx = classNames.bind(styles);
function Comment({ name, star, content, borderTop }) {
    return (
        <div
            className={cx('wrapper', {
                borderTop,
            })}
        >
            <div className={cx('name')}>{name}</div>
            <Rating number={star} />
            <p className={cx('content')}>{content}</p>
        </div>
    );
}
Comment.propTypes = {
    name: PropTypes.string,
    star: PropTypes.number,
    content: PropTypes.string,
    borderTop: PropTypes.bool,
};

export default Comment;
