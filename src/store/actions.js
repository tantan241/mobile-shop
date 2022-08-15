import {
    SET_SEARCH_HISTORY,
    ADD_SEARCH_HISTORY,
    DELETE_SEARCH_HISTORY,
    SET_PARAMS_API_FILTER,
    SET_ID_PRODUCT,
} from './constants';
export const addSearchHistory = (payload) => {
    return {
        type: ADD_SEARCH_HISTORY,
        payload,
    };
};
export const setSearchHistory = (payload) => {
    return {
        type: SET_SEARCH_HISTORY,
        payload,
    };
};
export const deleteSearchHistory = (payload) => {
    return {
        type: DELETE_SEARCH_HISTORY,
        payload,
    };
};
export const setParamsApiFilter = (payload) => {
    return {
        type: SET_PARAMS_API_FILTER,
        payload,
    };
};
export const setIdProduct = (payload) => {
    return {
        type: SET_ID_PRODUCT,
        payload,
    };
};
