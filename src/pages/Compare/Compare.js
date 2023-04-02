import { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Compare.module.scss';
import * as compareService from '~/apiServices/compareService';
import useStore from '~/store/hooks';
import ProductCompare from './components/ProductCompare';
import SelectsFormCompare from './components/SelectsFormCompare';
import { fetchData } from '~/common';
import { API_COMPARE_PRODUCT, API_GET_PRODUCT } from '~/urlConfig';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
const cx = classNames.bind(styles);
function Compare() {
    const [store, dispatch] = useStore();
    const [product1, setProduct1] = useState({});
    const [product2, setProduct2] = useState();
    const [compare, setCompare] = useState([]);
    const [listKeysComare, setListKeysComare] = useState([{ name: 'price', title: 'Giá' }]);
    useEffect(() => {
        document.title = 'So sánh sản phẩm | VuTan-Mobile';
    }, []);
    useEffect(() => {
        fetchData(`${API_GET_PRODUCT}?id=${store.productCompare.id}`).then((res) => {
            if (res.status === 200) {
                setProduct1(res.data);
            }
        });
    }, [store]);
    const handleCompare = useCallback((id) => {
        fetchData(`${API_GET_PRODUCT}?id=${id}`).then((res) => {
            if (res.status === 200) {
                setProduct2(res.data);
                fetchData(
                    `${API_COMPARE_PRODUCT}`,
                    { productId1: store.productCompare.id, productId2: res.data.id },
                    'POST',
                ).then((res) => {
                    if (res.status === 200) {
                        let compareList = [];
                        const priceProduct1 = (res.product1.price - res.product1.price * (res.product1.discount / 100))
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                        const priceProduct2 = (res.product2.price - res.product2.price * (res.product2.discount / 100))
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

                        compareList.push({
                            name: 'Giá',
                            productCompare1: `${priceProduct1} VNĐ`,
                            productCompare2: `${priceProduct2} VNĐ`,
                        });
                        res.product1.specifications.forEach((item) => {
                            res.product2.specifications.forEach((it) => {
                                if (item.name === it.name) {
                                    compareList.push({
                                        name: item.title,
                                        productCompare1: item.value,
                                        productCompare2: it.value,
                                    });
                                }
                            });
                        });

                        setCompare(compareList);
                    }
                });
            }
        });
    }, []);
    const handleClose = useCallback(() => {
        setProduct2();
        setCompare([]);
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header')}>So sánh sản phẩm</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ textAlign: 'center', fontSize: '1.8rem' }}>#</TableCell>
                        <TableCell style={{ width: '45%', lineHeight: 'unset' }}>
                            <ProductCompare src={product1.image} name={product1.name} />
                        </TableCell>
                        <TableCell style={{ width: '45%', lineHeight: 'unset' }}>
                            {product2 ? (
                                <ProductCompare
                                    src={product2.image}
                                    name={product2.name}
                                    icon
                                    handleClose={() => handleClose()}
                                />
                            ) : (
                                <SelectsFormCompare handleCompare={(id) => handleCompare(id)} />
                            )}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {compare.length > 0 &&
                        compare.map((item) => (
                            <TableRow>
                                <TableCell style={{ textAlign: 'center', fontSize: '1.8rem' }}>{item.name}</TableCell>
                                <TableCell style={{ fontSize: '1.8rem' }}>{item.productCompare1}</TableCell>
                                <TableCell style={{ fontSize: '1.8rem' }}>{item.productCompare2}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {/* <table className={cx('table')}>
                <colgroup>
                    <col width="20%"></col>
                    <col width="40%"></col>
                    <col width="40%"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            <ProductCompare src={product1.image} name={product1.name} />
                        </th>
                        <th>
                            {product2 ? (
                                <ProductCompare
                                    src={product2.image}
                                    name={product2.name}
                                    icon
                                    handleClose={() => handleClose()}
                                />
                            ) : (
                                <SelectsFormCompare handleCompare={(id) => handleCompare(id)} />
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {compare &&
                        compare.map((item) => (
                            <tr key={item.id}>
                                <td className={cx('text')}>{item.title}</td>
                                <td className={cx('text')}>{item.product_1}</td>
                                <td className={cx('text')}>{item.product_2}</td>
                            </tr>
                        ))}
                </tbody>
            </table> */}
        </div>
    );
}

export default Compare;
