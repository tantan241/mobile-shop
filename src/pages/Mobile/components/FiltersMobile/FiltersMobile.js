import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './FiltersMobile.module.scss';
import { actions } from '~/store';
import useStore from '~/store/hooks';
import Overlay from '../../../../components/Overlay';
import Filters from '../../../../components/Filters';
import FilterPrice from '../../../../components/Filters/components/FilterPrice';
import CloseIcon from '@mui/icons-material/Close';
import { Fab } from '@mui/material';
const cx = classNames.bind(styles);
function FiltersMobile({ filters }) {
    const [store, dispatch] = useStore();
    return (
        <div className={cx('wrapper')}>
            <Overlay full_display>
                <h2 className={cx('header')}>
                    {/* <div className={cx('close')} onClick={() => dispatch(actions.setOpenFiltersMobile(false))}>
                        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                    </div> */}
                    <Fab size="small" color="error" onClick={() => dispatch(actions.setOpenFiltersMobile(false))}>
                        <CloseIcon style={{ fontSize: '20px' }}></CloseIcon>
                    </Fab>
                </h2>
                {filters.map((filter) => (
                    <Filters data={filter} key={filter.id} />
                ))}
                <FilterPrice />
            </Overlay>
        </div>
    );
}
FiltersMobile.propTypes = {
    filters: PropTypes.array.isRequired,
};
export default FiltersMobile;
