import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.99.100:8181/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = "";
export default axios;