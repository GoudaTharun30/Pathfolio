/**
 * Comprehensive User Profile View
 */
const ProfileView = {
  profileData: null,

  async render() {
    try {
      this.profileData = await API.request('/profile');
    } catch (e) {
      this.profileData = { basicInfo: {}, skills: [], education: [], experience: [], projects: [], links: {}, careerPreferences: {} };
    }

    const basic = this.profileData.basicInfo || {};
    const skills = this.profileData.skills || [];
    const education = this.profileData.education || [];
    const experience = this.profileData.experience || [];
    const projects = this.profileData.projects || [];
    const links = this.profileData.links || {};

    return `
      <div class="card" style="margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
          <div>
            <h2>User Profile</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Your profile information automatically powers your Resumes, Portfolios, and AI recommendations.</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="ProfileView.saveAllChanges()">
            <i class="fa-solid fa-floppy-disk"></i> Save Profile
          </button>
        </div>

        <!-- Profile Tabs Header -->
        <div class="tabs-header">
          <button class="tab-btn active" onclick="ProfileView.switchTab('basic', this)">Basic Info</button>
          <button class="tab-btn" onclick="ProfileView.switchTab('skills', this)">Skills (${skills.length})</button>
          <button class="tab-btn" onclick="ProfileView.switchTab('education', this)">Education (${education.length})</button>
          <button class="tab-btn" onclick="ProfileView.switchTab('experience', this)">Experience (${experience.length})</button>
          <button class="tab-btn" onclick="ProfileView.switchTab('projects', this)">Projects (${projects.length})</button>
          <button class="tab-btn" onclick="ProfileView.switchTab('links', this)">Links & Preferences</button>
        </div>

        <!-- Tab 1: Basic Info -->
        <div id="tab-basic" class="tab-pane">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" id="prof-fullname" class="form-control" value="${basic.fullName || ''}" placeholder="Tharun Kumar">
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="prof-email" class="form-control" value="${basic.email || ''}" placeholder="tharun@example.com">
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="text" id="prof-phone" class="form-control" value="${basic.phone || ''}" placeholder="+1 (555) 000-0000">
            </div>
            <div class="form-group">
              <label class="form-label">Location</label>
              <input type="text" id="prof-location" class="form-control" value="${basic.location || ''}" placeholder="San Francisco, CA">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
              <label class="form-label">About Me (Bio Summary)</label>
              <textarea id="prof-about" class="form-control" placeholder="Brief professional overview of your skills and career interests...">${basic.aboutMe || ''}</textarea>
            </div>
          </div>
        </div>

        <!-- Tab 2: Skills -->
        <div id="tab-skills" class="tab-pane" style="display: none;">
          <div style="margin-bottom: 1.25rem;">
            <label class="form-label">Add New Skill</label>
            <div style="display: flex; gap: 0.5rem; max-width: 450px;">
              <input type="text" id="new-skill-input" class="form-control" placeholder="e.g. React, Node.js, Python" onkeypress="if(event.key==='Enter'){event.preventDefault(); ProfileView.addSkill();}">
              <button class="btn btn-primary btn-sm" onclick="ProfileView.addSkill()">Add</button>
            </div>
          </div>
          <div id="skills-chips-container" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${skills.map((sk, i) => `
              <span class="badge badge-primary" style="font-size: 0.85rem; padding: 0.4rem 0.85rem;">
                ${sk}
                <i class="fa-solid fa-xmark" style="margin-left: 0.5rem; cursor: pointer;" onclick="ProfileView.removeSkill(${i})"></i>
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Tab 3: Education -->
        <div id="tab-education" class="tab-pane" style="display: none;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h4>Education Entries</h4>
            <button class="btn btn-secondary btn-sm" onclick="ProfileView.addEducationItem()"><i class="fa-solid fa-plus"></i> Add Education</button>
          </div>
          <div id="education-items-list">
            ${education.map((edu, i) => this.renderEducationForm(edu, i)).join('')}
          </div>
        </div>

        <!-- Tab 4: Experience -->
        <div id="tab-experience" class="tab-pane" style="display: none;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h4>Experience Entries</h4>
            <button class="btn btn-secondary btn-sm" onclick="ProfileView.addExperienceItem()"><i class="fa-solid fa-plus"></i> Add Experience</button>
          </div>
          <div id="experience-items-list">
            ${experience.map((exp, i) => this.renderExperienceForm(exp, i)).join('')}
          </div>
        </div>

        <!-- Tab 5: Projects -->
        <div id="tab-projects" class="tab-pane" style="display: none;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h4>Projects</h4>
            <button class="btn btn-secondary btn-sm" onclick="ProfileView.addProjectItem()"><i class="fa-solid fa-plus"></i> Add Project</button>
          </div>
          <div id="project-items-list">
            ${projects.map((proj, i) => this.renderProjectForm(proj, i)).join('')}
          </div>
        </div>

        <!-- Tab 6: Links & Preferences -->
        <div id="tab-links" class="tab-pane" style="display: none;">
          <h4 style="margin-bottom: 1rem;">Social & Professional Links</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            <div class="form-group">
              <label class="form-label"><i class="fa-brands fa-github"></i> GitHub URL</label>
              <input type="text" id="link-github" class="form-control" value="${links.github || ''}" placeholder="https://github.com/username">
            </div>
            <div class="form-group">
              <label class="form-label"><i class="fa-brands fa-linkedin"></i> LinkedIn URL</label>
              <input type="text" id="link-linkedin" class="form-control" value="${links.linkedin || ''}" placeholder="https://linkedin.com/in/username">
            </div>
            <div class="form-group">
              <label class="form-label"><i class="fa-solid fa-globe"></i> Personal Website</label>
              <input type="text" id="link-website" class="form-control" value="${links.website || ''}" placeholder="https://mywebsite.com">
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderEducationForm(edu = {}, index) {
    return `
      <div class="card" style="margin-bottom: 1rem; background-color: var(--bg-input);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
          <strong>Education #${index + 1}</strong>
          <button class="btn btn-outline btn-sm" style="color: var(--danger);" onclick="ProfileView.removeEducationItem(${index})"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem;">
          <input type="text" class="form-control edu-institution" value="${edu.institution || ''}" placeholder="Institution / University">
          <input type="text" class="form-control edu-degree" value="${edu.degree || ''}" placeholder="Degree (e.g. B.Tech / B.S.)">
          <input type="text" class="form-control edu-branch" value="${edu.branch || ''}" placeholder="Branch / Specialization">
          <input type="text" class="form-control edu-start" value="${edu.startYear || ''}" placeholder="Start Year (2022)">
          <input type="text" class="form-control edu-end" value="${edu.endYear || ''}" placeholder="End Year (2026)">
          <input type="text" class="form-control edu-cgpa" value="${edu.cgpa || ''}" placeholder="CGPA / Score">
        </div>
      </div>
    `;
  },

  renderExperienceForm(exp = {}, index) {
    return `
      <div class="card" style="margin-bottom: 1rem; background-color: var(--bg-input);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
          <strong>Experience #${index + 1}</strong>
          <button class="btn btn-outline btn-sm" style="color: var(--danger);" onclick="ProfileView.removeExperienceItem(${index})"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; margin-bottom: 0.75rem;">
          <input type="text" class="form-control exp-company" value="${exp.company || ''}" placeholder="Company Name">
          <input type="text" class="form-control exp-role" value="${exp.role || ''}" placeholder="Role / Title">
          <input type="text" class="form-control exp-start" value="${exp.startDate || ''}" placeholder="Start Date">
          <input type="text" class="form-control exp-end" value="${exp.endDate || ''}" placeholder="End Date (Present)">
        </div>
        <textarea class="form-control exp-desc" placeholder="Role description & achievements...">${exp.description || ''}</textarea>
      </div>
    `;
  },

  renderProjectForm(proj = {}, index) {
    return `
      <div class="card" style="margin-bottom: 1rem; background-color: var(--bg-input);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
          <strong>Project #${index + 1}</strong>
          <button class="btn btn-outline btn-sm" style="color: var(--danger);" onclick="ProfileView.removeProjectItem(${index})"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; margin-bottom: 0.75rem;">
          <input type="text" class="form-control proj-name" value="${proj.name || ''}" placeholder="Project Name">
          <input type="text" class="form-control proj-tech" value="${(proj.technologies || []).join(', ')}" placeholder="Tech Stack (comma separated)">
          <input type="text" class="form-control proj-github" value="${proj.githubUrl || ''}" placeholder="GitHub URL">
          <input type="text" class="form-control proj-live" value="${proj.liveUrl || ''}" placeholder="Live Demo URL">
        </div>
        <textarea class="form-control proj-desc" placeholder="Project features & description...">${proj.description || ''}</textarea>
      </div>
    `;
  },

  switchTab(tabId, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
    btn.classList.add('active');
    document.getElementById(`tab-${tabId}`).style.display = 'block';
  },

  addSkill() {
    const input = document.getElementById('new-skill-input');
    const val = input.value.trim();
    if (!val) return;
    if (!this.profileData.skills) this.profileData.skills = [];
    if (!this.profileData.skills.includes(val)) {
      this.profileData.skills.push(val);
    }
    input.value = '';
    this.refreshSkillsUI();
  },

  removeSkill(index) {
    this.profileData.skills.splice(index, 1);
    this.refreshSkillsUI();
  },

  refreshSkillsUI() {
    const container = document.getElementById('skills-chips-container');
    if (!container) return;
    container.innerHTML = this.profileData.skills.map((sk, i) => `
      <span class="badge badge-primary" style="font-size: 0.85rem; padding: 0.4rem 0.85rem;">
        ${sk}
        <i class="fa-solid fa-xmark" style="margin-left: 0.5rem; cursor: pointer;" onclick="ProfileView.removeSkill(${i})"></i>
      </span>
    `).join('');
  },

  addEducationItem() {
    if (!this.profileData.education) this.profileData.education = [];
    this.profileData.education.push({});
    document.getElementById('education-items-list').insertAdjacentHTML('beforeend', this.renderEducationForm({}, this.profileData.education.length - 1));
  },

  removeEducationItem(index) {
    this.profileData.education.splice(index, 1);
    const list = document.getElementById('education-items-list');
    list.innerHTML = this.profileData.education.map((e, i) => this.renderEducationForm(e, i)).join('');
  },

  addExperienceItem() {
    if (!this.profileData.experience) this.profileData.experience = [];
    this.profileData.experience.push({});
    document.getElementById('experience-items-list').insertAdjacentHTML('beforeend', this.renderExperienceForm({}, this.profileData.experience.length - 1));
  },

  removeExperienceItem(index) {
    this.profileData.experience.splice(index, 1);
    const list = document.getElementById('experience-items-list');
    list.innerHTML = this.profileData.experience.map((e, i) => this.renderExperienceForm(e, i)).join('');
  },

  addProjectItem() {
    if (!this.profileData.projects) this.profileData.projects = [];
    this.profileData.projects.push({});
    document.getElementById('project-items-list').insertAdjacentHTML('beforeend', this.renderProjectForm({}, this.profileData.projects.length - 1));
  },

  removeProjectItem(index) {
    this.profileData.projects.splice(index, 1);
    const list = document.getElementById('project-items-list');
    list.innerHTML = this.profileData.projects.map((p, i) => this.renderProjectForm(p, i)).join('');
  },

  async saveAllChanges() {
    const basicInfo = {
      fullName: document.getElementById('prof-fullname').value,
      email: document.getElementById('prof-email').value,
      phone: document.getElementById('prof-phone').value,
      location: document.getElementById('prof-location').value,
      aboutMe: document.getElementById('prof-about').value
    };

    // Scrape Education
    const eduCards = document.querySelectorAll('#education-items-list .card');
    const education = Array.from(eduCards).map(card => ({
      institution: card.querySelector('.edu-institution').value,
      degree: card.querySelector('.edu-degree').value,
      branch: card.querySelector('.edu-branch').value,
      startYear: card.querySelector('.edu-start').value,
      endYear: card.querySelector('.edu-end').value,
      cgpa: card.querySelector('.edu-cgpa').value
    }));

    // Scrape Experience
    const expCards = document.querySelectorAll('#experience-items-list .card');
    const experience = Array.from(expCards).map(card => ({
      company: card.querySelector('.exp-company').value,
      role: card.querySelector('.exp-role').value,
      startDate: card.querySelector('.exp-start').value,
      endDate: card.querySelector('.exp-end').value,
      description: card.querySelector('.exp-desc').value
    }));

    // Scrape Projects
    const projCards = document.querySelectorAll('#project-items-list .card');
    const projects = Array.from(projCards).map(card => ({
      name: card.querySelector('.proj-name').value,
      technologies: card.querySelector('.proj-tech').value.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl: card.querySelector('.proj-github').value,
      liveUrl: card.querySelector('.proj-live').value,
      description: card.querySelector('.proj-desc').value
    }));

    const links = {
      github: document.getElementById('link-github')?.value || '',
      linkedin: document.getElementById('link-linkedin')?.value || '',
      website: document.getElementById('link-website')?.value || ''
    };

    const payload = {
      basicInfo,
      skills: this.profileData.skills,
      education,
      experience,
      projects,
      links
    };

    try {
      const res = await API.request('/profile', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      API.showToast('Profile updated successfully!');
      this.profileData = res.profile;
    } catch (err) {
      // Handled by API error toast
    }
  }
};
