import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Rating from '../Rating/Rating';
import StarDetail from '../StarDetail/StarDetail';
import styles from './RatingDetail.module.scss';

const cx = classNames.bind(styles);
function RatingDetail() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Đánh giá điện thoại Poco x3 pro</div>
            <StarDetail />
        </div>
    );
}

export default RatingDetail;
