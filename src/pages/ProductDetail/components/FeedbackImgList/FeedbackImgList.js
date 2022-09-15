import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faXmark } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './FeedbackImgList.module.scss';
import Overlay from '~/components/Overlay';
import Comment from '../Comment';
import ImageAssess from '../ImageAssess';
const cx = classNames.bind(styles);
function FeedbackImgList({ images, comments }) {
    const [showOverlay, setShowOverLay] = useState(false);
    const [commentDetail, setCommentDetail] = useState();
    const [showAllImage, setShowAllImage] = useState();
    const handleImageClick = useCallback(
        (image) => {
            comments &&
                comments.forEach((comment) => {
                    image === comment.image && setCommentDetail(comment);
                });
            setShowOverLay(true);
            setShowAllImage(false);
        },
        [comments],
    );
    const handleCloseOverlay = useCallback(() => {
        setShowOverLay(false);
        setShowAllImage(false);
    }, []);
    const handleShowAllImages = useCallback(() => {
        setShowOverLay(true);
        setShowAllImage(true);
    }, []);
    return (
        <div className={cx('wrapper')}>
            {images &&
                images.slice(0, 10).map((image, index) => {
                    if (index === 9) {
                        return <ImageAssess onClick={() => handleShowAllImages()} more key={index} src={image} />;
                    }
                    return <ImageAssess onClick={() => handleImageClick(image)} key={index} src={image} />;
                })}
            {showOverlay && (
                <Overlay>
                    <>
                        <div className={cx('header')}>
                            <div className={cx('show-all')}>
                                {showAllImage ? (
                                    <div>Có tất cả {images && images.length} ảnh</div>
                                ) : commentDetail ? (
                                    <div onClick={() => handleShowAllImages()}>
                                        <FontAwesomeIcon icon={faBorderAll}></FontAwesomeIcon> &nbsp; Xem tất cả
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className={cx('close')} onClick={handleCloseOverlay}>
                                Đóng &nbsp;
                                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                            </div>
                        </div>
                        {showAllImage ? (
                            <div className={cx('detail')}>
                                <div className={cx('images')}>
                                    {images &&
                                        images.map((image, index) => (
                                            <ImageAssess
                                                s_3
                                                onClick={() => handleImageClick(image)}
                                                key={index}
                                                sizeL
                                                src={image}
                                            />
                                        ))}
                                </div>
                            </div>
                        ) : commentDetail ? (
                            <div className={cx('detail')}>
                                <div className={cx('image')}>
                                    <img alt="ảnh" src={commentDetail.image} />
                                </div>
                                <div className={cx('content')}>
                                    <Comment
                                        name={commentDetail.name_user}
                                        star={commentDetail.star}
                                        content={commentDetail.content}
                                    />
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </>
                </Overlay>
            )}
        </div>
    );
}
FeedbackImgList.propTypes = {
    images: PropTypes.array,
    comments: PropTypes.array,
};

export default FeedbackImgList;
