import axios from 'axios';

const axiosInstance = new axios({
    baseURL : "http://localhost:3000/api",
    withCredentials : true,
});

export default axiosInstance;
