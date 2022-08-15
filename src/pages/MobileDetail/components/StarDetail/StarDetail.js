import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import ImageAssess from '../ImageAssess';
import Rating from '../Rating';
import StartPercent from '../StartPercent';
import Comment from '../Comment';
import styles from './StarDetail.module.scss';
const cx = classNames.bind(styles);
function StarDetail() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('star-detail')}>
                <div className={cx('')}>
                    <div className={cx('star-number')}>
                        <span className={cx('number')}>4.0</span>
                        <Rating number="4" />
                        <div className={cx('number-assess')}>254 đánh giá</div>
                    </div>
                    <ul className={cx('start-percents')}>
                        <StartPercent number="5" />
                        <StartPercent number="4" />
                        <StartPercent number="3" />
                        <StartPercent number="2" />
                        <StartPercent number="1" />
                    </ul>
                </div>
            </div>
            <div className={cx('image-list')}>
                <ImageAssess />
                <ImageAssess />
                <ImageAssess />
                <ImageAssess />
                <ImageAssess />
                <ImageAssess />
                <ImageAssess />
                <ImageAssess />
                <ImageAssess />
                <ImageAssess more />
            </div>
            <div className={cx('comments')}>
                <Comment />
                <Comment />
            </div>
        </div>
    );
}

export default StarDetail;
