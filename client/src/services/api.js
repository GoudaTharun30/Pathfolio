/**
 * Centralized API Service for Pathfolio Client
 * Manages HTTP communication with the Express backend (/api)
 */

const API_BASE_URL = '/api';

export const api = {
  getToken() {
    return localStorage.getItem('pathfolio_token');
  },

  setToken(token) {
    if (token) {
      localStorage.setItem('pathfolio_token', token);
    }
  },

  removeToken() {
    localStorage.removeItem('pathfolio_token');
  },

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };

    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

    try {
      const res = await fetch(url, {
        ...options,
        headers
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || data.message || `Request failed with status ${res.status}`);
      }

      return data;
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err.message);
      throw err;
    }
  }
};

export default api;
