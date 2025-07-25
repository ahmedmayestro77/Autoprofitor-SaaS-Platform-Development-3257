import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const storeService = {
  connectShopify: async (shopUrl, accessToken) => {
    const response = await api.post('/stores/connect/shopify', {
      shopUrl,
      accessToken
    });
    return response.data;
  },

  connectWooCommerce: async (storeUrl, consumerKey, consumerSecret) => {
    const response = await api.post('/stores/connect/woocommerce', {
      storeUrl,
      consumerKey,
      consumerSecret
    });
    return response.data;
  },

  connectMagento: async (storeUrl, apiKey) => {
    const response = await api.post('/stores/connect/magento', {
      storeUrl,
      apiKey
    });
    return response.data;
  },

  getConnectedStores: async () => {
    const response = await api.get('/stores');
    return response.data;
  },

  disconnectStore: async (storeId) => {
    const response = await api.delete(`/stores/${storeId}`);
    return response.data;
  },

  syncProducts: async (storeId) => {
    const response = await api.post(`/stores/${storeId}/sync`);
    return response.data;
  }
};