/**
 * Authentication View (Login & Sign Up)
 */
const AuthView = {
  renderLogin() {
    return `
      <div class="container" style="min-height: calc(100vh - 80px); display: flex; align-items: center; justify-content: center; padding: 3rem 1rem;">
        <div class="card" style="width: 100%; max-width: 440px;">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div class="logo" style="justify-content: center; margin-bottom: 0.75rem;">
              <i class="fa-solid fa-compass"></i> Pathfolio<span>.</span>
            </div>
            <h2>Welcome Back</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Log in to access your dashboard, career roadmaps, and portfolio.</p>
          </div>

          <form onsubmit="AuthView.handleLogin(event)">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="login-email" class="form-control" placeholder="name@example.com" required>
            </div>

            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" id="login-password" class="form-control" placeholder="••••••••" required>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top: 1rem;" id="login-submit-btn">
              <i class="fa-solid fa-right-to-bracket"></i> Log In
            </button>
          </form>

          <div style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-muted);">
            Don't have an account yet? <a href="#" onclick="app.navigate('register')">Sign Up</a>
          </div>
        </div>
      </div>
    `;
  },

  renderRegister() {
    return `
      <div class="container" style="min-height: calc(100vh - 80px); display: flex; align-items: center; justify-content: center; padding: 3rem 1rem;">
        <div class="card" style="width: 100%; max-width: 460px;">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div class="logo" style="justify-content: center; margin-bottom: 0.75rem;">
              <i class="fa-solid fa-compass"></i> Pathfolio<span>.</span>
            </div>
            <h2>Create Account</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Join Pathfolio to accelerate your software engineering career.</p>
          </div>

          <form onsubmit="AuthView.handleRegister(event)">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" id="reg-name" class="form-control" placeholder="Tharun Kumar" required>
            </div>

            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="reg-email" class="form-control" placeholder="name@example.com" required>
            </div>

            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" id="reg-password" class="form-control" placeholder="At least 6 characters" required minlength="6">
            </div>

            <div class="form-group">
              <label class="form-label">Confirm Password</label>
              <input type="password" id="reg-confirm-password" class="form-control" placeholder="Re-enter password" required>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top: 1rem;" id="reg-submit-btn">
              <i class="fa-solid fa-user-plus"></i> Sign Up
            </button>
          </form>

          <div style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-muted);">
            Already have an account? <a href="#" onclick="app.navigate('login')">Log In</a>
          </div>
        </div>
      </div>
    `;
  },

  async handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const btn = document.getElementById('login-submit-btn');

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';

    try {
      const data = await API.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      API.setToken(data.token);
      API.showToast('Login successful!');
      app.currentUser = data.user;
      app.navigate('dashboard');
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Log In';
    }
  },

  async handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const btn = document.getElementById('reg-submit-btn');

    if (password !== confirmPassword) {
      API.showToast('Passwords do not match.', 'error');
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';

    try {
      const data = await API.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, confirmPassword })
      });

      API.setToken(data.token);
      API.showToast('Account created successfully!');
      app.currentUser = data.user;
      app.navigate('dashboard');
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Sign Up';
    }
  }
};
