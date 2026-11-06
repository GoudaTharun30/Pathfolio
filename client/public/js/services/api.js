/**
 * Pathfolio API Service Wrapper
 */
const API = {
  getToken() {
    if (window.Clerk && window.Clerk.session) {
      // If clerk session token is cached synchronously
      return window.__clerkToken || localStorage.getItem('pathfolio_token');
    }
    return localStorage.getItem('pathfolio_token');
  },

  setToken(token) {
    window.__clerkToken = token;
    localStorage.setItem('pathfolio_token', token);
  },

  removeToken() {
    window.__clerkToken = null;
    localStorage.removeItem('pathfolio_token');
  },

  async request(endpoint, options = {}) {
    let token = this.getToken();
    if (window.Clerk && window.Clerk.session) {
      try {
        token = await window.Clerk.session.getToken();
        window.__clerkToken = token;
      } catch (e) {
        console.warn('Could not retrieve Clerk session token:', e);
      }
    }

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
          if (window.app && typeof window.app.navigate === 'function') {
            window.app.currentUser = null;
            window.app.navigate('login');
          }
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
