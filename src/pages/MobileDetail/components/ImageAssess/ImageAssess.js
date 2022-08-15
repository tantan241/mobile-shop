import classNames from 'classnames/bind';
import styles from './ImageAssess.module.scss';
const cx = classNames.bind(styles);
function ImageAssess({ more }) {
    return (
        <div className={cx('wrapper')}>
            <img
                src="https://cdn.tgdd.vn/comment/52227435/z3591630208898_7e9ded6e6612b8b80090e90851d6f1a7-20220812105434.jpg"
                alt="ảnh"
            />
            {more && <div className={cx('more')}>Xem thêm</div>}
        </div>
    );
}

export default ImageAssess;
