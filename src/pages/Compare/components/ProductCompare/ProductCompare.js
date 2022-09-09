import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './ProductCompare.module.scss';
const cx = classNames.bind(styles);
function ProductCompare({ src, name, icon, handleClose }) {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('image')} alt="ảnh" src={src} />
            <div className={cx('name')}>{name}</div>
            {icon && (
                <div onClick={handleClose} className={cx('close')}>
                    <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                </div>
            )}
        </div>
    );
}
ProductCompare.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.bool,
    handleClose: PropTypes.func,
};

export default ProductCompare;
