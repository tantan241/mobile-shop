import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faXmark } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Overlay from '~/components/Overlay';
import MobileDetailForm from '../ProductDetailForm';
import styles from './ActionsUserRating.module.scss';
import Login from '~/layouts/MainLayout/components/Header/components/Login';
import useStore from '~/store/hooks';
import { PROFILE } from '~/constants';
import { fetchData } from '~/common';
import { API_GET_ROLE_COMMENT } from '~/urlConfig';
const cx = classNames.bind(styles);
function ActionsUserRating({ comments, endArrComment, showMoreCmt, hidCmt, data }) {
    const [login, setLogin] = useState(false);
    const [store, dispatch] = useStore();
    const [openForm, setOpenForm] = useState(false);
    const [commented, setCommented] = useState(false);
    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem(PROFILE));
        if (profile && Object.keys(profile).length > 0) {
            fetchData(API_GET_ROLE_COMMENT, { userId: profile.id, productId: store.product.id }, 'POST', true).then(
                (res) => {
                    if (res.status === 200) {
                        res.commented === 0 ? setCommented(false) : setCommented(true);
                    }
                },
            );
        }
    }, [store.reload]);

    const handleOpenForm = useCallback(() => {
        const profile = JSON.parse(localStorage.getItem(PROFILE)) || {};
        if (Object.keys(profile).length > 0) {
            setOpenForm(true);
        } else {
            setLogin(true);
        }
    }, []);

    const handleCloseForm = useCallback(() => {
        setOpenForm(false);
    }, []);
    const handleClose = useCallback(() => {
        setLogin(false);
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Button disabled={commented} className={cx('btn-write-assess')} primary onClick={handleOpenForm}>
                Viết đánh giá
            </Button>

            {openForm && (
                <Overlay open={login} handleClose={handleCloseForm}>
                    <>
                        <div className={cx('header')}>
                            <div className={cx('text')}>Đánh giá</div>
                            <div className={cx('close')} onClick={handleCloseForm}>
                                Đóng &nbsp;<FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                            </div>
                        </div>
                        <MobileDetailForm data={data} handleCloseForm={handleCloseForm} />
                    </>
                </Overlay>
            )}
            {comments && comments.length > 3 ? (
                endArrComment <= 3 ? (
                    <Button
                        className={cx('btn-action-assess')}
                        mobile
                        more
                        rightIcon={<FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>}
                        onClick={showMoreCmt}
                    >
                        Xem {comments && comments.length - 3} đánh giá
                    </Button>
                ) : (
                    <Button
                        className={cx('btn-action-assess')}
                        mobile
                        more
                        rightIcon={<FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>}
                        onClick={hidCmt}
                    >
                        Ẩn bớt đánh giá
                    </Button>
                )
            ) : (
                <Button className={cx('btn-action-assess')} more disabled>
                    Xem thêm đánh giá
                </Button>
            )}
            {login && (
                <Overlay>
                    <Login handleClose={handleClose}></Login>
                </Overlay>
            )}
        </div>
    );
}
ActionsUserRating.propTypes = {
    comments: PropTypes.array,
    endArrComment: PropTypes.number,
    showMoreCmt: PropTypes.func,
    hidCmt: PropTypes.func,
    data: PropTypes.object,
};

export default ActionsUserRating;
