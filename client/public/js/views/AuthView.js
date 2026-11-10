/**
 * Authentication View (Login & Sign Up)
 */
const AuthView = {
  renderLogin() {
    return `
      <div class="container" style="min-height: calc(100vh - 80px); display: flex; align-items: center; justify-content: center; padding: 3rem 1rem;">
        <div class="card paper-fold" style="width: 100%; max-width: 440px; position: relative;">
          <div class="washi-tape-top" aria-hidden="true"></div>
          <div style="text-align: center; margin-bottom: 2rem;">
            <div class="logo" style="justify-content: center; margin-bottom: 0.75rem;">
              <i class="fa-solid fa-compass"></i> Pathfolio<span>.</span>
            </div>
            <h2>Welcome Back</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Log in to access your dashboard, career roadmaps, and portfolio.</p>
          </div>

          <button type="button" class="btn btn-primary btn-block btn-lg" style="margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: center; gap: 0.75rem;" onclick="app.openSignIn()">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
            Continue with Google & Clerk
          </button>
          <div style="display: flex; align-items: center; margin: 1rem 0; color: var(--text-muted); font-size: 0.85rem;">
            <div style="flex: 1; height: 1px; background: var(--border-color);"></div>
            <span style="padding: 0 0.75rem;">or log in with password</span>
            <div style="flex: 1; height: 1px; background: var(--border-color);"></div>
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

            <button type="submit" class="btn btn-outline btn-block btn-lg" style="margin-top: 1rem;" id="login-submit-btn">
              <i class="fa-solid fa-right-to-bracket"></i> Log In with Password
            </button>
          </form>

          <div style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-muted);">
            Don't have an account yet? <a href="#" onclick="app.openSignUp(); return false;">Sign Up</a>
          </div>
        </div>
      </div>
    `;
  },

  renderRegister() {
    return `
      <div class="container" style="min-height: calc(100vh - 80px); display: flex; align-items: center; justify-content: center; padding: 3rem 1rem;">
        <div class="card paper-fold" style="width: 100%; max-width: 460px; position: relative;">
          <div class="washi-tape-top" aria-hidden="true"></div>
          <div style="text-align: center; margin-bottom: 2rem;">
            <div class="logo" style="justify-content: center; margin-bottom: 0.75rem;">
              <i class="fa-solid fa-compass"></i> Pathfolio<span>.</span>
            </div>
            <h2>Create Account</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Join Pathfolio to accelerate your software engineering career.</p>
          </div>

          <button type="button" class="btn btn-primary btn-block btn-lg" style="margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: center; gap: 0.75rem;" onclick="app.openSignUp()">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
            Sign Up with Google & Clerk
          </button>
          <div style="display: flex; align-items: center; margin: 1rem 0; color: var(--text-muted); font-size: 0.85rem;">
            <div style="flex: 1; height: 1px; background: var(--border-color);"></div>
            <span style="padding: 0 0.75rem;">or create standard account</span>
            <div style="flex: 1; height: 1px; background: var(--border-color);"></div>
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

            <button type="submit" class="btn btn-outline btn-block btn-lg" style="margin-top: 1rem;" id="reg-submit-btn">
              <i class="fa-solid fa-user-plus"></i> Sign Up with Password
            </button>
          </form>

          <div style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-muted);">
            Already have an account? <a href="#" onclick="app.openSignIn(); return false;">Log In</a>
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
