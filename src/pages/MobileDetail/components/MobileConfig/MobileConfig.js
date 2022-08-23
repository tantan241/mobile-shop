import { config } from '@fortawesome/fontawesome-svg-core';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback, useState } from 'react';
import Button from '~/components/Button';
import ConfigItem from '../ConfigItem';
import styles from './MobileConfig.module.scss';
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
        <div className={cx('wrapper')}>
            <div className={cx('name')}>Cấu hình Điện thoại {name}</div>
            <ul className={cx('config-list')}>
                {configs &&
                    configs.slice(0, endArrConfig).map((config) => <ConfigItem key={config.id} data={config} />)}
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
    );
}

export default MobileConfig;
