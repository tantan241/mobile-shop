import { gapi } from 'gapi-script';
import { useCallback, useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { refreshTokenSetup } from '../../refreshTokenSetup ';
import useStore from '~/store/hooks';
import { actions } from '~/store';
import { URL } from '~/utils/urlConfig';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import SnackBar from '~/components/SnackBar';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { handleClickVariant } from '~/comon';

const cx = classNames.bind(styles);
const clientId = '775095883325-s8o67ovu8ego3m7ei2ksk5mv304cn3gi.apps.googleusercontent.com';
function Login() {
    const { enqueueSnackbar } = useSnackbar();

    const [isLoginForm, setIsLoginForm] = useState(true);
    const [store, dispatch] = useStore();
    const [localValues, setLocalValues] = useState({
        fullName: '',
        username: '',
        password: '',
    });

    const changeLogin = useCallback(() => {
        setIsLoginForm((prev) => !prev);
    }, []);

    const handleInputChange = useCallback((name, value) => {
        setLocalValues((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSignInOnclick = useCallback(() => {
        fetch(`${URL}/create-user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(localValues),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data, 'data');
            });
    });

    const handleLoginOnclick = useCallback(() => {
        fetch(`${URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(localValues),
        })
            .then((response) => response.json())
            .then((data) => {
                handleClickVariant(data.status === 200 ? 'success' : 'error', data.messenger, enqueueSnackbar);
                if (data?.status === 200) {
                    dispatch(actions.setProfileUser(data?.data));
                    dispatch(actions.setIsLogin(false));
                }
            });
    });
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId,
                scope: 'email',
            });
        }
        gapi.load('client:auth2', start);
    }, []);
    const onSuccess = (res) => {
        const data = {
            fullName: res?.profileObj?.name,
            email: res?.profileObj?.email,
            idGoogle: res?.profileObj?.googleId,
        };
        fetch(`${URL}create-user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(actions.setProfileUser(res.profileObj));
                refreshTokenSetup(res);
                dispatch(actions.setIsLogin(false));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const onFailure = (res) => {
        console.log(res);
    };
    return (
        // <div className={cx('wrapper')}>
        //     <div className={cx('close')} onClick={() => dispatch(actions.setIsLogin(false))}>
        //         <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        //     </div>
        //     <h2 className={cx('header')}>Chào mừng bạn đến với VUTAN MOBILE</h2>
        //     <GoogleLogin
        //         className={cx('login')}
        //         key="AIzaSyB0qwxU7f2lJNsK_OQD8JNKzIPKqaKfIpA"
        //         clientId={clientId}
        //         buttonText="Đăng nhập bằng google"
        //         onSuccess={onSuccess}
        //         onFailure={onFailure}
        //         cookiePolicy={'single_host_origin'}
        //         isSignedIn={true}
        //     />
        // </div>
        <Container style={{ padding: '30px', width: '100%' }}>
            <Grid style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h1" component="h2" fontWeight={700} marginBottom="30px">
                    {isLoginForm ? 'Đăng nhập' : 'Đăng ký'}
                </Typography>
                {isLoginForm ? (
                    ''
                ) : (
                    <TextField
                        label="Họ và tên"
                        fullWidth
                        value={localValues.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                    ></TextField>
                )}

                <TextField
                    label="Tài khoản"
                    size="large"
                    style={{ margin: '20px 0 20px 0' }}
                    fullWidth
                    variant="outlined"
                    value={localValues.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                ></TextField>
                <TextField
                    label="Mật khẩu"
                    type="password"
                    fullWidth
                    value={localValues.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                ></TextField>
                <Button
                    variant="contained"
                    size="large"
                    style={{ marginTop: '30px', fontSize: '18px' }}
                    onClick={() => {
                        isLoginForm ? handleLoginOnclick() : handleSignInOnclick();
                    }}
                >
                    Xác nhận
                </Button>
                {/* <Button variant="contained">Đăng ký</Button> */}
            </Grid>
            <p
                onClick={changeLogin}
                className={cx('text')}
                style={{ width: '100%', textAlign: 'right', fontSize: '16px', color: 'blue' }}
            >
                {isLoginForm ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản rồi.'}
            </p>
        </Container>
    );
}

export default Login;
