import { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Compare.module.scss';
import * as compareService from '~/apiServices/compareService';
import useStore from '~/store/hooks';
import ProductCompare from './components/ProductCompare';
import SelectsFormCompare from './components/SelectsFormCompare';
import { fetchData } from '~/common';
import { API_GET_PRODUCT } from '~/urlConfig';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
const cx = classNames.bind(styles);
function Compare() {
    const [store, dispatch] = useStore();
    const [product1, setProduct1] = useState({});
    const [product2, setProduct2] = useState();
    const [compare, setCompare] = useState();
    useEffect(() => {
        document.title = 'So sánh sản phẩm | VuTan-Mobile';
    }, []);
    useEffect(() => {
        console.log(store.productCompare);
        fetchData(`${API_GET_PRODUCT}?id=${store.productCompare.id}`).then((res) => {
            if (res.status === 200) {
                console.log(res.data, '00000');
                setProduct1(res.data);
            }
        });
        // const fetchApi = async () => {
        //     const res = await compareService.products(store.productCompare);
        //     setProduct1(res[0]);
        // };
        // fetchApi();
    }, [store]);
    const handleCompare = useCallback((id) => {
        const fetchApi = async () => {
            const res = await compareService.product2(id);
            setProduct2(res[0]);
            const resDetailProduct = await compareService.compare();
            setCompare(resDetailProduct);
        };
        fetchApi();
    }, []);
    const handleClose = useCallback(() => {
        setProduct2();
        setCompare();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header')}>So sánh sản phẩm</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>
                            <ProductCompare src={product1.image} name={product1.name} />
                        </TableCell>
                        <TableCell>
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
                <TableBody></TableBody>
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
