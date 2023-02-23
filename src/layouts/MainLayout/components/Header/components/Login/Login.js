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
import { Button, Container, Grid, makeStyles, TextField, Typography } from '@mui/material';
import SnackBar from '~/components/SnackBar';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { handleClickVariant } from '~/common';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants';
import { Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const clientId = '775095883325-s8o67ovu8ego3m7ei2ksk5mv304cn3gi.apps.googleusercontent.com';
function Login(props) {
    const { handleClose } = props;
    const { enqueueSnackbar } = useSnackbar();
    const styleTextField = {
        style: {
            fontSize: 20,
        },
    };
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
        const login = fetch(`${URL}/create-user/`, {
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
                    setIsLoginForm(true);
                }
            });
    });

    const handleLoginOnclick = useCallback(() => {
        const getToken = fetch(`${URL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(localValues),
        }).then((res) => res.json());

        const login = fetch(`${URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(localValues),
        }).then((res) => res.json());
        Promise.all([getToken, login]).then((res) => {
            handleClickVariant(res[1].status === 200 ? 'success' : 'error', res[1].messenger, enqueueSnackbar);
            if (res[1].status === 200) {
                localStorage.setItem(ACCESS_TOKEN, JSON.stringify(res[0].access));
                localStorage.setItem(REFRESH_TOKEN, JSON.stringify(res[0].refresh));
                dispatch(actions.setProfileUser(res[1].data));
                console.log(res[1].data);
                dispatch(actions.setIsLogin(false));
                handleClose && handleClose();
            }
        });
        // .then((res) => console.log(res));
        // fetch(`${URL}/login/`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(localValues),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         handleClickVariant(data.status === 200 ? 'success' : 'error', data.messenger, enqueueSnackbar);
        //         if (data?.status === 200) {
        //             dispatch(actions.setProfileUser(data?.data));
        //             dispatch(actions.setIsLogin(false));
        //         }
        //     });
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
        <Container style={{ padding: '30px', width: '100%', position: 'relative' }}>
            <Grid
                style={{
                    position: 'absolute',
                    right: '5px',
                    top: '5px',
                    border: '1px solid rgba(0,0,0,0.5)',
                    borderRadius: '999px',
                    backgroundColor: 'black',
                }}
            >
                <Close style={{ fontSize: '30px', color: 'white' }}></Close>
            </Grid>
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
                        InputProps={styleTextField}
                        InputLabelProps={styleTextField}
                        value={localValues.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                    ></TextField>
                )}

                <TextField
                    label="Tài khoản"
                    // size="large"
                    InputProps={styleTextField}
                    InputLabelProps={styleTextField}
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
                    InputProps={styleTextField}
                    InputLabelProps={styleTextField}
                    value={localValues.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    style={{ fontSize: '20px' }}
                ></TextField>
                <Button
                    disabled={!localValues.username || !localValues.password}
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
