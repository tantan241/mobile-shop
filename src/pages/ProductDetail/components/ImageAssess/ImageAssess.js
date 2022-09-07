import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './ImageAssess.module.scss';
const cx = classNames.bind(styles);
function ImageAssess({ more, src, onClick, sizeL }) {
    return (
        <div
            className={cx('wrapper', {
                sizeL,
            })}
            onClick={onClick}
        >
            <img src={src} className={cx({ sizeL })} alt="ảnh" />
            {more && <div className={cx('more')}>Xem thêm</div>}
        </div>
    );
}
ImageAssess.propTypes = {
    more: PropTypes.bool,
    src: PropTypes.string,
    onClick: PropTypes.func,
    sizeL: PropTypes.bool,
};

export default ImageAssess;
