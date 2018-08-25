import axios from 'axios';
import 'url-polyfill';

//server host
let url = new URL(window.location.href);
let host = url.searchParams.get("api_server");
let apiURL = host || "http://localhost";
apiURL = apiURL + ':8181';

axios.defaults.baseURL = apiURL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const ERROR_CODES = {
    "401" : "Un-authorized resource access",
    "404" : "Resource not found",
};



export const API_URL = apiURL;
export default axios;
    