import { GoogleLogout } from 'react-google-login';
import useStore from '~/store/hooks';
import { actions } from '~/store';
import { Link } from 'react-router-dom';
import { PROFILE } from '~/constants';
const clientId = '775095883325-s8o67ovu8ego3m7ei2ksk5mv304cn3gi.apps.googleusercontent.com';
function Logout({ handleLoginSuccess }) {
    const [store, dispatch] = useStore();

    const onSuccess = (res) => {
        dispatch(actions.setProfileUser({}));
        localStorage.removeItem(PROFILE);
    };

    return (
        <div>
            <Link to="/">
                <GoogleLogout clientId={clientId} buttonText="Đăng xuất" onLogoutSuccess={onSuccess} icon="" />
            </Link>
        </div>
    );
}

export default Logout;
