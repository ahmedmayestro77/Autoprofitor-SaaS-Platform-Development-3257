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

export const productService = {
  getProducts: async (page = 1, limit = 20, filters = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    const response = await api.get(`/products?${params}`);
    return response.data;
  },

  getProduct: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },

  updateProductPrice: async (productId, newPrice) => {
    const response = await api.patch(`/products/${productId}/price`, {
      price: newPrice
    });
    return response.data;
  },

  optimizePrice: async (productId, strategy = 'profit') => {
    const response = await api.post(`/products/${productId}/optimize`, {
      strategy
    });
    return response.data;
  },

  bulkOptimize: async (productIds, strategy = 'profit') => {
    const response = await api.post('/products/bulk-optimize', {
      productIds,
      strategy
    });
    return response.data;
  },

  getPricingHistory: async (productId) => {
    const response = await api.get(`/products/${productId}/pricing-history`);
    return response.data;
  }
};