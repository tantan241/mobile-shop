import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import ImageButton from './components/ImageButton';
import styles from './ProductDetailImages.module.scss';
const cx = classNames.bind(styles);
function MobileDetailImages({ images, onBtnLeftClick, onBtnRightClick, onImageButtonClick }) {
    const [imageBig, setImageBig] = useState();
    useEffect(() => {
        images.forEach((image) => {
            image.active === true && setImageBig(image.src);
        });
    }, [images]);
    return (
        <>
            <div className={cx('wrapper')}>
                <img src={imageBig} alt=""></img>
                {images.length > 1 && (
                    <>
                        <button
                            className={cx('btn-arrow-left')}
                            disabled={images[0].active === true}
                            onClick={onBtnLeftClick}
                        >
                            <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                        </button>
                        <button
                            className={cx('btn-arrow-right')}
                            disabled={images[images.length - 1].active === true}
                            onClick={onBtnRightClick}
                        >
                            <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                        </button>
                    </>
                )}
            </div>
            <ul className={cx('img-list')}>
                {images.length > 1 &&
                    images.map((image, index) => (
                        <ImageButton
                            key={image.id}
                            src={image.src}
                            onImageButtonClick={onImageButtonClick}
                            active={image.active}
                        />
                    ))}
            </ul>
        </>
    );
}
MobileDetailImages.propTypes = {
    images: PropTypes.array,
    onBtnLeftClick: PropTypes.func,
    onBtnRightClick: PropTypes.func,
    onImageButtonClick: PropTypes.func,
};
export default MobileDetailImages;
