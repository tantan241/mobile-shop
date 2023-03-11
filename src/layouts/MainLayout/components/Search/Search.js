import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import * as searchService from '~/apiServices/searchService';
import { useDebounce } from '~/hooks';
import { actions } from '~/store';
import { SEARCH_HISTORY } from '~/constants';
import useStore from '~/store/hooks';
import HistoryItem from './components/HistoryItem';
import ProductSearch from './components/ProductSearch';
import { API_PRODUCT } from '~/urlConfig';
import { fetchData } from '~/common';
const cx = classNames.bind(styles);
function Search() {
    const [searchInput, setSearchInput] = useState('');
    const [state, dispatch] = useStore();
    const searchHistory = state.searchHistory;

    const [searchProducts, setSearchProducts] = useState([]);
    const searchValue = useDebounce(searchInput, 400);
    useEffect(() => {
        dispatch(actions.setSearchHistory(JSON.parse(localStorage.getItem(SEARCH_HISTORY)) || []));
    }, []);
    useEffect(() => {
        fetchData(`${API_PRODUCT}?q=${searchValue}`).then((res) => {
            if (res.status === 200) {
                setSearchProducts(res.data);
            }
        });
        // const fetchApi = async () => {
        //     const res = await searchService.search(searchValue);
        //     setSearchProducts(res);
        // };
        // fetchApi();
    }, [searchValue]);
    const handleInputChange = useCallback((e) => {
        if (e.target.value.startsWith(' ')) {
            return;
        }
        setSearchInput(e.target.value);
    });
    const handleClickSearch = useCallback(() => {
        if (searchValue.startsWith(' ') || searchValue.length === 0) {
            return;
        }
        dispatch(actions.addSearchHistory(searchValue));
        setSearchInput('');
    }, [searchValue, searchHistory]);

    return (
        <div className={cx('wrapper')}>
            <div style={{ width: '90%', position: 'relative' }}>
                <Tippy
                    interactive="true"
                    placement="bottom"
                    trigger="click"
                    offset={['5%', 10]}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <span className={cx('result-title')}>
                                {searchValue ? 'Gợi ý tìm kiếm' : 'Lịch sử tìm kiếm'}
                            </span>
                            <ul className={cx('history-list')}>
                                {searchValue
                                    ? searchProducts.map((product, index) => (
                                          <ProductSearch key={index} product={product} />
                                      ))
                                    : searchHistory
                                          .slice(0, 10)
                                          .map((historyItem, index) => (
                                              <HistoryItem key={index} title={historyItem} index={index} />
                                          ))}
                            </ul>
                        </div>
                    )}
                >
                    <input
                        className={cx('search-input')}
                        value={searchInput}
                        placeholder="Bạn đang cần tìm gì ?"
                        onChange={handleInputChange}
                    />
                </Tippy>
            </div>
            <Link
                to={searchValue.length > 1 && '/search/?q=' + searchValue}
                onClick={handleClickSearch}
                className={cx('search-btn')}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
            </Link>
        </div>
    );
}

export default Search;
