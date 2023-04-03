import { URL } from './utils/urlConfig';

export const API_PRODUCT = `${URL}/api/product`;
export const API_CART = `${URL}/api/cart`;
export const API_COMMENT = `${URL}/api/comment`;
export const API_FILES = `${URL}/api/files`;
export const API_FILTER = `${URL}/api/filter`;
export const API_ORDER = `${URL}/api/order`;

export const API_GET_PRODUCT = `${API_PRODUCT}/get-product`;
export const API_GET_TOP_PRODUCT = `${API_PRODUCT}/get-top-product`;
export const API_GET_ROLE_COMMENT = `${API_PRODUCT}/get-role-comment`;
export const API_GET_BRAND = `${API_PRODUCT}/get-brand`;
export const API_GET_LIST_PRODUCT_COMPARE = `${API_PRODUCT}/get-list-product-compare`;
export const API_COMPARE_PRODUCT = `${API_PRODUCT}/compare-product`;

export const API_UPLOAD_FILE = `${API_FILES}/upload-file`;

export const API_GET_COMMENT = `${API_COMMENT}/get-comment`;
export const API_SEND_COMMENT = `${API_COMMENT}/send-comment`;

export const API_ADD_PRODUCT_GO_CART = `${API_CART}/add-cart`;
export const API_GET_INFO_CART = `${API_CART}/get-cart`;
export const API_UPDATE_CART = `${API_CART}/update-cart`;
export const API_DELETE_PRODUCT_IN_CART = `${API_CART}/delete-cart`;
export const API_DELETE_ALL_CART = `${API_CART}/delete-all-cart`;

export const API_CREATE_ORDER = `${API_ORDER}/create-order`;
export const API_COUNT_ORDER = `${API_ORDER}/count-order`;
export const API_GET_LIST_ORDER = `${API_ORDER}/get-list-order`;
