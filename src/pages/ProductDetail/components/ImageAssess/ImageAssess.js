import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './ImageAssess.module.scss';
const cx = classNames.bind(styles);
function ImageAssess({ more, src, onClick, sizeL, s_3 }) {
    return (
        <div
            className={cx('wrapper', {
                sizeL,
                s_3,
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
    s_3: PropTypes.bool,
};

export default ImageAssess;
