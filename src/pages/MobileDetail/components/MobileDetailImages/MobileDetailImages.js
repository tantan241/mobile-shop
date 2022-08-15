import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ImageButton from '../ImageButton';
import styles from './MobileDetailImages.module.scss';
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
            <div className={cx('warpper')}>
                <img src={imageBig} alt=""></img>
                <button className={cx('btn-arrow-left')} disabled={images[0].active === true} onClick={onBtnLeftClick}>
                    <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                </button>
                <button
                    className={cx('btn-arrow-right')}
                    disabled={images[images.length - 1].active === true}
                    onClick={onBtnRightClick}
                >
                    <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                </button>
            </div>
            <ul className={cx('img-list')}>
                {images.map((image, index) => (
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

export default MobileDetailImages;
