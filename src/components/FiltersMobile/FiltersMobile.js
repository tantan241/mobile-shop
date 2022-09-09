import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './FiltersMobile.module.scss';
import { actions } from '~/store';
import useStore from '~/store/hooks';
import Overlay from '../Overlay';
import Filters from '../Filters';
import FilterPrice from '../Filters/components/FilterPrice';
const cx = classNames.bind(styles);
function FiltersMobile({ filters }) {
    const [store, dispatch] = useStore();
    return (
        <div className={cx('wrapper')}>
            <Overlay full_display>
                <h2 className={cx('header')}>
                    <div className={cx('close')} onClick={() => dispatch(actions.setOpenFiltersMobile(false))}>
                        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                    </div>
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
