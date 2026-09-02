/**
 * Upgraded Project Recommendation System View
 * Uses existing Career Roadmaps data as single source of truth and presents exactly 5 projects (2 Easy, 2 Medium, 1 Hard)
 */
const ProjectsView = {
  roadmaps: [],
  selectedRoadmap: null,
  projects: [],
  activeModalProject: null,

  async render() {
    // 1. Fetch existing roadmaps from single source of truth
    try {
      this.roadmaps = await API.request('/roadmaps');
      if (!this.selectedRoadmap && this.roadmaps.length) {
        this.selectedRoadmap = this.roadmaps[0];
      }
    } catch (e) {
      this.roadmaps = [];
      this.selectedRoadmap = null;
    }

    // 2. Fetch projects for selected roadmap
    if (this.selectedRoadmap) {
      await this.fetchProjectsForRoadmap(this.selectedRoadmap.slug);
    }

    return `
      <div style="margin-bottom: 2rem;">
        <h2>Project Recommendations</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Choose a career path and discover projects that help you practice, build your portfolio, and become job-ready.</p>
      </div>

      <!-- Roadmap Selector Card -->
      <div class="card" style="margin-bottom: 2rem;">
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
          <div style="flex: 1; min-width: 280px;">
            <label class="form-label" style="font-size: 0.95rem;"><i class="fa-solid fa-compass" style="color: var(--primary);"></i> Select a Career Roadmap</label>
            <select id="project-roadmap-selector" class="form-control" onchange="ProjectsView.onRoadmapChange(this.value)">
              ${this.roadmaps.map(r => `
                <option value="${r.slug}" ${this.selectedRoadmap?.slug === r.slug ? 'selected' : ''}>
                  ${r.title} (${r.category}) — ${r.branches?.join(', ')}
                </option>
              `).join('')}
            </select>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">
            <i class="fa-solid fa-sync"></i> Synchronized with Career Roadmaps
          </div>
        </div>
      </div>

      <!-- Selected Roadmap Summary Card -->
      ${this.selectedRoadmap ? `
        <div class="card" style="margin-bottom: 2rem; border-color: var(--primary); background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), transparent);">
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem;">
            <div>
              <span class="badge badge-primary" style="margin-bottom: 0.3rem;">${this.selectedRoadmap.category}</span>
              <span class="badge badge-success" style="margin-left: 0.4rem;"><i class="fa-solid fa-graduation-cap"></i> ${this.selectedRoadmap.branches?.join(' • ')}</span>
              <h3 style="font-size: 1.4rem; margin-top: 0.2rem;">${this.selectedRoadmap.title}</h3>
            </div>
            <div style="text-align: right;">
              <span class="badge badge-primary" style="font-size: 0.85rem; padding: 0.4rem 0.85rem;">Exactly 5 Projects (2 Easy • 2 Medium • 1 Hard)</span>
            </div>
          </div>

          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">${this.selectedRoadmap.description}</p>
          
          <div>
            <strong style="font-size: 0.85rem; color: var(--text-main);">Key Roadmap Technologies:</strong>
            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.35rem;">
              ${(this.selectedRoadmap.requiredSkills || []).map(sk => `<span class="badge">${sk}</span>`).join('')}
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Why These Projects & Recommended Order Banner -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-lightbulb" style="color: var(--warning); font-size: 1.2rem;"></i>
          <strong style="font-size: 1rem;">Why these projects?</strong>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.85rem;">
          These projects were selected specifically for the <strong>${this.selectedRoadmap?.title || 'Selected'}</strong> roadmap and are arranged from practice-oriented fundamentals to a portfolio-level project.
        </p>
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--primary);">
          <span>Recommended Order:</span>
          <span class="badge badge-success">1 → Easy Practice 1</span>
          <i class="fa-solid fa-angle-right" style="color: var(--text-subtle);"></i>
          <span class="badge badge-success">2 → Easy Practice 2</span>
          <i class="fa-solid fa-angle-right" style="color: var(--text-subtle);"></i>
          <span class="badge badge-primary">3 → Medium Skill-Building 1</span>
          <i class="fa-solid fa-angle-right" style="color: var(--text-subtle);"></i>
          <span class="badge badge-primary">4 → Medium Skill-Building 2</span>
          <i class="fa-solid fa-angle-right" style="color: var(--text-subtle);"></i>
          <span class="badge" style="background: rgba(168, 85, 247, 0.2); color: #c084fc;">5 → Hard Portfolio Project</span>
        </div>
      </div>

      <!-- Categorized 5-Project Grid -->
      <div id="projects-list-container">
        ${this.renderProjectsGrid()}
      </div>
    `;
  },

  async fetchProjectsForRoadmap(slug) {
    try {
      this.projects = await API.request(`/projects?roadmapSlug=${slug}`);
    } catch (e) {
      this.projects = [];
    }
  },

  async onRoadmapChange(slug) {
    this.selectedRoadmap = this.roadmaps.find(r => r.slug === slug);
    await this.fetchProjectsForRoadmap(slug);
    app.renderCurrentView();
  },

  renderProjectsGrid() {
    if (!this.projects.length) {
      return `
        <div class="card" style="text-align: center; padding: 3rem; color: var(--text-muted);">
          <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--text-subtle);"></i>
          <h3>Projects Coming Soon</h3>
          <p>We are preparing practical project recommendations for this career path.</p>
        </div>
      `;
    }

    const easyProjects = this.projects.filter(p => p.difficulty === 'easy');
    const mediumProjects = this.projects.filter(p => p.difficulty === 'medium');
    const hardProjects = this.projects.filter(p => p.difficulty === 'hard');

    return `
      <!-- Section 1: EASY Practice Projects -->
      <div style="margin-bottom: 2.5rem;">
        <h3 style="font-size: 1.2rem; color: #6ee7b7; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-seedling"></i> EASY — Practice Projects (2)
          <span style="font-size: 0.8rem; font-weight: 400; color: var(--text-muted);">(1–5 Days • Core Concept Practice)</span>
        </h3>
        <div class="features-grid">
          ${easyProjects.map(p => this.renderProjectCard(p, 'easy')).join('')}
        </div>
      </div>

      <!-- Section 2: MEDIUM Skill-Building Projects -->
      <div style="margin-bottom: 2.5rem;">
        <h3 style="font-size: 1.2rem; color: #818cf8; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-layer-group"></i> MEDIUM — Skill-Building Projects (2)
          <span style="font-size: 0.8rem; font-weight: 400; color: var(--text-muted);">(1–3 Weeks • Resume-Worthy Applications)</span>
        </h3>
        <div class="features-grid">
          ${mediumProjects.map(p => this.renderProjectCard(p, 'medium')).join('')}
        </div>
      </div>

      <!-- Section 3: HARD Portfolio-Level Project -->
      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.2rem; color: #c084fc; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-trophy"></i> HARD — Portfolio-Level Project (1)
          <span style="font-size: 0.8rem; font-weight: 400; color: var(--text-muted);">(3–8+ Weeks • Standout Technical Capability)</span>
        </h3>
        <div class="features-grid">
          ${hardProjects.map(p => this.renderProjectCard(p, 'hard')).join('')}
        </div>
      </div>
    `;
  },

  renderProjectCard(p, difficultyType) {
    const badgeStyle = difficultyType === 'easy' 
      ? 'background: rgba(16, 185, 129, 0.15); color: #6ee7b7;'
      : difficultyType === 'medium'
      ? 'background: rgba(99, 102, 241, 0.15); color: #a5b4fc;'
      : 'background: rgba(168, 85, 247, 0.2); color: #c084fc;';

    const borderStyle = difficultyType === 'hard' ? 'border-color: #a855f7;' : '';

    return `
      <div class="feature-card" style="display: flex; flex-direction: column; ${borderStyle}">
        
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
          <span class="badge" style="${badgeStyle} text-transform: uppercase; font-weight: 700;">
            #${p.recommendedOrder || 1} • ${p.difficulty}
          </span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">
            <i class="fa-solid fa-clock"></i> ${p.estimatedTime || '1-2 weeks'}
          </span>
        </div>

        <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--text-main);">${p.title}</h3>
        <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem; flex: 1; height: 60px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
          ${p.description}
        </p>

        <!-- Technologies & Skills -->
        <div style="margin-bottom: 1rem;">
          <strong style="font-size: 0.75rem; color: var(--text-subtle); display: block; margin-bottom: 0.3rem;">TECHNOLOGIES & SKILLS:</strong>
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            ${(p.technologies || []).map(t => `<span class="badge">${t}</span>`).join('')}
          </div>
        </div>

        <!-- Value Indicators -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-muted); background: var(--bg-input); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">
          <span>Resume Value: <strong style="color: var(--success);">${p.resumeValue || 'High'}</strong></span>
          <span>Portfolio Value: <strong style="color: var(--primary);">${p.portfolioValue || 'High'}</strong></span>
        </div>

        <button class="btn btn-outline btn-block btn-sm" onclick="ProjectsView.openProjectModal('${p.slug}')">
          <i class="fa-solid fa-circle-info"></i> View Project Details
        </button>
      </div>
    `;
  },

  /**
   * Opens Project Details Modal with full development steps & sync action
   */
  openProjectModal(slug) {
    const p = this.projects.find(item => item.slug === slug);
    if (!p) return;

    this.activeModalProject = p;
    const modal = document.getElementById('modal-root');
    const body = document.getElementById('modal-body');

    const badgeStyle = p.difficulty === 'easy' 
      ? 'background: rgba(16, 185, 129, 0.15); color: #6ee7b7;'
      : p.difficulty === 'medium'
      ? 'background: rgba(99, 102, 241, 0.15); color: #a5b4fc;'
      : 'background: rgba(168, 85, 247, 0.2); color: #c084fc;';

    body.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.85rem;">
        <div>
          <span class="badge" style="${badgeStyle} text-transform: uppercase; font-weight: 700; margin-bottom: 0.3rem;">Order #${p.recommendedOrder} • ${p.difficulty}</span>
          <h2>${p.title}</h2>
        </div>
        <button class="btn btn-outline btn-sm" onclick="app.closeModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div style="max-height: 70vh; overflow-y: auto; padding-right: 0.5rem;">
        
        <!-- Overview & Why Build -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--text-main); margin-bottom: 0.4rem;">Project Overview</h4>
          <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 0.85rem;">${p.description}</p>
          
          ${p.whyBuildIt ? `
            <div style="background-color: var(--bg-input); border-left: 4px solid var(--primary); padding: 0.85rem 1rem; border-radius: 4px; margin-bottom: 1rem;">
              <strong style="font-size: 0.85rem; color: var(--primary); display: block; margin-bottom: 0.2rem;"><i class="fa-solid fa-lightbulb"></i> Why Build This Project?</strong>
              <div style="font-size: 0.9rem; color: var(--text-main);">${p.whyBuildIt}</div>
            </div>
          ` : ''}
        </div>

        <!-- Tech & Skills Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div class="card" style="background-color: var(--bg-input); padding: 1rem;">
            <strong style="font-size: 0.85rem; color: var(--text-subtle); display: block; margin-bottom: 0.5rem;">TECHNOLOGIES:</strong>
            <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
              ${(p.technologies || []).map(t => `<span class="badge badge-primary">${t}</span>`).join('')}
            </div>
          </div>
          <div class="card" style="background-color: var(--bg-input); padding: 1rem;">
            <strong style="font-size: 0.85rem; color: var(--text-subtle); display: block; margin-bottom: 0.5rem;">SKILLS LEARNED:</strong>
            <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
              ${(p.skillsLearned || []).map(s => `<span class="badge badge-success">${s}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Features & Time -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--text-main); margin-bottom: 0.5rem;"><i class="fa-solid fa-list-check" style="color: var(--success);"></i> Key Features to Implement</h4>
          <ul style="padding-left: 1.25rem; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">
            ${(p.features || p.featuresToImplement || []).map(f => `<li style="margin-bottom: 0.3rem;">${f}</li>`).join('')}
          </ul>
        </div>

        <!-- Step-by-Step Development Plan -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--text-main); margin-bottom: 0.75rem;"><i class="fa-solid fa-bars-staggered" style="color: var(--primary);"></i> Suggested Development Steps</h4>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${(p.developmentSteps || []).map((step, idx) => `
              <div style="display: flex; align-items: flex-start; gap: 0.75rem; background: var(--bg-input); padding: 0.6rem 0.85rem; border-radius: var(--radius-sm); font-size: 0.875rem;">
                <span style="background: var(--primary); color: #fff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; flex-shrink: 0;">${idx + 1}</span>
                <span style="color: var(--text-main);">${step}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Metadata Footer -->
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; background: var(--bg-card); border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
          <div>
            <span style="font-size: 0.85rem; color: var(--text-muted); display: block;"><i class="fa-solid fa-clock"></i> Estimated Completion Time: <strong>${p.estimatedTime || '1-2 weeks'}</strong></span>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <span class="badge badge-success">Resume Value: ${p.resumeValue || 'High'}</span>
            <span class="badge badge-primary">Portfolio Value: ${p.portfolioValue || 'High'}</span>
          </div>
        </div>

      </div>

      <!-- Action Button -->
      <div style="margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
        <button class="btn btn-primary btn-block btn-lg" onclick="ProjectsView.markCompleted('${p.slug}')">
          <i class="fa-solid fa-check-circle"></i> Mark Completed & Sync to Profile
        </button>
      </div>
    `;

    modal.classList.add('active');
  },

  async markCompleted(slug) {
    try {
      const res = await API.request('/projects/complete', {
        method: 'POST',
        body: JSON.stringify({ projectSlug: slug })
      });
      app.closeModal();
      API.showToast(res.message);
      app.navigate('profile');
    } catch (e) {
      // Handled
    }
  }
};
