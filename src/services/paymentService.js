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

export const paymentService = {
  getSubscriptionPlans: async () => {
    const response = await api.get('/payments/plans');
    return response.data;
  },

  createSubscription: async (planId, paymentMethodId) => {
    const response = await api.post('/payments/subscribe', {
      planId,
      paymentMethodId
    });
    return response.data;
  },

  getCurrentSubscription: async () => {
    const response = await api.get('/payments/subscription');
    return response.data;
  },

  cancelSubscription: async () => {
    const response = await api.post('/payments/cancel-subscription');
    return response.data;
  },

  getPaymentMethods: async (country) => {
    const response = await api.get(`/payments/methods?country=${country}`);
    return response.data;
  },

  createPaymentIntent: async (amount, currency, paymentMethod) => {
    const response = await api.post('/payments/create-intent', {
      amount,
      currency,
      paymentMethod
    });
    return response.data;
  }
};