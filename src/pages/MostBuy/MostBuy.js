import { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import * as mobileService from '~/apiServices/mobileService';
import classNames from 'classnames/bind';
import styles from './MostBuy.module.scss';
import MobileItem from '../../components/MobileItem';
const cx = classNames.bind(styles);
function MostBuy() {
    const productListRef = useRef();
    let widthListProduct;
    let widthItem;
    let numberProduct;
    const [disabledBtnRight, setDisabledBtnRight] = useState(0);
    const [x, setX] = useState(0);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await mobileService.mobile();
            if (res.status === 200) {
                setProducts(res.data);
            }
        };
        fetchApi();
    }, []);
    useEffect(() => {
        widthListProduct = productListRef.current.clientWidth.toFixed(2);
        setDisabledBtnRight(widthListProduct);
        if (widthListProduct < 1024) {
            numberProduct = 4;
        } else {
            numberProduct = 5;
        }
        widthItem = widthListProduct / numberProduct;
    }, []);
    useEffect(() => {
        productListRef.current.style.transform = `translate3d(${x}px, 0px, 0px)`;
    }, [x]);
    useEffect(() => {
        if (numberProduct === 4) {
            widthListProduct = widthItem * 6;
            setDisabledBtnRight(widthItem * 6);
        }
        const idInterval = setInterval(() => {
            setX((prev) => {
                if (prev <= -widthListProduct) {
                    return 0;
                } else {
                    return prev - widthItem;
                }
            });
        }, 3000);
        return () => clearInterval(idInterval);
    }, []);
    const handleBtnLeftClick = useCallback(() => {
        setX((prev) => prev + widthItem);
    }, []);
    const handleBtnRightClick = useCallback(() => {
        setX((prev) => prev - widthItem);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Top 10 điện thoại mua nhiều nhất</h2>
            <div className={cx('product-list-wrapper')}>
                <ul ref={productListRef} className={cx('product-list')}>
                    {products.length > 1 &&
                        products.map((product) => <MobileItem m_4 l_5 key={product.id} product={product} />)}
                </ul>
            </div>
            <button disabled={x === 0} onClick={handleBtnLeftClick} className={cx('btn-left')}>
                <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
            </button>
            <button disabled={x === -disabledBtnRight} onClick={handleBtnRightClick} className={cx('btn-right')}>
                <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
            </button>
        </div>
    );
}

export default MostBuy;
