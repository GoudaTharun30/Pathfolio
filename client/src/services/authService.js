/**
 * Authentication Service for Pathfolio
 */
import api from './api';

export const authService = {
  async register(name, email, password) {
    const data = await api.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    if (data.token) {
      api.setToken(data.token);
    }
    return data;
  },

  async login(email, password) {
    const data = await api.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data.token) {
      api.setToken(data.token);
    }
    return data;
  },

  async getCurrentUser() {
    try {
      const data = await api.request('/auth/me');
      return data.user;
    } catch (err) {
      api.removeToken();
      return null;
    }
  },

  logout() {
    api.removeToken();
  }
};

export default authService;
