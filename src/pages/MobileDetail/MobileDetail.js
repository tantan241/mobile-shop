import { faAngleLeft, faAngleRight, faCaretRight, faL, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import ImageButton from './components/ImageButton';
import Rating from './components/Rating';
import styles from './MobileDetail.module.scss';
import MobileDetailImages from './components/MobileDetailImages';
import DetailConfig from './components/DetailConfig';
import useStore from '~/store/hooks';
import * as mobileService from '~/apiServices/mobileService';
import RatingDetail from './components/RatingDetail';

const cx = classNames.bind(styles);

function MobileDetail() {
    const [store, dispatch] = useStore();
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([
        {
            id: 1,
            src: 'https://cdn.tgdd.vn/Products/Images/42/153856/Slider/vi-vn-iphone-11-tinhnang.jpg',
            active: true,
        },
        { id: 2, src: 'https://cdn.tgdd.vn/Products/Images/42/261888/Slider/REALME-C35-1020x570.jpg', active: false },
        {
            id: 3,
            src: 'https://cdn.tgdd.vn/Products/Images/42/262650/Slider/Samsung-Galaxy-A23-1020x570-1.jpg',
            active: false,
        },
        { id: 4, src: 'https://cdn.tgdd.vn/Products/Images/42/262650/Slider/A23-1-1020x570-1.jpg', active: false },
        { id: 5, src: 'https://cdn.tgdd.vn/Products/Images/42/262650/Slider/A23-2-1020x570.jpg', active: false },
        { id: 6, src: 'https://cdn.tgdd.vn/Products/Images/42/262650/Slider/A23-5-1020x570-1.jpg', active: false },
    ]);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await mobileService.mobileDetail(store.idProduct);
            setProduct(res[0]);
        };
        fetchApi();
    }, [store]);
    const handleImageButtonClick = useCallback((param) => {
        setImages((prev) =>
            prev.map((image) => (image.src === param ? { ...image, active: true } : { ...image, active: false })),
        );
    }, []);
    const handleBtnLeftClick = useCallback(() => {
        let number;
        setImages((prev) => {
            prev.forEach((image, index) => {
                image.active === true && (number = index - 1);
            });
            return prev.map((image, index) =>
                index === number ? { ...image, active: true } : { ...image, active: false },
            );
        });
    }, []);
    const handleBtnRightClick = useCallback(() => {
        let number;
        setImages((prev) => {
            prev.forEach((image, index) => {
                image.active === true && (number = index + 1);
            });
            return prev.map((image, index) =>
                index === number ? { ...image, active: true } : { ...image, active: false },
            );
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('name')}>{product.name}</div>
                <Rating number={4.6} />
                <span className={cx('text')}>100 đánh giá</span>
            </div>
            <div className={cx('content')}>
                <div className={cx('assess')}>
                    <MobileDetailImages
                        images={images}
                        onBtnLeftClick={handleBtnLeftClick}
                        onBtnRightClick={handleBtnRightClick}
                        onImageButtonClick={handleImageButtonClick}
                    />
                    <RatingDetail />
                </div>
                <DetailConfig />
            </div>
        </div>
    );
}

export default MobileDetail;
