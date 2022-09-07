import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './ProductConfig.module.scss';
import Button from '~/components/Button';
import ConfigItem from '../ConfigItem';
const cx = classNames.bind(styles);
function MobileConfig({ configs, name }) {
    const [endArrConfig, setEndArrConfig] = useState(5);
    const handleShowMoreConfig = useCallback(() => {
        setEndArrConfig(config.lenght);
    }, []);
    const handleHidMoreConfig = useCallback(() => {
        setEndArrConfig(5);
    }, []);
    return (
        <>
            {configs && (
                <div className={cx('wrapper')}>
                    <div className={cx('name')}>Cấu hình {name}</div>
                    <ul className={cx('config-list')}>
                        {configs &&
                            configs
                                .slice(0, endArrConfig)
                                .map((config) => <ConfigItem key={config.id} data={config} />)}
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
