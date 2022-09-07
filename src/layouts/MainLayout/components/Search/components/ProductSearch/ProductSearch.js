import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './ProductSearch.module.scss';
import useStore from '~/store/hooks';
import { actions } from '~/store';
const cx = classNames.bind(styles);
function ProductSearch({ product }) {
    const [store, dispatch] = useStore();
    const moneyDiscount = (product.price * product.discount) / 100;
    const price = (product.price - moneyDiscount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const handleClick = useCallback((id) => {
        dispatch(actions.setIdProduct(id));
    }, []);
    const linkTo = `/product-detail/${product.name}`;
    return (
        <Link to={linkTo} className={cx('wrapper')} onClick={() => handleClick(product.id)}>
            <img src={product.path} className={cx('image')} alt="" />
            <div>
                <p className={cx('name')}>{product.name}</p>
                <span className={cx('price')}>{price} vnđ</span>
            </div>
        </Link>
    );
}
ProductSearch.propsTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductSearch;
