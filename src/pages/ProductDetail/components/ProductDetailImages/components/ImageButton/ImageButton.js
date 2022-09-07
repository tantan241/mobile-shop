import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './ImageButton.module.scss';
const cx = classNames.bind(styles);
function ImageButton({ active, src, onImageButtonClick }) {
    return (
        <li className={cx('wrapper')}>
            <img
                src={src}
                className={cx('img', {
                    active,
                })}
                alt=""
                onClick={() => onImageButtonClick(src)}
            ></img>
        </li>
    );
}
ImageButton.propTypes = {
    active: PropTypes.bool,
    src: PropTypes.string,
    onImageButtonClick: PropTypes.func,
};
export default ImageButton;
