import { ADD_SEARCH_HISTORY, SET_SEARCH_HISTORY, DELETE_SEARCH_HISTORY, SET_PARAMS_API_FILTER } from './constants';
import { SEARCH_HISTORY } from '~/constants';

const initState = {
    searchHistory: [],
    pathApi: 'http://localhost:3000/products',
    paramsApiFilter: {},
};
const reducer = (state, action) => {
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
        default:
            throw new Error('Error');
    }
};
export { initState };
export default reducer;
