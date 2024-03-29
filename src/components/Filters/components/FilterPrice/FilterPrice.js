import { useCallback, useRef, useState } from 'react';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { actions } from '~/store';
import useStore from '~/store/hooks';
import styles from './FilterPrice.module.scss';
import { Button, TextField } from '@mui/material';
const cx = classNames.bind(styles);
function FilterPrice() {
    const [localValue, setLocalValue] = useState({ fromPrice: '', toPrice: '' });

    const [store, dispatch] = useStore();
    const [isOpen, setIsOpen] = useState(true);
    const handleApply = useCallback(() => {
        dispatch(
            actions.setFilterPrice({
                fromPrice: localValue.fromPrice * 1,
                toPrice: localValue.toPrice * 1,
            }),
        );
        dispatch(actions.setOpenFiltersMobile(false));
    }, [localValue]);
    const handleInputChange = useCallback((name, value) => {
        // let valueInt = parseInt(value.replace('.', ''));
        // // valueInt = valueInt.toLocaleString('vi-VN');
        // console.log(valueInt, typeof valueInt);
        setLocalValue((prev) => ({ ...prev, [name]: value }));
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
                        <TextField
                            size="small"
                            value={localValue.fromPrice.toLocaleString('en-US', {
                                useGrouping: true,
                                maximumFractionDigits: 0,
                            })}
                            onChange={(e) => handleInputChange('fromPrice', e.target.value)}
                            style={{ width: '80%' }}
                            InputProps={{ style: { fontSize: '14px', width: '90%' } }}
                            // type="number"
                        ></TextField>
                        <div className={cx('input-text')}>VNĐ</div>
                    </div>
                    <div className={cx('input-group')}>
                        <label className={cx('input-label')}>Đến:</label>
                        <TextField
                            size="small"
                            value={localValue.toPrice}
                            onChange={(e) => handleInputChange('toPrice', e.target.value)}
                            style={{ width: '80%' }}
                            InputProps={{ style: { fontSize: '14px', width: '90%' } }}
                            // type="number"
                        ></TextField>
                        <div className={cx('input-text')}>VNĐ</div>
                    </div>
                    <div className={cx('btn-wrapper')}>
                        <Button variant="contained" onClick={handleApply}>
                            Áp dụng
                        </Button>
                        {/* <button onClick={handleApply} className={cx('btn')}>
                            Áp dụng
                        </button> */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilterPrice;
