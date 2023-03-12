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
import { API_COMMENT, API_FILES, API_SEND_COMMENT, API_UPLOAD_FILE } from '~/urlConfig';
import useStore from '~/store/hooks';
import { useSnackbar } from 'notistack';
import { ACCESS_TOKEN, PROFILE } from '~/constants';
import { TextField } from '@mui/material';
const cx = classNames.bind(styles);
function MobileDetailForm({ data }) {
    const { enqueueSnackbar } = useSnackbar();
    const [store, dispatch] = useStore();
    const userId = JSON.parse(localStorage.getItem(PROFILE))?.id || '';
    const productId = store.product.id;
    const [valueState, setValueState] = useState({ content: '', file: {} });
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [starSelect, setStarSelect] = useState(5);
    const onSubmit = (data) => {
        const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN))
            ? JSON.parse(localStorage.getItem(ACCESS_TOKEN))
            : '';
        const urlFile = API_UPLOAD_FILE;
        const formData = new FormData();

        formData.append('file', valueState.file);
        fetch(urlFile, {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 200) {
                    fetchData(
                        `${API_SEND_COMMENT}`,
                        {
                            user: userId,
                            product: productId,
                            rating: starSelect,
                            content: valueState.content,
                            image: res.fileName,
                        },
                        'POST',
                        true,
                    ).then((res) => {
                        if (res.status === 200) {
                            handleClickVariant('success', res.messenger, enqueueSnackbar);
                        }
                    });
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
                <img className={cx('image')} alt="ảnh" src={data?.image} />
                {/* Tý sửa */}
                <span className={cx('name')}>{data?.name}</span>
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
                <input
                    className={cx('input-file')}
                    type="file"
                    accept="image/*,.jpg,.jpeg"
                    onChange={(e) => setValueState((prev) => ({ ...prev, file: e.target.files[0] }))}
                />
                <div className={cx('information')}></div>
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
