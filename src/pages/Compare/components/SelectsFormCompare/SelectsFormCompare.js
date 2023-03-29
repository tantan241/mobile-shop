import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './SelectsFormCompare.module.scss';
import * as compareService from '~/apiServices/compareService';
import useStore from '~/store/hooks';
import Button from '~/components/Button';
import SelectFormItem from './components/SelectFormItem';
import { fetchData } from '~/common';
import { API_GET_BRAND, API_GET_LIST_PRODUCT_COMPARE } from '~/urlConfig';
const cx = classNames.bind(styles);
function SelectsFormCompare({ handleCompare }) {
    const [store, dispatch] = useStore();
    const [brandId, setBrandId] = useState();
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetchData(API_GET_BRAND).then((res) => {
            if (res.status === 200) {
                setBrands(res.data);
            }
        });
    }, []);
    useEffect(() => {
        const body = {
            brand: brandId,
            type: store.productCompare.type,
            typeAccessory: store.productCompare.type_accessory,
        };
        fetchData(API_GET_LIST_PRODUCT_COMPARE, body, 'POST').then((res) => {
            if (res.status === 200) {
                setProducts(res.data);
            }
        });
        // const fetchApi = async () => {
        //     let res = await compareService.products({ brand_id: brandId, type: store.productCompare.type });
        //     if (store.productCompare.type_accessory) {
        //         res = await compareService.products({
        //             brand_id: brandId,
        //             type: store.productCompare.type,
        //             type_accessory: store.productCompare.type_accessory,
        //         });
        //     }
        //     setProducts(res);
        // };
        // fetchApi();
    }, [brandId]);
    const handleSelectBrandChange = useCallback((id) => {
        setBrandId(id);
    }, []);
    const handleSelectProductChange = useCallback((id) => {
        setProduct(id);
    }, []);
    return (
        <div className={cx('wrapper')}>
            <SelectFormItem
                name="brand"
                data={brands}
                title="Thương hiệu"
                handleChoose={(id) => handleSelectBrandChange(id)}
            />
            <SelectFormItem
                name="name"
                data={products}
                title="Tên sản phẩm"
                handleChoose={(id) => handleSelectProductChange(id)}
            />
            <div className={cx('action')}>
                <Button primary onClick={() => handleCompare(product)}>
                    So Sánh
                </Button>
            </div>
        </div>
    );
}
SelectsFormCompare.propTypes = {
    handleCompare: PropTypes.func,
};

export default SelectsFormCompare;
