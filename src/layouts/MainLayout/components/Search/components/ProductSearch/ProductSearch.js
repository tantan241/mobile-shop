import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import useStore from '~/store/hooks';
import classNames from 'classnames/bind';
import styles from './ProductSearch.module.scss';
import { actions } from '~/store';

const cx = classNames.bind(styles);

function ProductSearch({ product }) {
    const [store, dispatch] = useStore();
    const price = product.price_current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const handleClick = useCallback((id) => {
        dispatch(actions.setIdProduct(id));
    }, []);
    return (
        <Link to="/mobile-detail" className={cx('wrapper')} onClick={() => handleClick(product.id)}>
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
