import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import Rating from '../../../../components/Rating';
import StartPercent from '../StartPercent';
import styles from './StarDetail.module.scss';
const cx = classNames.bind(styles);
function StarDetail({ starDetail, total }) {
    const avgStar = parseFloat(
        (
            (starDetail?.star_1 * 1 +
                starDetail?.star_2 * 2 +
                starDetail?.star_3 * 3 +
                starDetail?.star_4 * 4 +
                starDetail?.star_5 * 5) /
            total
        ).toFixed(1),
    );
    const percentStar5 = ((starDetail?.star_5 / total) * 100).toFixed();
    const percentStar4 = ((starDetail?.star_4 / total) * 100).toFixed();
    const percentStar3 = ((starDetail?.star_3 / total) * 100).toFixed();
    const percentStar2 = ((starDetail?.star_2 / total) * 100).toFixed();
    const percentStar1 = ((starDetail?.star_1 / total) * 100).toFixed();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('star-number')}>
                <div className={cx('number-wrapper')}>
                    <span className={cx('number')}>{avgStar || 5}</span>
                    <Rating number={avgStar} />
                </div>

                <div className={cx('number-assess')}>{total} đánh giá</div>
            </div>
            <ul className={cx('percents')}>
                <StartPercent percent={percentStar5} number="5" />
                <StartPercent percent={percentStar4} number="4" />
                <StartPercent percent={percentStar3} number="3" />
                <StartPercent percent={percentStar2} number="2" />
                <StartPercent percent={percentStar1} number="1" />
            </ul>
        </div>
    );
}
StarDetail.propTypes = {
    starDetail: PropTypes.object,
    total: PropTypes.number,
};
export default StarDetail;
