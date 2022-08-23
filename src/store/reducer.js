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
} from './constants';
import { CART, SEARCH_HISTORY } from '~/constants';

const initState = {
    searchHistory: [],
    pathApi: 'http://localhost:3000/products',
    paramsApiFilter: {},
    idProduct: null,
    numberPage: 1,
    isLogin: true,
    productsInCart: JSON.parse(localStorage.getItem(CART)) || [],
};
const reducer = (state, action) => {
    let newProductsInCart;
    switch (action.type) {
        case SET_SEARCH_HISTORY:
            return { ...state, searchHistory: action.payload };
        case ADD_SEARCH_HISTORY:
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
        case SET_ID_PRODUCT:
            return { ...state, idProduct: action.payload };
        case SET_NUMBER_PAGE:
            return { ...state, numberPage: action.payload };
        case ADD_PRODUCT_IN_CART:
            newProductsInCart = [...state.productsInCart, action.payload];
            if (state.productsInCart) {
                for (const productInCart of state.productsInCart) {
                    productInCart.idProduct === action.payload.idProduct &&
                        (newProductsInCart = state.productsInCart.map((item) =>
                            item.idProduct === action.payload.idProduct
                                ? {
                                      ...item,
                                      number: item.number + 1,
                                  }
                                : item,
                        ));
                }
            }

            return { ...state, productsInCart: newProductsInCart };
        case UPDATE_NUMBER_PRODUCT_BUY:
            newProductsInCart = state.productsInCart.map((productInCart) =>
                productInCart.idProduct === action.payload.id
                    ? {
                          ...productInCart,
                          number: action.payload.number,
                      }
                    : productInCart,
            );
            return { ...state, productsInCart: newProductsInCart };

        case DELETE_PRODUCT_IN_CART:
            state.productsInCart.forEach((productInCart, index) => {
                productInCart.idProduct === action.payload && state.productsInCart.splice(index, 1);
            });
            localStorage.setItem(CART, JSON.stringify(state.productsInCart));
            return { ...state };
        default:
            throw new Error('Error');
    }
};
export { initState };
export default reducer;
