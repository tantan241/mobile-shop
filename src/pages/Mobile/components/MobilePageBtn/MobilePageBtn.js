import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './MobilePageBtn.module.scss';
import useStore from '~/store/hooks';
import { useCallback } from 'react';
import { actions } from '~/store';

const cx = classNames.bind(styles);

function MobilePageBtn({ pageNumber, active, hidden, onPageBtnClick = () => {} }) {
    const [store, dispatch] = useStore();
    const handlePageBtnClick = useCallback(() => {
        onPageBtnClick(pageNumber);
        dispatch(actions.setNumberPage(pageNumber));
    }, []);
    return (
        <button
            className={cx('btn-page', {
                active,
                hidden,
            })}
            onClick={() => handlePageBtnClick(pageNumber)}
        >
            {pageNumber}
        </button>
    );
}

MobilePageBtn.propTypes = {
    active: PropTypes.bool,
};

export default MobilePageBtn;
