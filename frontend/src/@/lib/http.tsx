import axios from 'axios';
import config from '../../utility/configs';

// Create an Axios instance with default configuration
const http = axios.create({
    baseURL: config.API, // Your API base URL
    timeout: 10000, // Timeout in milliseconds,
    // withCredentials: true, // Add this line to enable credentials (cookies) with cross-origin requests
});

// Request interceptor to add headers, authentication, etc.
http.interceptors.request.use(
    (config) => {
        // Modify the request config here (e.g., add headers)
        // config.headers.Authorization = `Bearer ${yourAuthToken}`;
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

// Response interceptor to handle responses or errors
http.interceptors.response.use(
    (response) => {
        // Modify the response data or do something with it
        return response;
    },
    (error) => {
        // Handle response errors here
        // For example, you can check for specific status codes and take actions accordingly
        if (error.response) {
            // Handle HTTP error responses (status codes other than 2xx)
            console.error('HTTP error:', error.response.status);
        } else if (error.request) {
            // Handle request errors (no response received)
            console.error('Request error:', error.request);
        } else {
            // Something else went wrong
            console.error('Error:', error.message);
        }

        return error.response;
    }
);

export default http;
