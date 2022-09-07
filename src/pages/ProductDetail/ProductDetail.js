import { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import Rating from '../../components/Rating';
import styles from './ProductDetail.module.scss';
import MobileDetailImages from './components/ProductDetailImages';
import DetailConfig from './components/DetailConfig';
import useStore from '~/store/hooks';
import * as mobileService from '~/apiServices/mobileService';
import RatingDetail from './components/RatingDetail';
const cx = classNames.bind(styles);
function MobileDetail() {
    const [store, dispatch] = useStore();
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const starDetail = product?.assess?.star;
    const avgStar = (
        (starDetail?.star_1 * 1 +
            starDetail?.star_2 * 2 +
            starDetail?.star_3 * 3 +
            starDetail?.star_4 * 4 +
            starDetail?.star_5 * 5) /
        product?.assess?.total
    ).toFixed(1);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await mobileService.mobileDetail(store.idProduct);
            setImages(
                res[0].images.map((image) =>
                    image.id === 1
                        ? { id: image.id, src: image.src, active: true }
                        : { id: image.id, src: image.src, active: false },
                ),
            );
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
                <Rating number={avgStar} />
                <a href="#rating-detail" className={cx('text')}>
                    {product?.assess?.total} đánh giá
                </a>
            </div>
            <div className={cx('content')}>
                <div className={cx('assess')}>
                    {images.length > 0 && (
                        <MobileDetailImages
                            images={images}
                            onBtnLeftClick={handleBtnLeftClick}
                            onBtnRightClick={handleBtnRightClick}
                            onImageButtonClick={handleImageButtonClick}
                        />
                    )}

                    <div id="rating-detail">
                        <RatingDetail data={product} />
                    </div>
                </div>
                <DetailConfig data={product} />
            </div>
        </div>
    );
}

export default MobileDetail;
