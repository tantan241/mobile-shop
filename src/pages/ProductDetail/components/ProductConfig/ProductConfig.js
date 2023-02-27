import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './ProductConfig.module.scss';
import Button from '~/components/Button';
import ConfigItem from '../ConfigItem';
const cx = classNames.bind(styles);
function MobileConfig({ configs, name }) {
    const [configArr, setConfigArr] = useState([]);
    const convertConfig = {
        ram: 'Ram',
        rom: 'Rom',
        display: 'Màn hình',
        system: 'Hệ điều hành',
        front_camera: 'Camera trước',
        rear_camera: 'Camera sau',
        chip: 'Chip',
        sim: 'Sim',
        battery: 'Pin',
    };
    useEffect(() => {
        const configRp = configs.map((item) => {
            const a = item.split('=')[0];
            for (const key in convertConfig) {
                if (key === a) {
                    item = item.replace(key, convertConfig[key]);
                    return item;
                }
            }
        });
        setConfigArr(configRp);
    }, []);
    console.log(configs);
    const [endArrConfig, setEndArrConfig] = useState(5);
    const handleShowMoreConfig = useCallback(() => {
        setEndArrConfig(config.lenght);
    }, []);
    const handleHidMoreConfig = useCallback(() => {
        setEndArrConfig(5);
    }, []);
    return (
        <>
            {configArr && (
                <div className={cx('wrapper')}>
                    <div className={cx('name')}>Cấu hình {name}</div>
                    <ul className={cx('config-list')}>
                        {configArr.length > 0 &&
                            configArr
                                .slice(0, endArrConfig)
                                .map((config) => <ConfigItem key={config.id} data={config.split('=')} />)}
                    </ul>
                    {endArrConfig <= 5 ? (
                        <div className={cx('more')}>
                            <Button
                                onClick={handleShowMoreConfig}
                                more
                                rightIcon={<FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>}
                            >
                                Xem thêm cấu hình chi tiết
                            </Button>
                        </div>
                    ) : (
                        <div className={cx('more')}>
                            <Button
                                onClick={handleHidMoreConfig}
                                more
                                rightIcon={<FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>}
                            >
                                Ẩn bớt cấu hình chi tiết
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
MobileConfig.propTypes = {
    config: PropTypes.array,
    name: PropTypes.string,
};
export default MobileConfig;
