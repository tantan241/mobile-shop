import { useCallback, useRef, useState } from 'react';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { actions } from '~/store';
import useStore from '~/store/hooks';
import styles from './FilterPrice.module.scss';
const cx = classNames.bind(styles);
function FilterPrice() {
    const fromPriceInpuRef = useRef();
    const toPriceInpuRef = useRef();
    const [store, dispatch] = useStore();
    const [isOpen, setIsOpen] = useState(true);
    const handleApply = useCallback(() => {
        dispatch(
            actions.setParamsApiFilter({ min: fromPriceInpuRef.current.value, max: toPriceInpuRef.current.value }),
        );
        dispatch(actions.setOpenFiltersMobile(false));
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h2 onClick={() => setIsOpen((prev) => !prev)} className={cx('header')}>
                <span>Giá</span>
                <div>
                    {isOpen ? (
                        <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
                    ) : (
                        <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                    )}
                </div>
            </h2>
            {isOpen && (
                <div>
                    <div className={cx('input-group')}>
                        <label className={cx('input-label')}>Từ:</label>
                        <input type="number" className={cx('input')} name="from-price" ref={fromPriceInpuRef} />
                    </div>
                    <div className={cx('input-group')}>
                        <label className={cx('input-label')}>Đến:</label>
                        <input type="number" className={cx('input')} name="to-price" ref={toPriceInpuRef} />
                    </div>
                    <div className={cx('btn-wrapper')}>
                        <button onClick={handleApply} className={cx('btn')}>
                            Áp dụng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilterPrice;
