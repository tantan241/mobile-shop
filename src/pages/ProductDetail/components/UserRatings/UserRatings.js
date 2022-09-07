import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

import classNames from 'classnames/bind';
import Comment from '../Comment';
import styles from './UserRatings.module.scss';
import StarDetail from '../StarDetail';
import FeedbackImgList from '../FeedbackImgList';
import ActionsUserRating from '../ActionsUserRating';
const cx = classNames.bind(styles);
function UserRatings({ starDetail, comments, total, images, data }) {
    const [endArrComment, setEndArrComment] = useState(3);
    const handleShowCmt = useCallback(() => {
        comments && setEndArrComment(comments.length);
    }, [comments]);
    const handleHidCmt = useCallback(() => {
        comments && setEndArrComment(3);
    }, [comments]);

    return (
        <div className={cx('wrapper')}>
            <StarDetail starDetail={starDetail} total={total} />
            <FeedbackImgList images={images} comments={comments} />
            <div className={cx('comments')}>
                {comments &&
                    comments
                        .slice(0, endArrComment)
                        .map((comment) => (
                            <Comment
                                key={comment.id}
                                borderTop
                                name={comment.name_user}
                                star={comment.star}
                                content={comment.content}
                            />
                        ))}
            </div>
            <ActionsUserRating
                data={data}
                comments={comments}
                endArrComment={endArrComment}
                showMoreCmt={handleShowCmt}
                hidCmt={handleHidCmt}
            />
        </div>
    );
}
UserRatings.propTypes = {
    StarDetail: PropTypes.object,
    comments: PropTypes.array,
    total: PropTypes.number,
    images: PropTypes.array,
    data: PropTypes.object,
};
export default UserRatings;
