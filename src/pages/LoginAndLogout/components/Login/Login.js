import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './refreshTokenSetup ';
const clientId = '788657802114-3c1nucu9lt14lig97ege4nf01ls5pu08.apps.googleusercontent.com';
function Login() {
    const onSuccess = (res) => {
        console.log('[Login Succsess] currentUser' + res.profileObj);
        refreshTokenSetup(res);
    };
    const onFailure = (res) => {
        console.log('[Login failed] res' + res);
    };
    return (
        <div>
            <GoogleLogin
                key="AIzaSyBB92fepVdvgbYHSnb6w8McQ1052OeBN4I"
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
