import { faCaretRight, faXmark, faStar as starFull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback, useState } from 'react';
import Button from '~/components/Button';
import Overlay from '~/components/Overlay';
import MobileDetailForm from '../MobileDetailForm';
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
            <Button width="200px" primary onClick={handleOpenForm}>
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
            {comments && endArrComment <= 3 ? (
                <Button more rightIcon={<FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>} onClick={showMoreCmt}>
                    Xem {comments && comments.length - 3} đánh giá
                </Button>
            ) : (
                <Button more rightIcon={<FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>} onClick={hidCmt}>
                    Ẩn bớt đánh giá
                </Button>
            )}
        </div>
    );
}

export default ActionsUserRating;
