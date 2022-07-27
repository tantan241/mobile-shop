import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ProductSearch.module.scss';

const cx = classNames.bind(styles);

function ProductSearch({ product }) {
    const price = product.price_current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (
        <li className={cx('wrapper')}>
            <img src={product.path} className={cx('image')} />
            <div>
                <p className={cx('name')}>{product.name}</p>
                <span className={cx('price')}>{price} vnđ</span>
            </div>
        </li>
    );
}
ProductSearch.propsTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductSearch;
