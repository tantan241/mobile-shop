import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Filters.module.scss';
import FilterItem from './components/FilterItem';
const cx = classNames.bind(styles);
function Filter({ data }) {
    const [isOpen, setIsOpen] = useState(true);
    const handleTitleClick = useCallback(() => {
        setIsOpen((isOpen) => !isOpen);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div>
                <h2 onClick={handleTitleClick} className={cx('title')}>
                    <span>{data.title}</span>{' '}
                    <div>
                        {isOpen ? (
                            <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
                        ) : (
                            <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                        )}
                    </div>
                </h2>
                {isOpen && (
                    <ul className={cx('filter-list')}>
                        {data &&
                            data.children.map((filterData) => (
                                <FilterItem key={filterData.id} name={data.name} data={filterData} />
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
Filter.propTypes = {
    data: PropTypes.object,
};

export default Filter;
