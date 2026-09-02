/**
 * Customize Theme Drawer Component
 * Interactive UI drawer allowing real-time preview of theme customization options:
 * Light/Dark mode, Accent colors, Card styles, Border radius, Animation levels,
 * Background images, Live video wallpapers, Overlay darkness, and My Themes persistence.
 */
const CustomizeTheme = {
  isOpen: false,

  render() {
    const cfg = themeManager.config;
    const isDark = cfg.mode === 'dark';

    return `
      <div id="customize-theme-drawer" class="customize-drawer ${this.isOpen ? 'active' : ''}">
        <div class="customize-drawer-header">
          <div class="drawer-title-group">
            <i class="fa-solid fa-palette" style="color: var(--primary); font-size: 1.25rem;"></i>
            <div>
              <h3>Customize Pathfolio</h3>
              <p class="drawer-subtitle">Personalize your workspace aesthetics in real-time</p>
            </div>
          </div>
          <button class="drawer-close-btn" onclick="CustomizeTheme.close()" title="Close drawer">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="customize-drawer-body">
          <!-- 1. Appearance Section -->
          <div class="customize-section">
            <label class="customize-label"><i class="fa-solid fa-sun-moon"></i> Appearance</label>
            <div class="toggle-group">
              <button class="toggle-btn ${!isDark ? 'active' : ''}" onclick="themeManager.updateConfig({ mode: 'light' }); CustomizeTheme.refresh();">
                <i class="fa-solid fa-sun"></i> Light
              </button>
              <button class="toggle-btn ${isDark ? 'active' : ''}" onclick="themeManager.updateConfig({ mode: 'dark' }); CustomizeTheme.refresh();">
                <i class="fa-solid fa-moon"></i> Dark
              </button>
            </div>
          </div>

          <!-- 2. Background Mode Section -->
          <div class="customize-section">
            <label class="customize-label"><i class="fa-solid fa-image"></i> Background</label>
            <div class="toggle-group mb-2">
              <button class="toggle-btn ${cfg.bgType === 'default' ? 'active' : ''}" onclick="themeManager.updateConfig({ bgType: 'default' }); CustomizeTheme.refresh();">
                Default
              </button>
              <button class="toggle-btn ${cfg.bgType === 'image' ? 'active' : ''}" onclick="themeManager.updateConfig({ bgType: 'image' }); CustomizeTheme.refresh();">
                Image
              </button>
              <button class="toggle-btn ${cfg.bgType === 'wallpaper' ? 'active' : ''}" onclick="themeManager.updateConfig({ bgType: 'wallpaper' }); CustomizeTheme.refresh();">
                Live Wallpaper
              </button>
            </div>

            ${cfg.bgType === 'image' ? `
              <div class="media-upload-box">
                ${cfg.bgImage ? `
                  <div class="media-preview-container">
                    <img src="${cfg.bgImage}" class="media-preview-img" alt="Background preview" />
                    <button class="btn btn-secondary btn-sm" onclick="CustomizeTheme.removeImage()">
                      <i class="fa-solid fa-trash"></i> Remove
                    </button>
                  </div>
                  <div class="form-group mt-2">
                    <label class="form-label" style="font-size: 0.8rem;">Background Fit</label>
                    <div class="toggle-group">
                      <button class="toggle-btn ${cfg.bgPosition === 'cover' ? 'active' : ''}" onclick="themeManager.updateConfig({ bgPosition: 'cover' }); CustomizeTheme.refresh();">Cover</button>
                      <button class="toggle-btn ${cfg.bgPosition === 'contain' ? 'active' : ''}" onclick="themeManager.updateConfig({ bgPosition: 'contain' }); CustomizeTheme.refresh();">Contain</button>
                      <button class="toggle-btn ${cfg.bgPosition === 'center' ? 'active' : ''}" onclick="themeManager.updateConfig({ bgPosition: 'center' }); CustomizeTheme.refresh();">Center</button>
                    </div>
                  </div>
                ` : `
                  <label class="upload-dropzone">
                    <i class="fa-solid fa-cloud-arrow-up" style="font-size: 1.5rem; color: var(--primary); margin-bottom: 0.4rem;"></i>
                    <strong style="font-size: 0.9rem;">+ Add Background</strong>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">Supports JPG, PNG, WEBP (Max 8MB)</span>
                    <input type="file" accept="image/jpeg,image/png,image/webp" style="display: none;" onchange="CustomizeTheme.onImageSelected(event)" />
                  </label>
                `}
              </div>
            ` : ''}

            ${cfg.bgType === 'wallpaper' ? `
              <div class="media-upload-box">
                ${cfg.liveWallpaper ? `
                  <div class="media-preview-container">
                    <video src="${cfg.liveWallpaper}" class="media-preview-img" muted loop autoplay></video>
                    <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: 0.5rem;">
                      <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="CustomizeTheme.removeVideo()">
                        <i class="fa-solid fa-trash"></i> Remove Video
                      </button>
                      <button class="btn ${cfg.liveWallpaperEnabled ? 'btn-outline' : 'btn-primary'} btn-sm" style="flex: 1;" onclick="themeManager.updateConfig({ liveWallpaperEnabled: !${cfg.liveWallpaperEnabled} }); CustomizeTheme.refresh();">
                        ${cfg.liveWallpaperEnabled ? 'Disable Live' : 'Enable Live'}
                      </button>
                    </div>
                  </div>
                ` : `
                  <label class="upload-dropzone">
                    <i class="fa-solid fa-film" style="font-size: 1.5rem; color: var(--primary); margin-bottom: 0.4rem;"></i>
                    <strong style="font-size: 0.9rem;">+ Add Live Wallpaper</strong>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">Supports MP4, WebM (Max 20MB)</span>
                    <input type="file" accept="video/mp4,video/webm" style="display: none;" onchange="CustomizeTheme.onVideoSelected(event)" />
                  </label>
                `}
              </div>
            ` : ''}

            <!-- Background Overlay Darkness Slider -->
            <div class="form-group mt-3 mb-1">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.3rem;">
                <span>Background Overlay</span>
                <strong style="color: var(--primary);">${Math.round((cfg.overlayDarkness || 0.4) * 100)}%</strong>
              </div>
              <input type="range" class="theme-slider" min="0" max="0.9" step="0.05" value="${cfg.overlayDarkness ?? 0.4}" oninput="themeManager.updateConfig({ overlayDarkness: parseFloat(this.value) }); document.getElementById('overlay-val-text').textContent = Math.round(this.value * 100) + '%';" />
              <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-subtle); margin-top: 0.2rem;">
                <span>Light</span>
                <span>Dark</span>
              </div>
            </div>
          </div>

          <!-- 3. Accent Color Section -->
          <div class="customize-section">
            <label class="customize-label"><i class="fa-solid fa-droplet"></i> Accent Color</label>
            <div class="color-swatches-grid">
              ${themeManager.presetAccentColors.map(c => `
                <button class="color-swatch ${cfg.accentColor === c.hex ? 'active' : ''}" style="background-color: ${c.hex};" title="${c.name}" onclick="themeManager.updateConfig({ accentColor: '${c.hex}' }); CustomizeTheme.refresh();">
                  ${cfg.accentColor === c.hex ? '<i class="fa-solid fa-check"></i>' : ''}
                </button>
              `).join('')}
              <label class="color-picker-wrapper" title="Custom Color Picker">
                <input type="color" value="${cfg.accentColor}" onchange="themeManager.updateConfig({ accentColor: this.value }); CustomizeTheme.refresh();" />
                <i class="fa-solid fa-eye-dropper" style="font-size: 0.85rem; color: var(--text-main);"></i>
              </label>
            </div>
          </div>

          <!-- 4. Card Style Section -->
          <div class="customize-section">
            <label class="customize-label"><i class="fa-solid fa-layer-group"></i> Card Style</label>
            <div class="toggle-group">
              <button class="toggle-btn ${cfg.cardStyle === 'clean' ? 'active' : ''}" onclick="themeManager.updateConfig({ cardStyle: 'clean' }); CustomizeTheme.refresh();">
                Clean
              </button>
              <button class="toggle-btn ${cfg.cardStyle === 'elevated' ? 'active' : ''}" onclick="themeManager.updateConfig({ cardStyle: 'elevated' }); CustomizeTheme.refresh();">
                Elevated
              </button>
              <button class="toggle-btn ${cfg.cardStyle === 'glass' ? 'active' : ''}" onclick="themeManager.updateConfig({ cardStyle: 'glass' }); CustomizeTheme.refresh();">
                Glass
              </button>
              <button class="toggle-btn ${cfg.cardStyle === 'transparent' ? 'active' : ''}" onclick="themeManager.updateConfig({ cardStyle: 'transparent' }); CustomizeTheme.refresh();">
                Transparent
              </button>
            </div>
          </div>

          <!-- Component Transparency Meter -->
          <div class="customize-section">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label class="customize-label" style="margin-bottom: 0;"><i class="fa-solid fa-sliders"></i> Component Transparency</label>
              <strong id="transparency-val-text" style="color: var(--primary); font-size: 0.85rem;">${Math.round((1 - (cfg.cardTransparency ?? 0.6)) * 100)}%</strong>
            </div>
            <input type="range" class="theme-slider" min="0.05" max="1.0" step="0.05" value="${cfg.cardTransparency ?? 0.6}" oninput="themeManager.updateConfig({ cardTransparency: parseFloat(this.value) }); document.getElementById('transparency-val-text').textContent = Math.round((1 - parseFloat(this.value)) * 100) + '%';" />
            <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-subtle); margin-top: 0.1rem;">
              <span>100% Transparent</span>
              <span>Solid Opaque</span>
            </div>
          </div>

          <!-- 5. Border Radius Section -->
          <div class="customize-section">
            <label class="customize-label"><i class="fa-solid fa-border-all"></i> Border Radius</label>
            <div class="toggle-group">
              <button class="toggle-btn ${cfg.borderRadius === 'small' ? 'active' : ''}" onclick="themeManager.updateConfig({ borderRadius: 'small' }); CustomizeTheme.refresh();">
                Small
              </button>
              <button class="toggle-btn ${cfg.borderRadius === 'medium' ? 'active' : ''}" onclick="themeManager.updateConfig({ borderRadius: 'medium' }); CustomizeTheme.refresh();">
                Medium
              </button>
              <button class="toggle-btn ${cfg.borderRadius === 'large' ? 'active' : ''}" onclick="themeManager.updateConfig({ borderRadius: 'large' }); CustomizeTheme.refresh();">
                Large
              </button>
            </div>
          </div>

          <!-- 6. Animations Section -->
          <div class="customize-section">
            <label class="customize-label"><i class="fa-solid fa-wand-magic"></i> Animations</label>
            <div class="toggle-group">
              <button class="toggle-btn ${cfg.animations === 'off' ? 'active' : ''}" onclick="themeManager.updateConfig({ animations: 'off' }); CustomizeTheme.refresh();">
                Off
              </button>
              <button class="toggle-btn ${cfg.animations === 'subtle' ? 'active' : ''}" onclick="themeManager.updateConfig({ animations: 'subtle' }); CustomizeTheme.refresh();">
                Subtle
              </button>
              <button class="toggle-btn ${cfg.animations === 'smooth' ? 'active' : ''}" onclick="themeManager.updateConfig({ animations: 'smooth' }); CustomizeTheme.refresh();">
                Smooth
              </button>
            </div>
          </div>

          <!-- 7. My Themes Section -->
          <div class="customize-section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <label class="customize-label" style="margin-bottom: 0;"><i class="fa-solid fa-bookmark"></i> My Themes</label>
              <button class="btn btn-outline btn-sm" onclick="CustomizeTheme.promptSaveTheme()">
                <i class="fa-solid fa-plus"></i> Save Current
              </button>
            </div>
            
            <div class="saved-themes-grid">
              ${themeManager.savedThemes.map(t => `
                <div class="saved-theme-card">
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span class="theme-color-dot" style="background-color: ${t.config.accentColor || '#6366f1'};"></span>
                    <strong style="font-size: 0.85rem; text-transform: capitalize;">${t.name}</strong>
                  </div>
                  <div style="font-size: 0.7rem; color: var(--text-muted); margin: 0.3rem 0;">
                    ${t.config.mode} • ${t.config.cardStyle}
                  </div>
                  <div style="display: flex; gap: 0.3rem; margin-top: 0.4rem;">
                    <button class="btn btn-primary btn-sm" style="padding: 0.2rem 0.5rem; font-size: 0.75rem; flex: 1;" onclick="themeManager.applySavedTheme('${t.id}'); CustomizeTheme.refresh();">
                      Apply
                    </button>
                    ${!t.id.startsWith('theme-galaxy') && !t.id.startsWith('theme-emerald') && !t.id.startsWith('theme-sunset') ? `
                      <button class="btn btn-secondary btn-sm" style="padding: 0.2rem 0.4rem; font-size: 0.75rem;" onclick="themeManager.deleteCustomTheme('${t.id}'); CustomizeTheme.refresh();">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="customize-drawer-footer">
          <button class="btn btn-secondary btn-block" onclick="themeManager.resetToDefault(); CustomizeTheme.refresh();">
            <i class="fa-solid fa-rotate-left"></i> Reset to Default
          </button>
          <button class="btn btn-primary btn-block" onclick="CustomizeTheme.close()">
            <i class="fa-solid fa-check"></i> Done
          </button>
        </div>
      </div>
      <div id="customize-backdrop" class="customize-backdrop ${this.isOpen ? 'active' : ''}" onclick="CustomizeTheme.close()"></div>
    `;
  },

  open() {
    this.isOpen = true;
    this.mount();
    setTimeout(() => {
      const drawer = document.getElementById('customize-theme-drawer');
      const backdrop = document.getElementById('customize-backdrop');
      if (drawer) drawer.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
    }, 10);
  },

  close() {
    this.isOpen = false;
    const drawer = document.getElementById('customize-theme-drawer');
    const backdrop = document.getElementById('customize-backdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
  },

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  },

  mount() {
    let container = document.getElementById('customize-drawer-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'customize-drawer-container';
      document.body.appendChild(container);
    }
    container.innerHTML = this.render();
  },

  refresh() {
    if (this.isOpen) {
      this.mount();
    }
  },

  async onImageSelected(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      await themeManager.handleImageUpload(file);
      this.refresh();
      API.showToast('Background image applied.');
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  },

  async onVideoSelected(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      await themeManager.handleVideoUpload(file);
      this.refresh();
      API.showToast('Live video wallpaper applied.');
    } catch (err) {
      API.showToast(err.message, 'error');
    }
  },

  removeImage() {
    themeManager.updateConfig({ bgImage: null, bgType: 'default' });
    this.refresh();
    API.showToast('Background image removed.');
  },

  removeVideo() {
    themeManager.updateConfig({ liveWallpaper: null, bgType: 'default' });
    this.refresh();
    API.showToast('Live wallpaper removed.');
  },

  promptSaveTheme() {
    const name = prompt('Enter a name for your custom theme:', 'My Theme ' + (themeManager.savedThemes.length + 1));
    if (name) {
      themeManager.saveCustomTheme(name);
      this.refresh();
    }
  }
};

window.CustomizeTheme = CustomizeTheme;

