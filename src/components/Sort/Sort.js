import { useCallback, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faBars } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Sort.module.scss';
import SortItem from './components/SortItem';
import useStore from '~/store/hooks';
import { actions } from '~/store';
const cx = classNames.bind(styles);
function Sort(props) {
    const { setOrderBy } = props;
    const [store, dispatch] = useStore();
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
        (data) => {
            setOrderBy(data.type);
            setSortName(data.name);
        },
        [sortName],
    );
    return (
        <div className={cx('wrapper')}>
            <div className={cx('menu-mobile')} onClick={() => dispatch(actions.setOpenFiltersMobile(true))}>
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </div>
            <TippyHeadless
                interactive
                trigger="click"
                placement="bottom-start"
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
