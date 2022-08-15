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

export default ImageButton;
