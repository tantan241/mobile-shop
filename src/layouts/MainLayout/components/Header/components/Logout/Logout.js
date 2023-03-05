import { GoogleLogout } from 'react-google-login';
import { Link } from 'react-router-dom';
import { PROFILE } from '~/constants';
import { actions } from '~/store';
import useStore from '~/store/hooks';
const clientId = '775095883325-s8o67ovu8ego3m7ei2ksk5mv304cn3gi.apps.googleusercontent.com';
function Logout(props) {
    const { setProfile } = props;
    const [store,dispatch]= useStore()
    const onSuccess = (res) => {
        // dispatch(actions.setProfileUser({}));
        localStorage.removeItem(PROFILE);
        setProfile({});
        dispatch(actions.setReload(new Date() *1))
        dispatch(actions.addProductInCart(0));
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
