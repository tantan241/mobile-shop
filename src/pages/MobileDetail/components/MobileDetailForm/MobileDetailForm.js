import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faXmark, faStar as starFull } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import { useCallback, useState } from 'react';
import styles from './MobileDetailForm.module.scss';
import Input from '~/components/Input';
import Button from '~/components/Button';
const cx = classNames.bind(styles);
function MobileDetailForm({ data }) {
    const arrStar = [1, 2, 3, 4, 5];
    const [starSelect, setStarSelect] = useState(0);
    const handleStarClick = useCallback((number) => {
        setStarSelect(number);
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <img className={cx('image')} alt="ảnh" src={data.image} />
                <span className={cx('name')}>{data.name}</span>
            </div>
            <ul className={cx('star-list')}>
                {arrStar.map((number) => {
                    if (number <= starSelect) {
                        return (
                            <li className={cx('star')} key={number} onClick={() => handleStarClick(number)}>
                                <FontAwesomeIcon icon={starFull}></FontAwesomeIcon>
                            </li>
                        );
                    }
                    return (
                        <li className={cx('star')} key={number} onClick={() => handleStarClick(number)}>
                            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                        </li>
                    );
                })}
            </ul>
            <div className={cx('input-content')}>
                <Input textarea text="Mời bạn chia sẻ cảm nhận về sản phẩm này" />
            </div>
            <input className={cx('input-file')} type="file" accept="image/*,.jpg,.jpeg" />
            <div className={cx('information')}>
                <div className={cx('input-name')}>
                    <Input text="Họ và tên" name="name" />
                </div>
                <div className={cx('input-phone')}>
                    <Input text="Số điện thoại" name="phone" />
                </div>
            </div>
            <div className={cx('action')}>
                <Button width="180px" primary>
                    Gửi đánh giá ngay
                </Button>
            </div>
            <p className={cx('description')}>
                Để đánh giá được duyệt, quý khách vui lòng tham khảo <a>Quy định duyệt đánh giá</a>
            </p>
        </div>
    );
}

export default MobileDetailForm;
