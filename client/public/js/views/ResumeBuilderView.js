/**
 * Resume Builder View
 */
const ResumeBuilderView = {
  resumeData: null,
  profileData: null,
  activeTemplate: 'software-developer',
  customConfig: {},

  async render() {
    try {
      const data = await API.request('/resumes');
      this.resumeData = data.resumeConfig;
      this.profileData = data.profileData;
      this.activeTemplate = this.resumeData.templateId || 'software-developer';
      this.customConfig = this.resumeData.customConfig || {};
    } catch (e) {
      this.resumeData = {};
      this.profileData = {};
    }

    return `
      <div style="margin-bottom: 2rem;">
        <h2>Resume Builder</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Auto-populated from your Profile information. Choose a template or describe your desired style for AI customization.</p>
      </div>

      <!-- Template Selector -->
      <h3 style="font-size: 1.1rem; margin-bottom: 1rem;">1. Select Resume Template</h3>
      <div class="templates-grid">
        <div class="template-card ${this.activeTemplate === 'software-developer' ? 'active' : ''}" onclick="ResumeBuilderView.selectTemplate('software-developer')">
          <i class="fa-solid fa-code" style="font-size: 1.5rem; color: var(--primary);"></i>
          <h4 style="margin-top: 0.5rem;">Software Developer</h4>
          <span class="badge badge-primary">Tech Focused</span>
        </div>
        <div class="template-card ${this.activeTemplate === 'classic' ? 'active' : ''}" onclick="ResumeBuilderView.selectTemplate('classic')">
          <i class="fa-solid fa-newspaper" style="font-size: 1.5rem; color: var(--secondary);"></i>
          <h4 style="margin-top: 0.5rem;">Classic Resume</h4>
          <span class="badge">Traditional</span>
        </div>
        <div class="template-card ${this.activeTemplate === 'modern' ? 'active' : ''}" onclick="ResumeBuilderView.selectTemplate('modern')">
          <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 1.5rem; color: var(--success);"></i>
          <h4 style="margin-top: 0.5rem;">Modern Resume</h4>
          <span class="badge badge-success">Clean & Sleek</span>
        </div>
        <div class="template-card ${this.activeTemplate === 'minimal' ? 'active' : ''}" onclick="ResumeBuilderView.selectTemplate('minimal')">
          <i class="fa-solid fa-minus" style="font-size: 1.5rem; color: var(--warning);"></i>
          <h4 style="margin-top: 0.5rem;">Minimal Resume</h4>
          <span class="badge">Compact</span>
        </div>
        <div class="template-card ${this.activeTemplate === 'professional' ? 'active' : ''}" onclick="ResumeBuilderView.selectTemplate('professional')">
          <i class="fa-solid fa-briefcase" style="font-size: 1.5rem; color: #a855f7;"></i>
          <h4 style="margin-top: 0.5rem;">Professional</h4>
          <span class="badge">Executive</span>
        </div>
      </div>

      <!-- AI Customization Box -->
      <div class="card" style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-robot" style="color: var(--primary);"></i> AI Resume Style Customization</h3>
        <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem;">Describe the resume style or focus area you want (e.g., "Create a clean one-page software developer resume focused on backend development").</p>
        <div style="display: flex; gap: 0.5rem; max-width: 700px;">
          <input type="text" id="ai-resume-prompt" class="form-control" placeholder="Describe resume style..." onkeypress="if(event.key==='Enter') ResumeBuilderView.handleAiStyleSubmit()">
          <button class="btn btn-primary btn-sm" id="ai-resume-btn" onclick="ResumeBuilderView.handleAiStyleSubmit()">
            <i class="fa-solid fa-sparkles"></i> Apply Style
          </button>
        </div>
      </div>

      <!-- Preview Viewport Toolbar -->
      <div class="preview-container">
        <div class="preview-toolbar">
          <strong style="color: var(--text-main); font-size: 1.05rem;">Live Resume Preview</strong>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-secondary btn-sm" onclick="ResumeBuilderView.saveConfig()">
              <i class="fa-solid fa-floppy-disk"></i> Save Design
            </button>
            <button class="btn btn-primary btn-sm" onclick="ResumeBuilderView.downloadPDF()">
              <i class="fa-solid fa-download"></i> Print / Export PDF
            </button>
          </div>
        </div>

        <div class="preview-viewport desktop" id="resume-preview-viewport">
          ${TemplateRenderers.renderResumeHTML(this.activeTemplate, this.profileData, this.customConfig)}
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

  refreshPreview() {
    const viewport = document.getElementById('resume-preview-viewport');
    if (viewport) {
      viewport.innerHTML = TemplateRenderers.renderResumeHTML(this.activeTemplate, this.profileData, this.customConfig);
    }
  },

  async handleAiStyleSubmit() {
    const prompt = document.getElementById('ai-resume-prompt').value;
    if (!prompt) return;

    const btn = document.getElementById('ai-resume-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';

    try {
      const res = await API.request('/resumes/ai-customize', {
        method: 'POST',
        body: JSON.stringify({ prompt })
      });

      if (res.aiConfig) {
        this.customConfig = { ...this.customConfig, ...res.aiConfig };
        if (res.aiConfig.templateId) {
          this.activeTemplate = res.aiConfig.templateId;
        }
        API.showToast('AI style configuration applied!');
        this.refreshPreview();
      }
    } catch (e) {
      // Handled
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-sparkles"></i> Apply Style';
    }
  },

  async saveConfig() {
    try {
      await API.request('/resumes/save', {
        method: 'POST',
        body: JSON.stringify({
          templateId: this.activeTemplate,
          customConfig: this.customConfig
        })
      });
      API.showToast('Resume layout saved!');
    } catch (e) {
      // Handled
    }
  },

  downloadPDF() {
    const printWindow = window.open('', '_blank');
    const content = TemplateRenderers.renderResumeHTML(this.activeTemplate, this.profileData, this.customConfig);
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resume - ${this.profileData.basicInfo?.fullName || 'Pathfolio'}</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
          body { font-family: sans-serif; padding: 2rem; }
          .resume-doc { width: 100%; max-width: 800px; margin: 0 auto; }
          .resume-header { border-bottom: 2px solid #1e293b; padding-bottom: 1rem; margin-bottom: 1.5rem; }
          .resume-contact-line { display: flex; gap: 1rem; font-size: 0.85rem; color: #64748b; margin-top: 0.5rem; }
          .resume-section { margin-bottom: 1.5rem; }
          .resume-section-title { font-size: 1.1rem; text-transform: uppercase; color: #1e293b; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.25rem; margin-bottom: 0.75rem; }
          .skill-tags-flex { display: flex; flex-wrap: wrap; gap: 0.4rem; }
          .skill-tag-item { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.8rem; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        ${content}
        <script>window.onload = () => { window.print(); window.close(); };<\/script>
      </body>
      </html>
    `);
    printWindow.document.close();
  }
};
