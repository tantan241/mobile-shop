import { ACCESS_TOKEN } from './constants';

export const handleClickVariant = (variant, message, enqueueSnackbar) => {
    enqueueSnackbar(message, { variant });
};
export const fetchData = (url, body, method = 'GET', hasToken = false) => {
    const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN)) ? JSON.parse(localStorage.getItem(ACCESS_TOKEN)) : '';
    let headers = {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
    };
    if (hasToken) {
        headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        };
    }
    return fetch(url, {
        method,
        headers,
        body: JSON.stringify(body),
    }).then((res) => res.json());
};
