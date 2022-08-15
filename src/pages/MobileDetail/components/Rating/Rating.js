import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStartRegular } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './Rating.module.scss';

const cx = classNames.bind(styles);
function Rating({ number }) {
    return (
        <div className={cx('wrapper')}>
            {number < 0.5 ? (
                <FontAwesomeIcon icon={faStartRegular}></FontAwesomeIcon>
            ) : number === 0.5 ? (
                <FontAwesomeIcon icon={faStarHalfStroke}></FontAwesomeIcon>
            ) : (
                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            )}
            {number < 1.5 ? (
                <FontAwesomeIcon icon={faStartRegular}></FontAwesomeIcon>
            ) : number === 1.5 ? (
                <FontAwesomeIcon icon={faStarHalfStroke}></FontAwesomeIcon>
            ) : (
                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            )}
            {number < 2.5 ? (
                <FontAwesomeIcon icon={faStartRegular}></FontAwesomeIcon>
            ) : number === 2.5 ? (
                <FontAwesomeIcon icon={faStarHalfStroke}></FontAwesomeIcon>
            ) : (
                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            )}
            {number < 3.5 ? (
                <FontAwesomeIcon icon={faStartRegular}></FontAwesomeIcon>
            ) : number === 3.5 ? (
                <FontAwesomeIcon icon={faStarHalfStroke}></FontAwesomeIcon>
            ) : (
                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            )}
            {number < 4.5 ? (
                <FontAwesomeIcon icon={faStartRegular}></FontAwesomeIcon>
            ) : number === 4.5 ? (
                <FontAwesomeIcon icon={faStarHalfStroke}></FontAwesomeIcon>
            ) : (
                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            )}
        </div>
    );
}
Rating.propTypes = {
    number: PropTypes.number.isRequired,
};

export default Rating;
