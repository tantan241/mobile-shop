import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';

import Header from './components/Header';

const cx = classNames.bind(styles);
function MainLayout({ children }) {
    // console.log(childern);
    return (
        <div className={cx('wrapper')}>
            <Header />
            {/* <Navbar /> */}
            <div className={cx('content')}>
                <div className={cx('center')}>{children}</div>
            </div>
        </div>
    );
}
MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;
