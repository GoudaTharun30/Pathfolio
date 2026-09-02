/**
 * Pathfolio API Service Wrapper
 */
const API = {
  getToken() {
    return localStorage.getItem('pathfolio_token');
  },

  setToken(token) {
    localStorage.setItem('pathfolio_token', token);
  },

  removeToken() {
    localStorage.removeItem('pathfolio_token');
  },

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch('/api' + endpoint, {
        ...options,
        headers
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 && !endpoint.includes('/auth/')) {
          this.removeToken();
          window.location.reload();
        }
        throw new Error(data.error || 'API Request failed');
      }

      return data;
    } catch (error) {
      this.showToast(error.message, 'error');
      throw error;
    }
  },

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
};
