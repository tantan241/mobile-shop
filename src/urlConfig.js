import { URL } from './utils/urlConfig';

export const API_PRODUCT = `${URL}/api/product`;
export const API_CART = `${URL}/api/cart`;
export const API_COMMENT = `${URL}/api/comment`;
export const API_FILES = `${URL}/api/files`;
export const API_FILTER = `${URL}/api/filter`;

export const API_GET_PRODUCT = `${API_PRODUCT}/get-product`;

export const API_UPLOAD_FILE = `${API_FILES}/upload-file`;

export const API_GET_COMMENT = `${API_COMMENT}/get-comment`;
export const API_SEND_COMMENT = `${API_COMMENT}/send-comment`;

export const API_ADD_PRODUCT_GO_CART = `${API_CART}/add-cart`;
export const API_GET_INFO_CART = `${API_CART}/get-cart`;
export const API_UPDATE_CART = `${API_CART}/update-cart`;
export const API_DELETE_PRODUCT_IN_CART = `${API_CART}/delete-cart`;
