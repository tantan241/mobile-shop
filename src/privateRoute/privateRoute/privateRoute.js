import Overlay from '~/components/Overlay';
import Login from '~/layouts/MainLayout/components/Header/components/Login';
import useStore from '~/store/hooks';

export const PrivateRoute = ({ children }) => {
    const [store, dispatch] = useStore();

    if (Object.keys(store.profileUser).length > 0) {
        return children;
    }

    return (
        <Overlay>
            <Login />
        </Overlay>
    );
};
