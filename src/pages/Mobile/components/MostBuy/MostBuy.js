import { useCallback, useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './MostBuy.module.scss';

import MobileItem from '../MobileItem';

const cx = classNames.bind(styles);
function MostBuy() {
    const productListRef = useRef();
    const btnLeftRef = useRef();
    let x = 0;
    const [products, setProducts] = useState([]);
    const [disableLeft, setDisableLeft] = useState(true);
    const [disableRight, setDisableRight] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:3000/products`)
            .then((responsive) => responsive.json())
            .then((data) => {
                return setProducts(data);
            });
    }, []);
    const handleBtnLeftClick = useCallback(() => {
        if (x < 0) {
            const withListProduct = productListRef.current.clientWidth;
            const widthItem = withListProduct / 5;
            x += widthItem;
            productListRef.current.style.transform = `translate3d(${x}px, 0px, 0px)`;
            if (x === 0) {
                setDisableLeft(true);
                return;
            }
            setDisableRight(false);
        }
    }, []);
    const handleBtnRightClick = useCallback(() => {
        if (x > -1200) {
            const withListProduct = productListRef.current.clientWidth;
            const widthItem = withListProduct / 5;
            x -= widthItem;
            productListRef.current.style.transform = `translate3d(${x}px, 0px, 0px)`;
            if (x === -1200) {
                setDisableRight(true);
                return;
            }
            setDisableLeft(false);
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Top 10 điện thoại mua nhiều nhất</h2>
            <div className={cx('product-list-wrapper')}>
                <ul ref={productListRef} className={cx('product-list')}>
                    {products.map((product) => (
                        <MobileItem l_5 key={product.id} product={product} />
                    ))}
                </ul>
            </div>
            <button
                ref={btnLeftRef}
                onClick={handleBtnLeftClick}
                className={cx('btn-left', {
                    disable: disableLeft,
                })}
            >
                <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
            </button>
            <button
                onClick={handleBtnRightClick}
                className={cx('btn-right', {
                    disable: disableRight,
                })}
            >
                <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
            </button>
        </div>
    );
}

export default MostBuy;
