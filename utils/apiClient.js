import axios from 'axios';
import { API_BASE_URL } from '../constants.js';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // fail fast instead of hanging forever on a dead server
  headers: {
    'Content-Type': 'application/json'
  }
});

// Normalize errors so every command can just read err.response?.data?.error
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // network failure, server down, DNS issue, etc.
      error.response = { data: { error: 'network_error', message: 'Could not reach Nyxo server' } };
    }
    return Promise.reject(error);
  }
);

export default apiClient;