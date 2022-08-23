import {
    SET_SEARCH_HISTORY,
    ADD_SEARCH_HISTORY,
    DELETE_SEARCH_HISTORY,
    SET_PARAMS_API_FILTER,
    SET_ID_PRODUCT,
    SET_NUMBER_PAGE,
    ADD_PRODUCT_IN_CART,
    UPDATE_NUMBER_PRODUCT_BUY,
    DELETE_PRODUCT_IN_CART,
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
export const setNumberPage = (payload) => {
    return {
        type: SET_NUMBER_PAGE,
        payload,
    };
};
export const addProductInCart = (payload) => {
    return {
        type: ADD_PRODUCT_IN_CART,
        payload,
    };
};
export const updateNumberProductBuy = (payload) => {
    return {
        type: UPDATE_NUMBER_PRODUCT_BUY,
        payload,
    };
};
export const deleteProductInCart = (payload) => {
    return {
        type: DELETE_PRODUCT_IN_CART,
        payload,
    };
};
