/**
 * Pathfolio Theme Manager & Personalization Engine
 * Handles Light/Dark modes, dynamic CSS variables, custom background images,
 * live wallpaper video rendering, card styles, border radius, accent colors,
 * animation speeds, and custom theme persistence.
 */
const themeManager = {
  STORAGE_KEY: 'pathfolio_theme_config',
  SAVED_THEMES_KEY: 'pathfolio_saved_themes',

  defaultConfig: {
    mode: 'dark',               // 'light' | 'dark'
    bgType: 'default',          // 'default' | 'image' | 'wallpaper'
    bgImage: null,              // Data URL or URL string
    bgPosition: 'cover',        // 'cover' | 'contain' | 'center'
    liveWallpaper: null,        // Data URL or URL string
    liveWallpaperEnabled: true,
    overlayDarkness: 0.4,       // 0 to 0.95
    accentColor: '#6366f1',     // Hex string
    cardStyle: 'clean',         // 'clean' | 'elevated' | 'glass' | 'transparent'
    cardTransparency: 0.6,      // 0.0 (transparent) to 1.0 (opaque)
    borderRadius: 'medium',     // 'small' | 'medium' | 'large'
    animations: 'subtle'        // 'off' | 'subtle' | 'smooth'
  },

  config: null,
  savedThemes: [],

  presetAccentColors: [
    { name: 'Indigo Blue', hex: '#6366f1' },
    { name: 'Purple', hex: '#8b5cf6' },
    { name: 'Emerald Green', hex: '#10b981' },
    { name: 'Sunset Orange', hex: '#f97316' },
    { name: 'Rose Red', hex: '#ef4444' },
    { name: 'Cyan Blue', hex: '#06b6d4' },
    { name: 'Hot Pink', hex: '#ec4899' }
  ],

  init() {
    this.loadConfig();
    this.loadSavedThemes();
    this.applyTheme();
    this.setupListeners();
  },

  loadConfig() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      this.config = stored ? { ...this.defaultConfig, ...JSON.parse(stored) } : { ...this.defaultConfig };
    } catch (e) {
      console.warn('Failed to load theme configuration, using defaults.', e);
      this.config = { ...this.defaultConfig };
    }
  },

  saveConfig() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.config));
    } catch (e) {
      console.error('Failed to save theme config:', e);
      if (e.name === 'QuotaExceededError') {
        API.showToast('Storage quota exceeded. Background media might be too large.', 'error');
      }
    }
  },

  loadSavedThemes() {
    try {
      const stored = localStorage.getItem(this.SAVED_THEMES_KEY);
      this.savedThemes = stored ? JSON.parse(stored) : this.getDefaultPresetThemes();
    } catch (e) {
      this.savedThemes = this.getDefaultPresetThemes();
    }
  },

  saveSavedThemes() {
    try {
      localStorage.setItem(this.SAVED_THEMES_KEY, JSON.stringify(this.savedThemes));
    } catch (e) {
      console.error('Failed to save user themes collection:', e);
    }
  },

  getDefaultPresetThemes() {
    return [
      {
        id: 'theme-galaxy',
        name: 'Galaxy Glass',
        config: {
          mode: 'dark',
          bgType: 'default',
          accentColor: '#8b5cf6',
          cardStyle: 'glass',
          borderRadius: 'large',
          animations: 'smooth',
          overlayDarkness: 0.4
        }
      },
      {
        id: 'theme-emerald',
        name: 'Emerald Studio',
        config: {
          mode: 'dark',
          bgType: 'default',
          accentColor: '#10b981',
          cardStyle: 'elevated',
          borderRadius: 'medium',
          animations: 'subtle',
          overlayDarkness: 0.4
        }
      },
      {
        id: 'theme-sunset',
        name: 'Sunset Minimal',
        config: {
          mode: 'light',
          bgType: 'default',
          accentColor: '#f97316',
          cardStyle: 'clean',
          borderRadius: 'medium',
          animations: 'subtle',
          overlayDarkness: 0.2
        }
      }
    ];
  },

  updateConfig(updates, shouldSave = true) {
    this.config = { ...this.config, ...updates };
    this.applyTheme();
    if (shouldSave) {
      this.saveConfig();
    }
  },

  resetToDefault() {
    this.config = { ...this.defaultConfig };
    this.applyTheme();
    this.saveConfig();
    API.showToast('Theme reset to default settings.');
  },

  toggleMode() {
    const newMode = this.config.mode === 'dark' ? 'light' : 'dark';
    this.updateConfig({ mode: newMode });
  },

  applyTheme() {
    const root = document.documentElement;
    const isDark = this.config.mode === 'dark';

    // 1. Set mode & background attributes on root element
    const hasMediaBg = (this.config.bgType === 'image' && this.config.bgImage) || 
                       (this.config.bgType === 'wallpaper' && this.config.liveWallpaper && this.config.liveWallpaperEnabled);
    
    root.setAttribute('data-theme', this.config.mode);
    root.setAttribute('data-bg-active', hasMediaBg ? 'true' : 'false');

    // 2. Theme Colors & Component Transparency Calculation
    let alpha = this.config.cardTransparency ?? 0.6;
    if (this.config.cardStyle === 'transparent') {
      alpha = Math.min(alpha, 0.15); // Transparent mode defaults to near-clear glass
    }

    const isGlassy = hasMediaBg || this.config.cardStyle === 'glass' || this.config.cardStyle === 'transparent' || alpha < 0.95;

    if (isDark) {
      root.style.setProperty('--bg-dark', '#0b0f19');
      root.style.setProperty('--bg-app', '#0b0f19');
      root.style.setProperty('--bg-card', isGlassy ? `rgba(15, 23, 42, ${alpha})` : '#151d30');
      root.style.setProperty('--bg-card-hover', isGlassy ? `rgba(30, 41, 66, ${Math.min(alpha + 0.2, 1)})` : '#1e2942');
      root.style.setProperty('--bg-input', isGlassy ? `rgba(15, 23, 42, ${Math.max(alpha - 0.1, 0.05)})` : 'rgba(15, 23, 42, 0.7)');
      root.style.setProperty('--border-color', isGlassy ? `rgba(255, 255, 255, ${Math.max(0.12, Math.min(0.35, alpha + 0.15))})` : 'rgba(255, 255, 255, 0.15)');
      root.style.setProperty('--text-main', '#f8fafc');
      root.style.setProperty('--text-muted', '#94a3b8');
      root.style.setProperty('--text-subtle', '#64748b');
      root.style.setProperty('--sidebar-bg', isGlassy ? `rgba(15, 23, 42, ${Math.min(alpha + 0.1, 0.95)})` : '#0f172a');
      root.style.setProperty('--header-bg', isGlassy ? `rgba(15, 23, 42, ${Math.min(alpha + 0.1, 0.95)})` : 'rgba(15, 23, 42, 0.85)');
    } else {
      root.style.setProperty('--bg-dark', '#f8fafc');
      root.style.setProperty('--bg-app', '#f8fafc');
      root.style.setProperty('--bg-card', isGlassy ? `rgba(255, 255, 255, ${alpha})` : '#ffffff');
      root.style.setProperty('--bg-card-hover', isGlassy ? `rgba(241, 245, 249, ${Math.min(alpha + 0.2, 1)})` : '#f1f5f9');
      root.style.setProperty('--bg-input', isGlassy ? `rgba(255, 255, 255, ${Math.max(alpha - 0.1, 0.05)})` : '#ffffff');
      root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.12)');
      root.style.setProperty('--text-main', '#0f172a');
      root.style.setProperty('--text-muted', '#475569');
      root.style.setProperty('--text-subtle', '#94a3b8');
      root.style.setProperty('--sidebar-bg', isGlassy ? `rgba(255, 255, 255, ${Math.min(alpha + 0.1, 0.95)})` : '#ffffff');
      root.style.setProperty('--header-bg', isGlassy ? `rgba(255, 255, 255, ${Math.min(alpha + 0.1, 0.95)})` : 'rgba(255, 255, 255, 0.85)');
    }

    // 3. Accent Colors
    const accent = this.config.accentColor || '#6366f1';
    root.style.setProperty('--primary', accent);
    root.style.setProperty('--primary-hover', this.adjustColorBrightness(accent, -15));
    root.style.setProperty('--primary-light', this.hexToRgba(accent, isDark ? 0.18 : 0.12));
    root.style.setProperty('--border-focus', accent);

    // 4. Border Radius
    let radiusPx = '10px';
    let radiusSmPx = '6px';
    let radiusLgPx = '16px';
    if (this.config.borderRadius === 'small') {
      radiusPx = '6px';
      radiusSmPx = '4px';
      radiusLgPx = '10px';
    } else if (this.config.borderRadius === 'large') {
      radiusPx = '16px';
      radiusSmPx = '8px';
      radiusLgPx = '24px';
    }
    root.style.setProperty('--radius-sm', radiusSmPx);
    root.style.setProperty('--radius-md', radiusPx);
    root.style.setProperty('--radius-lg', radiusLgPx);

    // 5. Animation Speed
    let speed = '0.2s';
    if (this.config.animations === 'off') {
      speed = '0s';
    } else if (this.config.animations === 'smooth') {
      speed = '0.35s';
    }
    root.style.setProperty('--transition', `all ${speed} cubic-bezier(0.4, 0, 0.2, 1)`);

    // 6. Card Style
    root.setAttribute('data-card-style', this.config.cardStyle);
    if (isGlassy) {
      root.style.setProperty('--card-backdrop', 'blur(16px) saturate(180%)');
      root.style.setProperty('--card-shadow', isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' : '0 8px 32px 0 rgba(31, 38, 135, 0.1)');
    } else if (this.config.cardStyle === 'elevated') {
      root.style.setProperty('--card-backdrop', 'none');
      root.style.setProperty('--card-shadow', isDark ? '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)' : '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)');
    } else {
      root.style.setProperty('--card-backdrop', 'none');
      root.style.setProperty('--card-shadow', isDark ? '0 1px 3px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.05)');
    }

    // 7. Background & Live Wallpaper Setup
    this.renderBackgroundLayers();
  },

  renderBackgroundLayers() {
    const customBg = document.getElementById('pathfolio-custom-bg');
    const liveVideo = document.getElementById('pathfolio-live-wallpaper');
    const bgOverlay = document.getElementById('pathfolio-bg-overlay');

    if (!customBg || !liveVideo || !bgOverlay) return;

    // Overlay Opacity
    bgOverlay.style.opacity = this.config.overlayDarkness ?? 0.4;
    bgOverlay.style.background = this.config.mode === 'dark' ? '#000000' : '#ffffff';

    if (this.config.bgType === 'image' && this.config.bgImage) {
      customBg.style.display = 'block';
      customBg.style.backgroundImage = `url("${this.config.bgImage}")`;
      customBg.style.backgroundSize = this.config.bgPosition || 'cover';
      customBg.style.backgroundPosition = 'center center';

      liveVideo.style.display = 'none';
      if (liveVideo.src) liveVideo.pause();
    } else if (this.config.bgType === 'wallpaper' && this.config.liveWallpaper && this.config.liveWallpaperEnabled) {
      customBg.style.display = 'none';
      liveVideo.style.display = 'block';

      if (liveVideo.src !== this.config.liveWallpaper) {
        liveVideo.src = this.config.liveWallpaper;
        liveVideo.load();
      }

      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion && document.visibilityState === 'visible') {
        liveVideo.play().catch(e => console.log('Autoplay deferred by browser policy', e));
      } else {
        liveVideo.pause();
      }
    } else {
      customBg.style.display = 'none';
      liveVideo.style.display = 'none';
      if (liveVideo.src) liveVideo.pause();
    }
  },

  setupListeners() {
    // Auto-pause video on tab hidden
    document.addEventListener('visibilitychange', () => {
      const liveVideo = document.getElementById('pathfolio-live-wallpaper');
      if (liveVideo && this.config.bgType === 'wallpaper' && this.config.liveWallpaperEnabled) {
        if (document.visibilityState === 'hidden') {
          liveVideo.pause();
        } else {
          liveVideo.play().catch(e => {});
        }
      }
    });
  },

  // File Upload Handlers with Validation
  handleImageUpload(file) {
    return new Promise((resolve, reject) => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        return reject(new Error('Unsupported file format. Please upload JPG, PNG, or WEBP image.'));
      }
      if (file.size > 8 * 1024 * 1024) { // 8MB limit
        return reject(new Error('Image file is too large. Please select an image under 8MB.'));
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        this.updateConfig({ bgType: 'image', bgImage: dataUrl });
        resolve(dataUrl);
      };
      reader.onerror = () => reject(new Error('Failed to read image file.'));
      reader.readAsDataURL(file);
    });
  },

  handleVideoUpload(file) {
    return new Promise((resolve, reject) => {
      const validTypes = ['video/mp4', 'video/webm'];
      if (!validTypes.includes(file.type)) {
        return reject(new Error('Unsupported format. Please upload an MP4 or WebM video file.'));
      }
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        return reject(new Error('Video file is too large. Please upload a lightweight video under 20MB.'));
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        this.updateConfig({ bgType: 'wallpaper', liveWallpaper: dataUrl, liveWallpaperEnabled: true });
        resolve(dataUrl);
      };
      reader.onerror = () => reject(new Error('Failed to read video file.'));
      reader.readAsDataURL(file);
    });
  },

  // Save Current Config as a User Custom Theme
  saveCustomTheme(name) {
    if (!name || !name.trim()) return;
    const newTheme = {
      id: 'theme-' + Date.now(),
      name: name.trim(),
      config: { ...this.config }
    };
    this.savedThemes.push(newTheme);
    this.saveSavedThemes();
    API.showToast(`Theme "${name}" saved to My Themes!`);
  },

  deleteCustomTheme(id) {
    this.savedThemes = this.savedThemes.filter(t => t.id !== id);
    this.saveSavedThemes();
    API.showToast('Theme deleted.');
  },

  applySavedTheme(id) {
    const target = this.savedThemes.find(t => t.id === id);
    if (target) {
      this.updateConfig(target.config);
      API.showToast(`Applied "${target.name}" theme.`);
    }
  },

  // Color Utility Helpers
  hexToRgba(hex, alpha = 1) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
  },

  adjustColorBrightness(hex, percent) {
    let num = parseInt(hex.replace('#', ''), 16);
    let amt = Math.round(2.55 * percent);
    let R = (num >> 16) + amt;
    let G = (num >> 8 & 0x00FF) + amt;
    let B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1);
  }
};

window.themeManager = themeManager;

