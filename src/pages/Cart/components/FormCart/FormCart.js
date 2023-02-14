import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

import classNames from 'classnames/bind';
import styles from './FormCart.module.scss';
import Input from '~/components/Input';
import Button from '~/components/Button';
import useStore from '~/store/hooks';
import { actions } from '~/store';
const cx = classNames.bind(styles);
function FormCart() {
    const [store, dispatch] = useStore();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        // store.profileUser.googleId &&
        //     console.log({
        //         userId: store.profileUser.googleId,
        //         ...data,
        //         productsInCart: store.productsInCart,
        //     });
    };
    const handleClick = useCallback(() => {
        Object.keys(store.profileUser).length === 0 && dispatch(actions.setIsLogin(true));
    }, [store]);
    return (
        <form className={cx('wrapper')} onSubmit={handleSubmit(onSubmit)}>
            <div className={cx('title')}>Thông tin người nhận</div>
            <div className={cx('input-name-number')}>
                <div>
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
                        classNames={cx('input-number')}
                        text="Số điện thoại"
                        type="number"
                        name="phone"
                        register={register}
                        borderRed={errors.phone?.type === 'required'}
                    />
                    {errors.phone?.type === 'required' && (
                        <span className={cx('notification')}>Mời bạn nhập số điện thoại</span>
                    )}
                </div>
            </div>
            <div>
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
            />
            <div className={cx('action')}>
                <Button onClick={handleClick} primary>
                    Đặt hàng
                </Button>
            </div>
        </form>
    );
}

export default FormCart;
