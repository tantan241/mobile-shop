import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as starFull } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useForm } from 'react-hook-form';

import classNames from 'classnames/bind';
import styles from './ProductDetailForm.module.scss';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { fetchData, handleClickVariant } from '~/common';
import { API_COMMENT } from '~/urlConfig';
import useStore from '~/store/hooks';
import { useSnackbar } from 'notistack';
import { PROFILE } from '~/constants';
import { TextField } from '@mui/material';
const cx = classNames.bind(styles);
function MobileDetailForm({ data }) {
    const { enqueueSnackbar } = useSnackbar();
    const userId = JSON.parse(localStorage.getItem(PROFILE))?.id || '';
    const productId = data.id;
    const [valueState, setValueState] = useState({ content: '' });
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [starSelect, setStarSelect] = useState(5);
    const onSubmit = (data) => {
        fetchData(
            `${API_COMMENT}/send-comment/`,
            { user: userId, product: productId, rating: starSelect, ...valueState },
            'POST',
            true,
        ).then((res) => {
            if (res.status === 200) {
                handleClickVariant('success', res.messenger, enqueueSnackbar);
            }
        });
    };

    const arrStar = [1, 2, 3, 4, 5];
    const handleStarClick = useCallback((number) => {
        setStarSelect(number);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <img className={cx('image')} alt="ảnh" src={data.image} />
                <span className={cx('name')}>{data.name}</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <div>
                    <TextField
                        label={'Mời bạn nhập cảm nhận về sản phẩm'}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={valueState.content}
                        onChange={(e) => {
                            setValueState((prev) => ({ ...prev, content: e.target.value }));
                        }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        InputProps={{ style: { fontSize: '15px' } }}
                        focused
                    ></TextField>
                    {/* <Input
                        textarea
                        text="Mời bạn chia sẻ cảm nhận về sản phẩm này"
                        name="content"
                        register={register}
                        borderRed={errors.content?.type === 'required'}
                        value={valueState.content}
                        onChange={(e) => {
                            setValueState((prev) => ({ ...prev, content: e.target.value }));
                        }}
                    />
                    {errors.content?.type === 'required' && (
                        <span className={cx('notification')}>Mời bạn nhập đánh giá về sản phẩm</span>
                    )} */}
                </div>
                <input className={cx('input-file')} type="file" accept="image/*,.jpg,.jpeg" {...register('image')} />
                <div className={cx('information')}>
                    {/* <div>
                        <Input
                            classNames={cx('input-name')}
                            text="Họ và tên"
                            name="name"
                            register={register}
                            borderRed={errors.name?.type === 'required'}
                        />
                        {errors.name?.type === 'required' && (
                            <span className={cx('notification')}>Mời bạn nhập Họ và tên</span>
                        )}
                    </div>

                    <div>
                        <Input
                            classNames={cx('input-phone')}
                            text="Số điện thoại"
                            name="phone"
                            register={register}
                            borderRed={errors.phone?.type === 'required'}
                        />
                        {errors.phone?.type === 'required' && (
                            <span className={cx('notification')}>Mời bạn nhập số điện thoại</span>
                        )}
                    </div> */}
                </div>
                <div className={cx('action')}>
                    <Button onClick={handleSubmit} primary>
                        Gửi đánh giá ngay
                    </Button>
                </div>
            </form>
            <p className={cx('description')}>
                Để đánh giá được duyệt, quý khách vui lòng tham khảo <a>Quy định duyệt đánh giá</a>
            </p>
        </div>
    );
}
MobileDetailForm.propTypes = {
    data: PropTypes.object,
};
export default MobileDetailForm;
