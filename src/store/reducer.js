import {
    ADD_SEARCH_HISTORY,
    SET_SEARCH_HISTORY,
    DELETE_SEARCH_HISTORY,
    SET_PARAMS_API_FILTER,
    SET_ID_PRODUCT,
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
import { CART, SEARCH_HISTORY } from '~/constants';

const initState = {
    searchHistory: [],
    pathApi: 'http://localhost:3000/products',
    paramsApiFilter: {},
    filterPrice: {
        fromPrice: 0,
        toPrice: 0,
    },
    idProduct: null,
    numberPage: 1,
    isLogin: true,
    productsInCart: 0,
    productCompare: {},
    profileUser: {},
    openFiltersMobile: false,
    reload: 0
};
const reducer = (state, action) => {
    switch (action.type) {
        case SET_SEARCH_HISTORY:
            return { ...state, searchHistory: action.payload };
        case ADD_SEARCH_HISTORY:
            if (state.searchHistory.includes(action.payload)) {
                return { ...state };
            }
            const newSearchHistory = [action.payload, ...state.searchHistory];
            localStorage.setItem(SEARCH_HISTORY, JSON.stringify(newSearchHistory));
            return {
                ...state,
                searchHistory: newSearchHistory,
            };
        case DELETE_SEARCH_HISTORY:
            state.searchHistory.splice(action.payload, 1);
            localStorage.setItem(SEARCH_HISTORY, JSON.stringify(state.searchHistory));
            return {
                ...state,
                searchHistory: state.searchHistory,
            };
        case SET_PARAMS_API_FILTER:
            return { ...state, paramsApiFilter: { ...state.paramsApiFilter, ...action.payload } };
        case SET_FILTER_PRICE:
            return { ...state, filterPrice: { ...state.filterPrice, ...action.payload } };
        case SET_ID_PRODUCT:
            return { ...state, idProduct: action.payload };
        case SET_NUMBER_PAGE:
            return { ...state, numberPage: action.payload };
        case ADD_PRODUCT_IN_CART:
            return { ...state, productsInCart: action.payload };
        case SET_RELOAD:
            return { ...state, reload: action.payload };
        // case UPDATE_NUMBER_PRODUCT_BUY:
        //     newProductsInCart = state.productsInCart.map((productInCart) =>
        //         productInCart.idProduct === action.payload.id
        //             ? {
        //                   ...productInCart,
        //                   number: action.payload.number,
        //               }
        //             : productInCart,
        //     );
        //     return { ...state, productsInCart: newProductsInCart };

        case DELETE_PRODUCT_IN_CART:
            state.productsInCart.forEach((productInCart, index) => {
                productInCart.idProduct === action.payload && state.productsInCart.splice(index, 1);
            });
            localStorage.setItem(CART, JSON.stringify(state.productsInCart));
            return { ...state };
        case SET_PRODUCT_COMPARE:
            return { ...state, productCompare: action.payload };
        case SET_PROFILE_USER:
            return { ...state, profileUser: action.payload };
        case SET_IS_LOGIN:
            return { ...state, isLogin: action.payload };
        case SET_OPEN_FILTERS_MOBILE:
            return { ...state, openFiltersMobile: action.payload };

        default:
            throw new Error('Error');
    }
};
export { initState };
export default reducer;
