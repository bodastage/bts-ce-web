import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8181';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const ERROR_CODES = {
    "401" : "Un-authorized resource access",
    "404" : "Resource not found",
};

export const API_URL = "http://192.168.99.100";
export default axios;
    