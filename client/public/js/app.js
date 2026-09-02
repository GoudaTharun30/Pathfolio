/**
 * Main Pathfolio SPA Router & Application Shell Controller
 */
const app = {
  currentRoute: 'landing',
  routeParams: {},
  currentUser: null,

  async init() {
    // Initialize Theme System & Customs
    if (window.themeManager) {
      themeManager.init();
    }

    const initialRoute = this.routeFromLocation();
    // Check if token exists
    const token = API.getToken();
    if (token) {
      try {
        const data = await API.request('/auth/me');
        this.currentUser = data.user;
        this.currentRoute = initialRoute.route === 'landing' ? 'dashboard' : initialRoute.route;
        this.routeParams = initialRoute.params;
      } catch (e) {
        API.removeToken();
        this.currentUser = null;
        this.currentRoute = 'landing';
      }
    } else {
      this.currentRoute = 'landing';
    }

    this.updateShellUI();
    await this.renderCurrentView();
  },

  updateShellUI() {
    const publicHeader = document.getElementById('public-header');
    const appShell = document.getElementById('app-shell');
    const publicViewport = document.getElementById('public-viewport');
    const floatingAi = document.getElementById('floating-ai-container');

    const isAuthenticatedView = [
      'dashboard', 'profile', 'roadmaps', 'roadmap-detail', 'learning', 'projects', 'resume', 'portfolio'
    ].includes(this.currentRoute);

    if (isAuthenticatedView && this.currentUser) {
      publicHeader.style.display = 'none';
      publicViewport.style.display = 'none';
      appShell.style.display = 'flex';
      floatingAi.style.display = 'block';

      // Update Header user info
      const nameEl = document.getElementById('header-user-name');
      const avatarEl = document.getElementById('header-user-avatar');
      if (nameEl) nameEl.textContent = this.currentUser.name || 'User';
      if (avatarEl) avatarEl.textContent = (this.currentUser.name || 'U').charAt(0).toUpperCase();

      // Highlight active sidebar item
      document.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));
      const activeNavId = this.currentRoute === 'roadmap-detail' ? 'nav-roadmaps' : `nav-${this.currentRoute}`;
      const activeNav = document.getElementById(activeNavId);
      if (activeNav) activeNav.classList.add('active');

      // Update Header title
      const titles = {
        dashboard: 'Dashboard Overview',
        profile: 'User Profile',
        roadmaps: 'Career Roadmaps Explorer',
        'roadmap-detail': 'Interactive Learning Journey',
        learning: 'Learning Planner',
        projects: 'Project Recommendations',
        resume: 'Resume Builder',
        portfolio: 'Portfolio Builder'
      };
      const headingEl = document.getElementById('page-title-heading');
      if (headingEl) headingEl.textContent = titles[this.currentRoute] || 'Dashboard';
    } else {
      publicHeader.style.display = 'block';
      publicViewport.style.display = 'block';
      appShell.style.display = 'none';
      floatingAi.style.display = 'none';
    }
  },

  async navigate(route, params = {}) {
    this.currentRoute = route;
    this.routeParams = params;
    const url = this.urlForRoute(route, params);
    if (window.location.pathname !== url) window.history.pushState({ route, params }, '', url);
    this.updateShellUI();
    await this.renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  routeFromLocation() {
    const match = window.location.pathname.match(/^\/roadmaps\/([^/]+)$/);
    return match ? { route: 'roadmap-detail', params: { slug: decodeURIComponent(match[1]) } } : { route: 'landing', params: {} };
  },

  urlForRoute(route, params) {
    return route === 'roadmap-detail' && params.slug ? `/roadmaps/${encodeURIComponent(params.slug)}` : '/';
  },

  async restoreHistoryRoute() {
    const target = this.routeFromLocation();
    this.currentRoute = this.currentUser && target.route === 'landing' ? 'dashboard' : target.route;
    this.routeParams = target.params;
    this.updateShellUI();
    await this.renderCurrentView();
  },

  async renderCurrentView() {
    const publicViewport = document.getElementById('public-viewport');
    const mainContent = document.getElementById('main-content');

    switch (this.currentRoute) {
      case 'landing':
        publicViewport.innerHTML = LandingView.render();
        break;
      case 'login':
        publicViewport.innerHTML = AuthView.renderLogin();
        break;
      case 'register':
        publicViewport.innerHTML = AuthView.renderRegister();
        break;
      case 'dashboard':
        mainContent.innerHTML = await DashboardView.render();
        break;
      case 'profile':
        mainContent.innerHTML = await ProfileView.render();
        break;
      case 'roadmaps':
        mainContent.innerHTML = await RoadmapsView.render();
        break;
      case 'roadmap-detail':
        mainContent.innerHTML = await RoadmapDetailView.render(this.routeParams?.slug);
        break;
      case 'learning':
        mainContent.innerHTML = await LearningPlannerView.render();
        break;
      case 'projects':
        mainContent.innerHTML = await ProjectsView.render();
        break;
      case 'resume':
        mainContent.innerHTML = await ResumeBuilderView.render();
        break;
      case 'portfolio':
        mainContent.innerHTML = await PortfolioBuilderView.render();
        break;
      default:
        publicViewport.innerHTML = LandingView.render();
    }
  },

  toggleSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    sidebar.classList.toggle('active');
  },

  toggleThemeMode() {
    if (window.themeManager) {
      window.themeManager.toggleMode();
    }
  },

  openCustomizeTheme() {
    if (window.CustomizeTheme) {
      window.CustomizeTheme.open();
    }
  },

  toggleCustomizeTheme() {
    if (window.CustomizeTheme) {
      window.CustomizeTheme.toggle();
    }
  },

  toggleMobileNav() {
    const links = document.getElementById('public-nav-links');
    links.classList.toggle('active');
  },

  scrollToSection(sectionId) {
    if (this.currentRoute !== 'landing') {
      this.navigate('landing').then(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  },

  logout() {
    API.removeToken();
    this.currentUser = null;
    API.showToast('Logged out successfully.');
    this.navigate('landing');
  },

  closeModal() {
    const modal = document.getElementById('modal-root');
    modal.classList.remove('active');
  },

  toggleAiChat() {
    const chatWin = document.getElementById('ai-chat-window');
    chatWin.classList.toggle('active');
  },

  async sendAiMessage() {
    const input = document.getElementById('ai-chat-input');
    const msg = input.value.trim();
    if (!msg) return;

    const chatContainer = document.getElementById('ai-chat-messages');

    // Append User message
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble chat-bubble-user';
    userBubble.textContent = msg;
    chatContainer.appendChild(userBubble);

    input.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Append AI Thinking indicator
    const aiBubble = document.createElement('div');
    aiBubble.className = 'chat-bubble chat-bubble-ai';
    aiBubble.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Thinking...';
    chatContainer.appendChild(aiBubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
      const res = await API.request('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ prompt: msg })
      });

      aiBubble.innerHTML = res.reply.replace(/\n/g, '<br>');
    } catch (err) {
      aiBubble.textContent = 'Sorry, I encountered an error answering that request.';
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
};

// Initialize App when DOM is loaded
document.addEventListener('DOMContentLoaded', () => app.init());
