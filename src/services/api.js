// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.17.1.116:3050',
});

export default api;