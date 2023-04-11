import PropTypes from 'prop-types';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Pages.module.scss';
import useStore from '~/store/hooks';
import { actions } from '~/store';
import PageBtn from './components/PageBtn';
const cx = classNames.bind(styles);
function MobilePages({ pagesMax }) {
    const [store, dispatch] = useStore();
    const [pages, setPages] = useState([]);

    useEffect(() => {
        setPages(() => {
            const pages = [];
            for (let i = 1; i <= pagesMax; i++) {
                if (i === 1) {
                    pages.push({ pageNumber: i, active: true });
                } else {
                    pages.push({ pageNumber: i, active: false });
                }
            }
            return pages;
        });
    }, [pagesMax]);
    useEffect(() => {
        setPagesDisplay(pages.slice(0, 6));
    }, [pages]);
    const [pagesDisplay, setPagesDisplay] = useState(pages.slice(0, 6));
    const curPageNumber = useMemo(() => {
        const pageActive = pages.find((page) => {
            return page.active === true;
        });
        return pageActive && pageActive.pageNumber;
    }, [pages]);

    useEffect(() => {
        if (curPageNumber) {
            if (pagesMax > 6) {
                const lastPagesDisplay = pagesDisplay[pagesDisplay.length - 1];
                lastPagesDisplay.pageNumber === curPageNumber &&
                    setPagesDisplay(pages.slice(curPageNumber - 2, curPageNumber + 4));
            } else {
                setPagesDisplay(pages.slice(0, 6));
            }
            curPageNumber < 6 && setPagesDisplay(pages.slice(0, 6));
            if (curPageNumber > 6) {
                let quantityPageInDispaly = 6;
                const pagesCount = Math.floor(pagesMax / 6);
                for (var i = 0; i <= pagesCount; i++) {
                    curPageNumber >= quantityPageInDispaly &&
                        curPageNumber < quantityPageInDispaly + 4 &&
                        setPagesDisplay(pages.slice(quantityPageInDispaly - 2, quantityPageInDispaly + 4));
                    quantityPageInDispaly += 4;
                }
            }
        }
    }, [curPageNumber, pagesMax]);

    const handlePageBtnClick = useCallback(
        (pageNumber) => {
            setPages((prev) =>
                prev.map((page) =>
                    page.pageNumber === pageNumber ? { ...page, active: true } : { ...page, active: false },
                ),
            );
        },
        [curPageNumber],
    );

    const handleNextPage = useCallback(() => {
        let pageNumberNext;
        setPages((prev) =>
            prev.map((page, index) => {
                // page.active === true && (pageNumberNext = page.pageNumber + 1) && handlePageApi(pageNumberNext);
                page.active === true &&
                    (pageNumberNext = page.pageNumber + 1) &&
                    dispatch(actions.setNumberPage(pageNumberNext));
                return page.pageNumber === pageNumberNext ? { ...page, active: true } : { ...page, active: false };
            }),
        );
    }, []);
    const handleBackPage = useCallback(() => {
        let pageNumberBack;
        setPages((prev) => {
            prev.forEach((page, index) => {
                page.active === true &&
                    (pageNumberBack = page.pageNumber - 1) &&
                    dispatch(actions.setNumberPage(pageNumberBack));
            });
            return prev.map((page, index) =>
                page.pageNumber === pageNumberBack ? { ...page, active: true } : { ...page, active: false },
            );
        });
    }, []);
    const handleBackStartPage = useCallback(() => {
        setPages((prev) =>
            prev.map((page, index) => (page.pageNumber === 1 ? { ...page, active: true } : { ...page, active: false })),
        );

        dispatch(actions.setNumberPage(1));
    }, []);
    const handleNextEndPage = useCallback(() => {
        setPages((prev) =>
            prev.map((page, index) =>
                page.pageNumber === pagesMax ? { ...page, active: true } : { ...page, active: false },
            ),
        );
        dispatch(actions.setNumberPage(pagesMax));
    }, []);

    const handlePageApi = useCallback((page) => {
        dispatch(actions.setParamsApiFilter({ page }));
    }, []);
    return (
        <div className={cx('wrapper')}>
            {pagesMax > 1 && (
                <div>
                    {pagesMax > 6 && (
                        <button
                            className={cx('btn-arrow')}
                            onClick={handleBackStartPage}
                            disabled={curPageNumber === 1}
                        >
                            <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                        </button>
                    )}
                    {pagesMax > 4 && (
                        <button className={cx('btn-arrow')} onClick={handleBackPage} disabled={curPageNumber === 1}>
                            <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                        </button>
                    )}

                    {pagesDisplay.map((page, index) => (
                        <PageBtn
                            key={page.pageNumber}
                            pageNumber={page.pageNumber}
                            active={page.active}
                            onPageBtnClick={handlePageBtnClick}
                        />
                    ))}
                    {pagesMax > 4 && (
                        <button
                            className={cx('btn-arrow')}
                            onClick={() => handleNextPage()}
                            disabled={curPageNumber === pagesMax}
                        >
                            <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                        </button>
                    )}

                    {pagesMax > 6 && (
                        <button
                            className={cx('btn-arrow')}
                            onClick={() => handleNextEndPage()}
                            disabled={curPageNumber === pagesMax}
                        >
                            <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
MobilePages.propTypes = {
    pagesMax: PropTypes.number,
};

export default MobilePages;
