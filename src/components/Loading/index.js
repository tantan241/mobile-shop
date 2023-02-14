import { CircularProgress } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './loading.module.scss';
const cx = classNames.bind(styles);
function Loading(props) {
    const { open } = props;
    const [openLoading, setOpenLoading] = useState(false);
    useEffect(() => {
        setOpenLoading(open);
    }, [open]);
    return (
        <div
            className={cx('wrapper', {
                openLoading,
            })}
        >
            <div className={cx('content')}>
                <CircularProgress />
            </div>
        </div>
    );
}

export default Loading;
