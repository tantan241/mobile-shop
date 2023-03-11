import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import UserRatings from '../UserRatings';
import styles from './RatingDetail.module.scss';
import useStore from '~/store/hooks';
const cx = classNames.bind(styles);
function RatingDetail({ data }) {
    const [images, setImages] = useState([]);
    const [store, dispatch] = useStore();
    useEffect(() => {
        data?.comments &&
            data?.comments.length > 0 &&
            setImages(() => {
                return data?.comments.reduce((prev, comment) => {
                    return prev.concat(comment.image);
                }, []);
            });
    }, [data]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Đánh giá {store.product.name}</div>
            <UserRatings
                data={data}
                starDetail={data?.star}
                comments={data?.comments}
                total={data?.total}
                images={images}
            />
        </div>
    );
}
RatingDetail.propTypes = {
    data: PropTypes.object,
};
export default RatingDetail;
