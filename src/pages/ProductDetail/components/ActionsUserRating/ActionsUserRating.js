import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faXmark } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Overlay from '~/components/Overlay';
import MobileDetailForm from '../ProductDetailForm';
import styles from './ActionsUserRating.module.scss';
const cx = classNames.bind(styles);
function ActionsUserRating({ comments, endArrComment, showMoreCmt, hidCmt, data }) {
    const [openForm, setOpenForm] = useState(false);
    const handleOpenForm = useCallback(() => {
        setOpenForm(true);
    }, []);
    const handleCloseForm = useCallback(() => {
        setOpenForm(false);
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Button className={cx('btn-write-assess')} primary onClick={handleOpenForm}>
                Viết đánh giá
            </Button>

            {openForm && (
                <Overlay>
                    <>
                        <div className={cx('header')}>
                            <div className={cx('text')}>Đánh giá</div>
                            <div className={cx('close')} onClick={handleCloseForm}>
                                Đóng &nbsp;<FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                            </div>
                        </div>
                        <MobileDetailForm data={data} />
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
