import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Rating from '../Rating/Rating';
import UserRatings from '../UserRatings';
import styles from './RatingDetail.module.scss';

const cx = classNames.bind(styles);
function RatingDetail({ data }) {
    const [images, setImages] = useState([]);
    useEffect(() => {
        setImages(() => {
            return data?.assess?.comments.reduce((prev, comment) => {
                return prev.concat(comment.image);
            }, []);
        });
    }, [data]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Đánh giá điện thoại {data.name}</div>
            <UserRatings
                data={data}
                starDetail={data?.assess?.star}
                comments={data?.assess?.comments}
                total={data?.assess?.total}
                images={images}
            />
        </div>
    );
}

export default RatingDetail;
