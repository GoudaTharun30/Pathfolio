/**
 * Main Pathfolio SPA Router & Application Shell Controller
 */
const app = {
  currentRoute: 'landing',
  routeParams: {},
  currentUser: null,

  /** Returns a Clerk appearance object that matches Pathfolio's current theme */
  getClerkAppearance() {
    const isPaper = document.body.classList.contains('theme-paper') || document.documentElement.getAttribute('data-theme-style') === 'paper';
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    if (isPaper) {
      return {
        layout: { socialButtonsVariant: 'blockButton', logoPlacement: 'none' },
        variables: {
          colorPrimary: '#171717',
          colorPrimaryHover: '#333333',
          colorBackground: '#FFFEFA',
          colorInputBackground: '#F8F5EE',
          colorInputText: '#171717',
          colorText: '#171717',
          colorTextSecondary: '#5C5852',
          colorNeutral: '#77736C',
          colorDanger: '#B3261E',
          colorSuccess: '#3B7A38',
          borderRadius: '12px',
          fontFamily: "'Patrick Hand', 'Gaegu', cursive",
          fontSize: '16px'
        },
        elements: {
          card: {
            background: '#FFFEFA',
            border: '2.5px solid #171717',
            boxShadow: '4px 6px 0px #171717',
            borderRadius: '16px'
          },
          headerTitle: {
            fontFamily: "'Patrick Hand', cursive",
            fontWeight: '700',
            fontSize: '1.6rem',
            color: '#171717'
          },
          formButtonPrimary: {
            background: '#171717',
            color: '#FFFEFA',
            border: '2px solid #171717',
            borderRadius: '10px',
            fontFamily: "'Patrick Hand', cursive",
            fontSize: '1.1rem',
            boxShadow: '2px 2px 0px #171717'
          },
          formFieldInput: {
            background: '#FFFEFA',
            border: '2px solid #171717',
            color: '#171717',
            borderRadius: '8px'
          }
        }
      };
    }

    return {
      layout: {
        socialButtonsVariant: 'blockButton',
        logoPlacement: 'none'
      },
      variables: {
        colorPrimary: '#6366f1',
        colorPrimaryHover: '#4f46e5',
        colorBackground: isDark ? '#151d30' : '#ffffff',
        colorInputBackground: isDark ? '#0f172a' : '#f8fafc',
        colorInputText: isDark ? '#f8fafc' : '#0f172a',
        colorText: isDark ? '#f8fafc' : '#0f172a',
        colorTextSecondary: isDark ? '#94a3b8' : '#475569',
        colorNeutral: isDark ? '#94a3b8' : '#475569',
        colorDanger: '#ef4444',
        colorSuccess: '#10b981',
        colorAlphaShade: isDark ? 'white' : 'black',
        borderRadius: '10px',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '15px',
        spacingUnit: '0.95rem'
      },
      elements: {
        card: {
          background: isDark ? '#151d30' : '#ffffff',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
          boxShadow: isDark ? '0 10px 25px rgba(0,0,0,0.5)' : '0 10px 25px rgba(0,0,0,0.12)',
          borderRadius: '16px'
        },
        headerTitle: {
          fontFamily: 'Outfit, sans-serif',
          fontWeight: '700',
          fontSize: '1.5rem',
          color: isDark ? '#f8fafc' : '#0f172a'
        },
        headerSubtitle: {
          color: isDark ? '#94a3b8' : '#475569'
        },
        formButtonPrimary: {
          background: '#6366f1',
          color: '#ffffff',
          borderRadius: '8px',
          fontWeight: '600',
          '&:hover': { background: '#4f46e5' }
        },
        formFieldInput: {
          background: isDark ? '#0f172a' : '#f8fafc',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
          color: isDark ? '#f8fafc' : '#0f172a',
          borderRadius: '8px',
          '&:focus': { borderColor: '#6366f1' }
        },
        formFieldLabel: {
          color: isDark ? '#94a3b8' : '#475569',
          fontWeight: '500'
        },
        dividerRow: {
          '& > div': { borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }
        },
        dividerText: {
          color: isDark ? '#64748b' : '#94a3b8'
        },
        footerActionText: {
          color: isDark ? '#94a3b8' : '#475569'
        },
        footerActionLink: {
          color: '#6366f1',
          '&:hover': { color: '#4f46e5' }
        },
        identityPreviewText: {
          color: isDark ? '#f8fafc' : '#0f172a'
        },
        otpCodeFieldInput: {
          background: isDark ? '#0f172a' : '#f8fafc',
          border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #e2e8f0',
          color: isDark ? '#f8fafc' : '#0f172a'
        },
        socialButtonsBlockButton: {
          background: isDark ? '#1e2942' : '#f1f5f9',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
          color: isDark ? '#f8fafc' : '#0f172a',
          borderRadius: '8px',
          '&:hover': { background: isDark ? '#263452' : '#e2e8f0' }
        },
        socialButtonsBlockButtonText: {
          color: isDark ? '#f8fafc' : '#0f172a',
          fontWeight: '500'
        }
      }
    };
  },

  async init() {
    // Initialize Theme System & Customs
    if (window.themeManager) {
      themeManager.init();
    }

    // Initialize Paper World Transitions and Doodles
    if (window.paperTransitions) {
      paperTransitions.init();
    }
    if (window.paperDecorations) {
      paperDecorations.init();
    }

    // Initialize Clerk JS if available
    await this.initClerk();

    const initialRoute = this.routeFromLocation();

    // Check if user is authenticated via Clerk or legacy token
    if (window.Clerk && window.Clerk.user) {
      const clerkUser = window.Clerk.user;
      const primaryEmail = clerkUser.primaryEmailAddress ? clerkUser.primaryEmailAddress.emailAddress : '';
      const fullName = clerkUser.fullName || `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User';

      this.currentUser = {
        id: clerkUser.id,
        name: fullName,
        email: primaryEmail,
        imageUrl: clerkUser.imageUrl
      };

      try {
        const token = await window.Clerk.session.getToken();
        API.setToken(token);
      } catch (e) {
        console.warn('Error fetching Clerk token at init:', e);
      }

      this.currentRoute = (initialRoute.route === 'landing' || initialRoute.route === 'login' || initialRoute.route === 'register') ? 'dashboard' : initialRoute.route;
      this.routeParams = initialRoute.params;
    } else {
      const token = API.getToken();
      if (token) {
        try {
          const data = await API.request('/auth/me');
          this.currentUser = data.user;
          this.currentRoute = (initialRoute.route === 'landing' || initialRoute.route === 'login' || initialRoute.route === 'register') ? 'dashboard' : initialRoute.route;
          this.routeParams = initialRoute.params;
        } catch (e) {
          API.removeToken();
          this.currentUser = null;
          this.currentRoute = 'landing';
        }
      } else {
        this.currentRoute = (initialRoute.route === 'dashboard') ? 'landing' : initialRoute.route;
      }
    }

    this.updateShellUI();
    await this.renderCurrentView();
  },

  async initClerk() {
    try {
      // Priority 1: key already set as global variable
      let publishableKey = window.CLERK_PUBLISHABLE_KEY;

      // Priority 2: read from the Clerk script tag's data attribute (most reliable)
      if (!publishableKey) {
        const clerkScript = document.querySelector('script[data-clerk-publishable-key]');
        if (clerkScript) {
          publishableKey = clerkScript.getAttribute('data-clerk-publishable-key');
        }
      }

      // Priority 3: fetch from backend /api/config
      if (!publishableKey) {
        try {
          const cfg = await fetch('/api/config').then(r => r.json());
          publishableKey = cfg.clerkPublishableKey;
        } catch (e) {
          console.warn('Could not fetch Clerk publishable key from server:', e);
        }
      }

      if (!publishableKey) {
        console.info('Clerk Publishable Key not configured; proceeding in standard mode.');
        return;
      }

      // Wait up to 6 seconds for the Clerk browser bundle script to define window.Clerk or window.ClerkJS
      const waitForClerkGlobal = () => new Promise(resolve => {
        if (window.Clerk || window.ClerkJS) return resolve();
        let checks = 0;
        const interval = setInterval(() => {
          checks++;
          if (window.Clerk || window.ClerkJS || checks > 60) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });

      await waitForClerkGlobal();

      if (window.Clerk) {
        if (!window.Clerk.loaded && typeof window.Clerk.load === 'function') {
          await window.Clerk.load({
            publishableKey
          });
        }
      } else if (window.ClerkJS) {
        window.Clerk = new window.ClerkJS(publishableKey);
        await window.Clerk.load();
      }

      if (window.Clerk && typeof window.Clerk.addListener === 'function') {
        // Listen to auth state changes from Clerk
        window.Clerk.addListener(async ({ user, session }) => {
          if (user && session) {
            const token = await session.getToken();
            API.setToken(token);
            const fullName = user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';
            app.currentUser = {
              id: user.id,
              name: fullName,
              email: user.primaryEmailAddress ? user.primaryEmailAddress.emailAddress : '',
              imageUrl: user.imageUrl
            };
            if (app.currentRoute === 'landing' || app.currentRoute === 'login' || app.currentRoute === 'register') {
              app.navigate('dashboard');
            } else {
              app.updateShellUI();
            }
          } else if (app.currentUser && app.currentUser.id && String(app.currentUser.id).startsWith('user_')) {
            // Only sign out if the user was actively authenticated via Clerk (Clerk IDs start with user_)
            API.removeToken();
            app.currentUser = null;
            app.navigate('landing');
          }
        });
      }
    } catch (err) {
      console.warn('Clerk initialization error:', err);
    }
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
      if (avatarEl) {
        if (this.currentUser.imageUrl) {
          avatarEl.innerHTML = `<img src="${this.currentUser.imageUrl}" alt="User Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
        } else {
          avatarEl.textContent = (this.currentUser.name || 'U').charAt(0).toUpperCase();
        }
      }

      // Mount Clerk UserButton if element exists
      const clerkUserBtnContainer = document.getElementById('clerk-user-button');
      if (clerkUserBtnContainer && window.Clerk && window.Clerk.user) {
        clerkUserBtnContainer.innerHTML = '';
        window.Clerk.mountUserButton(clerkUserBtnContainer);
      }

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
    if (window.paperTransitions && window.paperTransitions.isTransitioning) {
      return; // Prevent overlapping transitions during rapid navigation
    }

    const titles = {
      landing: 'Returning to Home...',
      login: 'Opening Login Sheet...',
      register: 'Opening Sign Up Sheet...',
      dashboard: 'Turning to Dashboard...',
      profile: 'Opening My Profile...',
      roadmaps: 'Unfolding Career Roadmaps...',
      'roadmap-detail': 'Opening Learning Journey...',
      learning: 'Flipping to Learning Planner...',
      projects: 'Viewing Recommended Projects...',
      resume: 'Drafting Resume Sheet...',
      portfolio: 'Opening Portfolio Pages...'
    };
    const label = titles[route] || 'Turning Page...';

    const performNav = async () => {
      this.currentRoute = route;
      this.routeParams = params;
      const url = this.urlForRoute(route, params);
      if (window.location.pathname !== url) window.history.pushState({ route, params }, '', url);
      this.updateShellUI();
      await this.renderCurrentView();
      if (window.paperDecorations && typeof paperDecorations.applyPageDecorations === 'function') {
        paperDecorations.applyPageDecorations();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (window.paperTransitions) {
      await paperTransitions.transition(performNav, label);
    } else {
      await performNav();
    }
  },

  routeFromLocation() {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    const roadmapMatch = path.match(/^\/roadmaps\/([^/]+)$/);
    if (roadmapMatch) {
      return { route: 'roadmap-detail', params: { slug: decodeURIComponent(roadmapMatch[1]) } };
    }

    const validRoutes = [
      'dashboard', 'profile', 'roadmaps', 'learning', 'projects', 'resume', 'portfolio', 'login', 'register'
    ];
    const cleanRoute = path.replace(/^\//, '');
    if (validRoutes.includes(cleanRoute)) {
      return { route: cleanRoute, params: {} };
    }

    return { route: 'landing', params: {} };
  },

  urlForRoute(route, params) {
    if (route === 'roadmap-detail' && params.slug) {
      return `/roadmaps/${encodeURIComponent(params.slug)}`;
    }
    if (route === 'landing') {
      return '/';
    }
    return `/${route}`;
  },

  async restoreHistoryRoute() {
    const target = this.routeFromLocation();
    const nextRoute = this.currentUser && (target.route === 'landing' || target.route === 'login' || target.route === 'register') ? 'dashboard' : target.route;
    const titles = {
      landing: 'Flipping to Home...',
      dashboard: 'Turning to Dashboard...',
      profile: 'Opening My Profile...',
      roadmaps: 'Unfolding Roadmaps...',
      'roadmap-detail': 'Opening Learning Journey...',
      learning: 'Flipping to Learning Planner...',
      projects: 'Viewing Recommended Projects...',
      resume: 'Drafting Resume Sheet...',
      portfolio: 'Opening Portfolio Pages...'
    };
    const label = titles[nextRoute] || 'Flipping Page...';

    const performRestore = async () => {
      this.currentRoute = nextRoute;
      this.routeParams = target.params;
      this.updateShellUI();
      await this.renderCurrentView();
      if (window.paperDecorations && typeof paperDecorations.applyPageDecorations === 'function') {
        paperDecorations.applyPageDecorations();
      }
    };

    if (window.paperTransitions) {
      await paperTransitions.transition(performRestore, label);
    } else {
      await performRestore();
    }
  },

  async renderCurrentView() {
    const publicViewport = document.getElementById('public-viewport');
    const mainContent = document.getElementById('main-content');

    switch (this.currentRoute) {
      case 'landing':
        publicViewport.innerHTML = LandingView.render();
        setTimeout(() => {
          if (window.paper3D && typeof paper3D.initHeroCanvas === 'function') {
            paper3D.initHeroCanvas('landing-3d-canvas');
          }
        }, 50);
        break;
      case 'login':
        if (window.Clerk && typeof window.Clerk.mountSignIn === 'function') {
          publicViewport.innerHTML = '<div class="container" style="min-height: calc(100vh - 80px); display: flex; align-items: center; justify-content: center; padding: 3rem 1rem;"><div id="clerk-signin-mount"></div></div>';
          try {
            const mountEl = document.getElementById('clerk-signin-mount');
            if (mountEl) {
              window.Clerk.mountSignIn(mountEl, {
                afterSignInUrl: '/dashboard',
                afterSignUpUrl: '/dashboard',
                appearance: this.getClerkAppearance()
              });
            }
          } catch (e) {
            console.warn('Could not mount Clerk SignIn:', e);
            publicViewport.innerHTML = AuthView.renderLogin();
          }
        } else {
          publicViewport.innerHTML = AuthView.renderLogin();
        }
        break;
      case 'register':
        if (window.Clerk && typeof window.Clerk.mountSignUp === 'function') {
          publicViewport.innerHTML = '<div class="container" style="min-height: calc(100vh - 80px); display: flex; align-items: center; justify-content: center; padding: 3rem 1rem;"><div id="clerk-signup-mount"></div></div>';
          try {
            const mountEl = document.getElementById('clerk-signup-mount');
            if (mountEl) {
              window.Clerk.mountSignUp(mountEl, {
                afterSignInUrl: '/dashboard',
                afterSignUpUrl: '/dashboard',
                appearance: this.getClerkAppearance()
              });
            }
          } catch (e) {
            console.warn('Could not mount Clerk SignUp:', e);
            publicViewport.innerHTML = AuthView.renderRegister();
          }
        } else {
          publicViewport.innerHTML = AuthView.renderRegister();
        }
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
      if (window.CustomizeTheme && CustomizeTheme.isOpen) {
        CustomizeTheme.refresh();
      }
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

  async openSignIn() {
    if (window.Clerk) {
      try {
        if (!window.Clerk.loaded && typeof window.Clerk.load === 'function') {
          await window.Clerk.load();
        }
        if (typeof window.Clerk.openSignIn === 'function') {
          window.Clerk.openSignIn({
            afterSignInUrl: '/dashboard',
            afterSignUpUrl: '/dashboard',
            appearance: this.getClerkAppearance()
          });
          return;
        }
      } catch (err) {
        console.warn('Error opening Clerk sign in modal:', err);
      }
    }
    this.navigate('login');
  },

  async openSignUp() {
    if (window.Clerk) {
      try {
        if (!window.Clerk.loaded && typeof window.Clerk.load === 'function') {
          await window.Clerk.load();
        }
        if (typeof window.Clerk.openSignUp === 'function') {
          window.Clerk.openSignUp({
            afterSignInUrl: '/dashboard',
            afterSignUpUrl: '/dashboard',
            appearance: this.getClerkAppearance()
          });
          return;
        }
      } catch (err) {
        console.warn('Error opening Clerk sign up modal:', err);
      }
    }
    this.navigate('register');
  },

  async logout() {
    if (window.Clerk && window.Clerk.session) {
      try {
        await window.Clerk.signOut();
      } catch (e) {
        console.warn('Clerk signOut error:', e);
      }
    }
    API.removeToken();
    this.currentUser = null;
    API.showToast('Logged out successfully.');
    this.navigate('landing');
  },

  closeModal() {
    const modal = document.getElementById('modal-root');
    const modalBody = document.getElementById('modal-body');
    if (window.paperTransitions && typeof paperTransitions.closeComponent === 'function') {
      paperTransitions.closeComponent(modalBody, () => {
        modal.classList.remove('active');
      });
    } else {
      modal.classList.remove('active');
    }
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

window.app = app;

// Initialize App when DOM is loaded
document.addEventListener('DOMContentLoaded', () => app.init());

// Handle browser navigation (back/forward)
window.addEventListener('popstate', () => app.restoreHistoryRoute());
