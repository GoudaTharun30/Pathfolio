/**
 * Authenticated Home Dashboard View
 */
const DashboardView = {
  async render() {
    let profile, paths;
    try {
      profile = await API.request('/profile');
      paths = await API.request('/learning-plan/paths');
    } catch (e) {
      profile = {};
      paths = [];
    }

    const activePath = (paths || []).find(p => p.isActive) || paths[0] || {};
    const userName = profile.basicInfo?.fullName || app.currentUser?.name || 'Developer';
    const activeRoadmap = activePath.roadmapTitle || 'Full Stack Developer';
    const learningProgress = activePath.progress || 0;

    const skillsCount = (profile.skills || []).length;
    const projectsCount = (profile.projects || []).length;

    // Calculate profile completion %
    let profileFields = 0;
    if (profile.basicInfo?.fullName) profileFields += 20;
    if (profile.education?.length) profileFields += 20;
    if (profile.skills?.length) profileFields += 20;
    if (profile.experience?.length || profile.projects?.length) profileFields += 20;
    if (profile.links?.github || profile.links?.linkedin) profileFields += 20;

    return `
      <!-- Welcome Banner -->
      <div class="welcome-banner">
        <div class="welcome-text">
          <h2>Welcome back, ${userName}!</h2>
          <p style="color: var(--text-muted); margin-top: 0.25rem;">
            Active Career Path: <strong style="color: #a5b4fc;"><i class="fa-solid fa-compass"></i> ${activeRoadmap}</strong>
            ${activePath.durationLabel ? `<span class="badge badge-primary" style="margin-left: 0.5rem;">${activePath.durationLabel}</span>` : ''}
          </p>
        </div>
        <div>
          <button class="btn btn-primary btn-sm" onclick="app.navigate('learning')">
            <i class="fa-solid fa-play"></i> Continue Learning
          </button>
        </div>
      </div>

      <!-- Metrics Grid -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-header">
            <span>Roadmap Progress</span>
            <i class="fa-solid fa-chart-line" style="color: var(--primary);"></i>
          </div>
          <div class="metric-value">${learningProgress}%</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${learningProgress}%;"></div>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem;">Time-based Personalized Path</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span>Verified Skills</span>
            <i class="fa-solid fa-code" style="color: var(--secondary);"></i>
          </div>
          <div class="metric-value">${skillsCount}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.8rem;">Saved in your profile</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span>Projects Completed</span>
            <i class="fa-solid fa-diagram-project" style="color: var(--success);"></i>
          </div>
          <div class="metric-value">${projectsCount}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.8rem;">Linked to resume & portfolio</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span>Profile Completion</span>
            <i class="fa-solid fa-user-check" style="color: var(--warning);"></i>
          </div>
          <div class="metric-value">${profileFields}%</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${profileFields}%; background: var(--warning);"></div>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem;">Used to populate resumes</div>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <h3 style="margin-bottom: 1rem; font-size: 1.15rem;">Quick Actions</h3>
      <div class="quick-actions-grid">
        <button class="btn btn-secondary" onclick="app.navigate('profile')">
          <i class="fa-solid fa-user-pen" style="color: var(--primary);"></i> Complete Profile
        </button>
        <button class="btn btn-secondary" onclick="app.navigate('roadmaps')">
          <i class="fa-solid fa-map" style="color: var(--secondary);"></i> Explore Roadmaps
        </button>
        <button class="btn btn-secondary" onclick="app.navigate('learning')">
          <i class="fa-solid fa-list-check" style="color: var(--success);"></i> Learning Planner
        </button>
        <button class="btn btn-secondary" onclick="app.navigate('projects')">
          <i class="fa-solid fa-rocket" style="color: var(--warning);"></i> Recommended Projects
        </button>
        <button class="btn btn-secondary" onclick="app.navigate('resume')">
          <i class="fa-solid fa-file-invoice" style="color: #a855f7;"></i> Build Resume
        </button>
        <button class="btn btn-secondary" onclick="app.navigate('portfolio')">
          <i class="fa-solid fa-laptop-code" style="color: #ec4899;"></i> Build Portfolio
        </button>
      </div>

      <!-- Recommended Next Steps -->
      <div class="card" style="margin-top: 2rem;">
        <h3 style="margin-bottom: 1.25rem;"><i class="fa-solid fa-compass" style="color: var(--primary);"></i> Recommended Next Steps</h3>
        <div class="next-steps-list">
          <div class="next-step-item">
            <div class="step-info">
              <i class="fa-solid ${profileFields < 100 ? 'fa-circle-dot' : 'fa-circle-check'}" style="color: ${profileFields < 100 ? 'var(--warning)' : 'var(--success)'};"></i>
              <div>
                <strong style="font-size: 0.95rem;">Complete your career profile details</strong>
                <div style="font-size: 0.85rem; color: var(--text-muted);">Add education, skills, and projects so resume builder can auto-fill.</div>
              </div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="app.navigate('profile')">Edit Profile</button>
          </div>

          <div class="next-step-item">
            <div class="step-info">
              <i class="fa-solid fa-circle-dot" style="color: var(--secondary);"></i>
              <div>
                <strong style="font-size: 0.95rem;">Check next module on ${activeRoadmap}</strong>
                <div style="font-size: 0.85rem; color: var(--text-muted);">Complete tasks in Learning Planner to increase your roadmap progress.</div>
              </div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="app.navigate('learning')">View Planner</button>
          </div>

          <div class="next-step-item">
            <div class="step-info">
              <i class="fa-solid fa-circle-dot" style="color: var(--primary);"></i>
              <div>
                <strong style="font-size: 0.95rem;">Build a recommended project</strong>
                <div style="font-size: 0.85rem; color: var(--text-muted);">Complete matched projects to automatically add them to your portfolio.</div>
              </div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="app.navigate('projects')">View Projects</button>
          </div>
        </div>
      </div>
    `;
  }
};
