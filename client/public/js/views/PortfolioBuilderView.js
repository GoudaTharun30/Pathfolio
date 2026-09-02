/**
 * Dedicated Portfolio Builder View
 */
const PortfolioBuilderView = {
  portfolioData: null,
  profileData: null,
  activeTemplate: 'developer',
  customConfig: {},
  previewMode: 'desktop',

  async render() {
    try {
      const data = await API.request('/portfolios');
      this.portfolioData = data.portfolioConfig;
      this.profileData = data.profileData;
      this.activeTemplate = this.portfolioData.templateId || 'developer';
      this.customConfig = this.portfolioData.customConfig || {};
    } catch (e) {
      this.portfolioData = {};
      this.profileData = {};
    }

    return `
      <div style="margin-bottom: 2rem;">
        <h2>Portfolio Builder</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Build a personal portfolio website powered by your profile skills and completed projects.</p>
      </div>

      <!-- Template Selector Grid -->
      <h3 style="font-size: 1.1rem; margin-bottom: 1rem;">1. Select Portfolio Template</h3>
      <div class="templates-grid">
        <div class="template-card ${this.activeTemplate === 'developer' ? 'active' : ''}" onclick="PortfolioBuilderView.selectTemplate('developer')">
          <i class="fa-solid fa-code" style="font-size: 1.5rem; color: var(--primary);"></i>
          <h4 style="margin-top: 0.5rem;">Developer</h4>
          <span class="badge badge-primary">Dark Tech Theme</span>
        </div>
        <div class="template-card ${this.activeTemplate === 'modern' ? 'active' : ''}" onclick="PortfolioBuilderView.selectTemplate('modern')">
          <i class="fa-solid fa-layer-group" style="font-size: 1.5rem; color: var(--secondary);"></i>
          <h4 style="margin-top: 0.5rem;">Modern</h4>
          <span class="badge badge-success">Sleek Grid</span>
        </div>
        <div class="template-card ${this.activeTemplate === 'minimal' ? 'active' : ''}" onclick="PortfolioBuilderView.selectTemplate('minimal')">
          <i class="fa-solid fa-feather" style="font-size: 1.5rem; color: var(--warning);"></i>
          <h4 style="margin-top: 0.5rem;">Minimal</h4>
          <span class="badge">Clean Light</span>
        </div>
        <div class="template-card ${this.activeTemplate === 'classic' ? 'active' : ''}" onclick="PortfolioBuilderView.selectTemplate('classic')">
          <i class="fa-solid fa-cube" style="font-size: 1.5rem; color: #a855f7;"></i>
          <h4 style="margin-top: 0.5rem;">Classic</h4>
          <span class="badge">Standard</span>
        </div>
        <div class="template-card ${this.activeTemplate === 'professional' ? 'active' : ''}" onclick="PortfolioBuilderView.selectTemplate('professional')">
          <i class="fa-solid fa-gem" style="font-size: 1.5rem; color: #ec4899;"></i>
          <h4 style="margin-top: 0.5rem;">Professional</h4>
          <span class="badge">Executive</span>
        </div>
      </div>

      <!-- AI Custom Design Request Section -->
      <div class="card" style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-robot" style="color: var(--primary);"></i> Custom Portfolio AI Design Request</h3>
        <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem;">Describe the portfolio layout, theme, or color scheme you want (e.g. "Create a dark minimalistic developer portfolio with a purple accent color and animated project cards").</p>
        <div style="display: flex; gap: 0.5rem; max-width: 750px;">
          <input type="text" id="ai-portfolio-prompt" class="form-control" placeholder="Describe the portfolio you want..." onkeypress="if(event.key==='Enter') PortfolioBuilderView.handleAiPromptSubmit()">
          <button class="btn btn-primary btn-sm" id="ai-portfolio-btn" onclick="PortfolioBuilderView.handleAiPromptSubmit()">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Design
          </button>
        </div>
      </div>

      <!-- Live Interactive Preview & Controls -->
      <div class="preview-container">
        <div class="preview-toolbar">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <strong style="color: var(--text-main); font-size: 1.05rem;">Live Preview</strong>
            <div class="device-toggle">
              <button class="device-btn ${this.previewMode === 'desktop' ? 'active' : ''}" onclick="PortfolioBuilderView.setDeviceMode('desktop')"><i class="fa-solid fa-desktop"></i> Desktop</button>
              <button class="device-btn ${this.previewMode === 'tablet' ? 'active' : ''}" onclick="PortfolioBuilderView.setDeviceMode('tablet')"><i class="fa-solid fa-tablet-screen-button"></i> Tablet</button>
              <button class="device-btn ${this.previewMode === 'mobile' ? 'active' : ''}" onclick="PortfolioBuilderView.setDeviceMode('mobile')"><i class="fa-solid fa-mobile-screen-button"></i> Mobile</button>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-secondary btn-sm" onclick="PortfolioBuilderView.saveConfig()">
              <i class="fa-solid fa-floppy-disk"></i> Save Design
            </button>
            <button class="btn btn-primary btn-sm" onclick="PortfolioBuilderView.exportHTML()">
              <i class="fa-solid fa-file-code"></i> Download Portfolio HTML
            </button>
          </div>
        </div>

        <div class="preview-viewport ${this.previewMode}" id="portfolio-preview-viewport">
          ${TemplateRenderers.renderPortfolioHTML(this.activeTemplate, this.profileData, this.customConfig)}
        </div>
      </div>
    `;
  },

  selectTemplate(tplId) {
    this.activeTemplate = tplId;
    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
    event.currentTarget.classList.add('active');
    this.refreshPreview();
  },

  setDeviceMode(mode) {
    this.previewMode = mode;
    const viewport = document.getElementById('portfolio-preview-viewport');
    viewport.className = `preview-viewport ${mode}`;
    document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
  },

  refreshPreview() {
    const viewport = document.getElementById('portfolio-preview-viewport');
    if (viewport) {
      viewport.innerHTML = TemplateRenderers.renderPortfolioHTML(this.activeTemplate, this.profileData, this.customConfig);
    }
  },

  async handleAiPromptSubmit() {
    const prompt = document.getElementById('ai-portfolio-prompt').value;
    if (!prompt) return;

    const btn = document.getElementById('ai-portfolio-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';

    try {
      const res = await API.request('/portfolios/ai-customize', {
        method: 'POST',
        body: JSON.stringify({ prompt })
      });

      if (res.aiConfig) {
        this.customConfig = { ...this.customConfig, ...res.aiConfig };
        API.showToast('AI Portfolio design applied safely!');
        this.refreshPreview();
      }
    } catch (e) {
      // Handled
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Generate Design';
    }
  },

  async saveConfig() {
    try {
      await API.request('/portfolios/save', {
        method: 'POST',
        body: JSON.stringify({
          templateId: this.activeTemplate,
          customConfig: this.customConfig
        })
      });
      API.showToast('Portfolio configuration saved!');
    } catch (e) {
      // Handled
    }
  },

  exportHTML() {
    const content = TemplateRenderers.renderPortfolioHTML(this.activeTemplate, this.profileData, this.customConfig);
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.profileData.basicInfo?.fullName || 'Portfolio'} — Personal Showcase</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap">
  <style>
    body { margin: 0; padding: 0; font-family: 'Outfit', sans-serif; background: #0f172a; }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_${this.activeTemplate}.html`;
    a.click();
    URL.revokeObjectURL(url);
    API.showToast('Portfolio HTML exported successfully!');
  }
};
