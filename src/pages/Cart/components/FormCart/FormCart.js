import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './FormCart.module.scss';
import Input from '~/components/Input';
import Button from '~/components/Button';
import useStore from '~/store/hooks';
import { actions } from '~/store';
import { PROFILE } from '~/constants';
import TextFieldTan from '~/components/TextField';
import { Grid } from '@mui/material';
import { fetchData } from '~/common';
import { API_CREATE_ORDER, API_DELETE_ALL_CART } from '~/urlConfig';
const cx = classNames.bind(styles);
function FormCart(props) {
    const { totalMoney, products } = props;
    const [store, dispatch] = useStore();
    const [profile, setProfile] = useState({});
    const [localValue, setLocalValue] = useState({ name: '', phoneNumber: '', address: '', note: '', email: '' });
    const [validate, setValidate] = useState('');
    useEffect(() => {
        setProfile(JSON.parse(localStorage.getItem(PROFILE)) || {});
    }, [store.reload]);
    // const {
    //     register,
    //     formState: { errors },
    //     handleSubmit,
    // } = useForm();
    const handleInputChange = (name, value) => {
        if (name === 'email') {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            !regex.test(value) ? setValidate('Sai định dạng gmail') : setValidate('');
        }
        setLocalValue((prev) => ({ ...prev, [name]: value }));
    };
    const handleClick = useCallback(() => {
        const productInOrder = products.map((item) => ({
            product: item.product,
            number: item.number,
            price: (item.price - (item.price * item.discount) / 100) * item.number,
        }));

        const body = {
            ...localValue,
            phone: localValue.phoneNumber * 1,
            user: profile.id,
            totalMoney: parseFloat(totalMoney.replace(/[.,]/g, '')),
            order_detail: productInOrder,
            order_method: 1,
        };
        fetchData(API_CREATE_ORDER, body, 'POST', true).then((res) => {
            if (res.status === 200) {
                fetchData(`${API_DELETE_ALL_CART}?userId=${profile.id}`, '', 'DELETE', true).then((res) => {
                    if (res.status === 200) {
                        dispatch(actions.setReload(new Date() * 1));
                    }
                });
            }
        });
    }, [store, localValue]);
    return (
        <div
            className={cx('wrapper')}
            // onSubmit={handleSubmit(onSubmit)}
        >
            <div className={cx('title')}>Thông tin người nhận</div>
            {/* <div className={cx('input-name-number')}> */}
            <Grid container spacing={2}>
                <Grid item xs="6">
                    <TextFieldTan
                        fontSize="18px"
                        label="Họ và tên"
                        name="name"
                        value={localValue.name}
                        required
                        helperText={!localValue.name && 'Không được để trống họ và tên'}
                        error={!localValue.name}
                        FormHelperTextProps={{
                            sx: { fontSize: '10px' }, // kích thước phông chữ
                        }}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    ></TextFieldTan>
                </Grid>
                <Grid item xs="6">
                    <TextFieldTan
                        fontSize="18px"
                        label="Số điện thoại"
                        type="number"
                        required
                        name="phoneNumber"
                        error={!localValue.phoneNumber}
                        helperText={!localValue.phoneNumber && 'Không được để trống số điện thoại'}
                        FormHelperTextProps={{
                            sx: { fontSize: '10px' }, // kích thước phông chữ
                        }}
                        value={localValue.phoneNumber}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    ></TextFieldTan>
                </Grid>
                <Grid xs={12} item>
                    <TextFieldTan
                        fontSize="18px"
                        label="Email"
                        fullWidth
                        name="email"
                        required
                        error={!localValue.email || validate}
                        helperText={(!localValue.email && 'Không được để trống email') || (validate && validate)}
                        FormHelperTextProps={{
                            sx: { fontSize: '10px' }, // kích thước phông chữ
                        }}
                        value={localValue.email}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        type="email"
                    ></TextFieldTan>
                </Grid>
                <Grid xs={12} item>
                    <TextFieldTan
                        fontSize="18px"
                        label="Địa chỉ cụ thế (Số nhà, tên đường - phường/xã - quận/huyện - tỉnh/thành phố)"
                        fullWidth
                        multiline
                        rows={3}
                        name="address"
                        required
                        error={!localValue.address}
                        helperText={!localValue.address && 'Không được để trống địa chỉ'}
                        FormHelperTextProps={{
                            sx: { fontSize: '10px' }, // kích thước phông chữ
                        }}
                        value={localValue.address}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    ></TextFieldTan>
                </Grid>
                <Grid xs={12} item>
                    <TextFieldTan
                        fontSize="18px"
                        label="Yêu cầu khác(Không bắt buộc)"
                        fullWidth
                        multiline
                        rows={3}
                        name="note"
                        value={localValue.other}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    ></TextFieldTan>
                </Grid>
            </Grid>

            {/* </div> */}
            {/* <div>
                <Input
                    classNames={cx('input-address')}
                    text="Địa chỉ cụ thế (Số nhà, tên đường - phường/xã - quận/huyện - tỉnh/thành phố)"
                    textarea
                    name="address"
                    register={register}
                    borderRed={errors.address?.type === 'required'}
                />
                {errors.address?.type === 'required' && (
                    <span className={cx('notification')}>Mời bạn nhập địa chỉ nhận hàng</span>
                )}
            </div>
            <Input
                classNames={cx('input-other')}
                text="Yêu cầu khác(Không bắt buộc)"
                textarea
                name="other"
                register={register}
            /> */}
            <div className={cx('action')}>
                <Button
                    onClick={handleClick}
                    primary
                    disabled={!localValue.name || !localValue.phoneNumber || !localValue.address || validate}
                >
                    Đặt hàng
                </Button>
            </div>
        </div>
    );
}

export default FormCart;
