import { useCallback, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Sort.module.scss';

import SortItem from '../SortItem';

const cx = classNames.bind(styles);

function Sort() {
    const sorts = [
        { id: 1, name: 'Nổi bật', type: 'popularity' },
        {
            id: 2,
            name: 'Giá tăng dần',
            type: 'asc',
        },
        {
            id: 3,
            name: 'Giá giảm dần',
            type: 'desc',
        },
    ];
    const [sortName, setSortName] = useState(sorts[0].name);
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenSort = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, [isOpen]);
    const handleChangeSortName = useCallback(
        (name) => {
            setSortName(name);
        },
        [sortName],
    );
    return (
        <div className={cx('wrapper')}>
            <TippyHeadless
                interactive
                trigger="click"
                placement="bottom-end"
                render={(attrs) => (
                    <ul className={cx('sort-list')} tabIndex="-1" {...attrs}>
                        {sorts.map((sort) => (
                            <SortItem key={sort.id} data={sort} handleName={handleChangeSortName} />
                        ))}
                    </ul>
                )}
            >
                <h2 onClick={handleOpenSort} className={cx('content')}>
                    <span className={cx('title')}>
                        Sắp xếp theo:<span className={cx('type-sort')}> {sortName}</span>
                        {isOpen ? (
                            <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
                        ) : (
                            <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                        )}
                    </span>
                </h2>
            </TippyHeadless>
        </div>
    );
}

export default Sort;
