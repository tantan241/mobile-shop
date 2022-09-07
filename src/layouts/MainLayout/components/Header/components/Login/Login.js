import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { refreshTokenSetup } from '../../refreshTokenSetup ';
import useStore from '~/store/hooks';
import { actions } from '~/store';
const cx = classNames.bind(styles);
const clientId = '775095883325-s8o67ovu8ego3m7ei2ksk5mv304cn3gi.apps.googleusercontent.com';
function Login() {
    const [store, dispatch] = useStore();
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
        dispatch(actions.setProfileUser(res.profileObj));
        refreshTokenSetup(res);
        dispatch(actions.setIsLogin(false));
    };
    const onFailure = (res) => {
        console.log(res);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('close')} onClick={() => dispatch(actions.setIsLogin(false))}>
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </div>
            <h2 className={cx('header')}>Chào mừng bạn đến với VUTAN MOBILE</h2>
            <GoogleLogin
                className={cx('login')}
                key="AIzaSyB0qwxU7f2lJNsK_OQD8JNKzIPKqaKfIpA"
                clientId={clientId}
                buttonText="Đăng nhập bằng google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}

export default Login;
