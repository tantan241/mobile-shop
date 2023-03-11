import { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import Rating from '../../components/Rating';
import styles from './ProductDetail.module.scss';
import MobileDetailImages from './components/ProductDetailImages';
import DetailConfig from './components/DetailConfig';
import useStore from '~/store/hooks';
import * as mobileService from '~/apiServices/mobileService';
import RatingDetail from './components/RatingDetail';
import { fetchData } from '~/common';
import { API_COMMENT, API_PRODUCT } from '~/urlConfig';
import { URL_IMAGE } from '~/utils/urlConfig';
const cx = classNames.bind(styles);
function MobileDetail() {
    const [store, dispatch] = useStore();
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [dataRatingDatail, setDataRatingDatail] = useState({});

    const avgStar = parseFloat(
        (
            (dataRatingDatail?.star?.star_1 * 1 +
                dataRatingDatail?.star?.star_2 * 2 +
                dataRatingDatail?.star?.star_3 * 3 +
                dataRatingDatail?.star?.star_4 * 4 +
                dataRatingDatail?.star?.star_5 * 5) /
            dataRatingDatail?.total
        ).toFixed(1),
    );
    useEffect(() => {
        product.name && (document.title = product.name);
    }, [product]);
    useEffect(() => {
        fetchData(`${API_PRODUCT}?id=${store.product.id}`).then((res) => {
            if (res.status === 200) {
                setProduct(res.data);
                // setImages(JSON.parse(res.data.images));
                const arrImage = JSON.parse(res.data.images).map((image, index) => ({
                    id: index + 1,
                    src: `${URL_IMAGE}/${image}`,
                }));
                setImages(
                    arrImage.map((image, index) =>
                        image.id === 1
                            ? { id: image.id, src: image.src, active: true }
                            : { id: image.id, src: image.src, active: false },
                    ),
                );
            }
        });

        fetchData(` http://127.0.0.1:8000/app/api/comment/get-comment?id=${store.product.id}`).then((res) => {
            setDataRatingDatail(res);
        });
    }, [store]);
    const handleImageButtonClick = useCallback((param) => {
        setImages((prev) =>
            prev.map((image) => (image.id === param ? { ...image, active: true } : { ...image, active: false })),
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
                <div className={cx('rating')}>
                    <Rating number={avgStar} />
                </div>
                <a href="#rating-detail" className={cx('text')}>
                    {dataRatingDatail?.total} đánh giá
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
                        <RatingDetail data={dataRatingDatail} />
                    </div>
                </div>
                <DetailConfig data={product} />
            </div>
        </div>
    );
}

export default MobileDetail;
