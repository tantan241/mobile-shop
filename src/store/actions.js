import {
    SET_SEARCH_HISTORY,
    ADD_SEARCH_HISTORY,
    DELETE_SEARCH_HISTORY,
    SET_PARAMS_API_FILTER,
    SET_PRODUCT,
    SET_NUMBER_PAGE,
    ADD_PRODUCT_IN_CART,
    UPDATE_NUMBER_PRODUCT_BUY,
    DELETE_PRODUCT_IN_CART,
    SET_PRODUCT_COMPARE,
    SET_PROFILE_USER,
    SET_IS_LOGIN,
    SET_OPEN_FILTERS_MOBILE,
    SET_FILTER_PRICE,
    SET_RELOAD,
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
export const setFilterPrice = (payload) => {
    return {
        type: SET_FILTER_PRICE,
        payload,
    };
};
export const setProduct = (payload) => {
    return {
        type: SET_PRODUCT,
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
export const setReload = (payload) => {
    return {
        type: SET_RELOAD,
        payload,
    };
};
// export const updateNumberProductBuy = (payload) => {
//     return {
//         type: UPDATE_NUMBER_PRODUCT_BUY,
//         payload,
//     };
// };
export const deleteProductInCart = (payload) => {
    return {
        type: DELETE_PRODUCT_IN_CART,
        payload,
    };
};
export const setProductCompare = (payload) => {
    return {
        type: SET_PRODUCT_COMPARE,
        payload,
    };
};
export const setProfileUser = (payload) => {
    return {
        type: SET_PROFILE_USER,
        payload,
    };
};
export const setIsLogin = (payload) => {
    return {
        type: SET_IS_LOGIN,
        payload,
    };
};
export const setOpenFiltersMobile = (payload) => {
    return {
        type: SET_OPEN_FILTERS_MOBILE,
        payload,
    };
};
