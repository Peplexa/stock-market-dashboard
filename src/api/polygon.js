// src/api/polygon.js

import axios from 'axios';

const polygonAPI = axios.create({
    baseURL: 'https://api.polygon.io',
    params: {
      apiKey: process.env.REACT_APP_POLYGON_API_KEY, // Use environment variable
    },
  });
  

export default polygonAPI;
