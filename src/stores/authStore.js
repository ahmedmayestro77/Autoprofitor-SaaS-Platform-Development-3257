import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  isAuthenticated: false,

  login: async (email, password) => {
    try {
      const response = await authService.login(email, password);
      set({ 
        user: response.user, 
        isAuthenticated: true,
        loading: false 
      });
      return response;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  register: async (email, password, name) => {
    try {
      const response = await authService.register(email, password, name);
      set({ 
        user: response.user, 
        isAuthenticated: true,
        loading: false 
      });
      return response;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ 
      user: null, 
      isAuthenticated: false,
      loading: false 
    });
  },

  checkAuth: async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        set({ 
          user, 
          isAuthenticated: true,
          loading: false 
        });
      } else {
        set({ 
          user: null, 
          isAuthenticated: false,
          loading: false 
        });
      }
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false,
        loading: false 
      });
    }
  },

  updateUser: (userData) => {
    set(state => ({
      user: { ...state.user, ...userData }
    }));
  }
}));