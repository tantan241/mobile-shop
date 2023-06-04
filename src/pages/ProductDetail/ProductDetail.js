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
import { API_COMMENT, API_GET_COMMENT, API_GET_PRODUCT, API_PRODUCT } from '~/urlConfig';
import { URL_IMAGE } from '~/utils/urlConfig';
import { useRef } from 'react';
import { Button, Dialog, DialogContent } from '@mui/material';

const cx = classNames.bind(styles);
function MobileDetail() {
    const [store, dispatch] = useStore();
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [dataRatingDatail, setDataRatingDatail] = useState({});
    const [openDialog, setOpenDialog] = useState(true);
    const productDetail = useRef();
    let domParser = new DOMParser();
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
        setOpenDialog(false);
        product.name && (document.title = product.name);
    }, [product]);
    async function viewProductDetail() {
        await setOpenDialog(true);

        productDetail?.current && (productDetail.current.innerHTML = product.description ? product.description : '');
    }
    useEffect(() => {
        fetchData(`${API_GET_PRODUCT}?id=${store.product.id}`).then((res) => {
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

        fetchData(`${API_GET_COMMENT}?id=${store.product.id}`).then((res) => {
            setDataRatingDatail(res);
        });
    }, [store, store.reload]);
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
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #00adff ',
                            boxShadow: '10px 10px 36px 16px rgba(128,189,242,0.6)',
                            margin: '20px 0',
                            borderRadius: '10px',
                        }}
                    >
                        <Button style={{ fontSize: '1.8rem' }} onClick={() => viewProductDetail()}>
                            Xem thông tin chi tiết sản phẩm
                        </Button>
                    </div>

                    <div id="rating-detail">
                        <RatingDetail data={dataRatingDatail} />
                    </div>
                </div>
                <DetailConfig data={product} />
            </div>
            <Dialog open={openDialog} maxWidth={'lg'} onClose={() => setOpenDialog(false)}>
                <DialogContent>
                    <div style={{ fontSize: '16px' }} ref={productDetail} className="product-detail"></div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default MobileDetail;
