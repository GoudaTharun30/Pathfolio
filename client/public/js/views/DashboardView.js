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
      <div class="welcome-banner paper-fold">
        <div class="welcome-text">
          <h2>Welcome back, ${userName}!</h2>
          <p style="color: var(--text-muted); margin-top: 0.25rem;">
            Active Career Path: <strong class="sketch-underline"><i class="fa-solid fa-compass"></i> ${activeRoadmap}</strong>
            ${activePath.durationLabel ? `<span class="badge badge-primary" style="margin-left: 0.5rem; border-radius: var(--paper-radius-pill);">${activePath.durationLabel}</span>` : '<span class="badge badge-primary" style="margin-left: 0.5rem; border-radius: var(--paper-radius-pill);">3 Months</span>'}
          </p>
        </div>
        <div class="welcome-cta-group">
          <div class="sketch-arrow-left" aria-hidden="true">
            <svg width="42" height="36" viewBox="0 0 48 42" fill="none" style="display: block;">
              <path d="M 4 8 Q 20 6 36 16" stroke="#171717" stroke-width="2.5" stroke-linecap="round" fill="none" />
              <path d="M 28 12 L 37 16 L 33 22" stroke="#171717" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M 6 36 Q 22 34 38 24" stroke="#171717" stroke-width="2.5" stroke-linecap="round" fill="none" />
              <path d="M 33 18 L 39 23 L 30 28" stroke="#171717" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            </svg>
          </div>
          <button class="btn btn-primary btn-sm btn-marker-blue" onclick="app.navigate('learning')" title="Continue your learning journey">
            Continue Learning
          </button>
        </div>
      </div>

      <!-- Metrics Grid -->
      <div class="metrics-grid">
        <div class="metric-card paper-fold">
          <div class="metric-header">
            <span>Roadmap Progress</span>
            <i class="fa-solid fa-chart-line"></i>
          </div>
          <div class="metric-value">${learningProgress}%</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${learningProgress || 10}%;"></div>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.4rem;">Time-based Personalized Path</div>
        </div>

        <div class="metric-card paper-fold">
          <div class="metric-header">
            <span>Verified Skills</span>
            <i class="fa-solid fa-code"></i>
          </div>
          <div class="metric-value">${skillsCount || 4}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.8rem;">Saved in your profile</div>
        </div>

        <div class="metric-card paper-fold">
          <div class="metric-header">
            <span>Projects Completed</span>
            <i class="fa-solid fa-diagram-project"></i>
          </div>
          <div class="metric-value">${projectsCount}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.8rem;">Linked to resume & portfolio</div>
        </div>

        <div class="metric-card paper-fold">
          <div class="metric-header">
            <span>Profile Completion</span>
            <i class="fa-solid fa-user-check"></i>
          </div>
          <div class="metric-value">${profileFields || 20}%</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${profileFields || 20}%;"></div>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.4rem;">Used to populate resumes</div>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <h3 class="quick-actions-title"><i class="fa-solid fa-pencil" style="font-size: 1.1rem; color: var(--paper-ink);"></i> Quick Actions</h3>
      <div class="quick-actions-grid">
        <button class="btn btn-secondary quick-action-primary" onclick="app.navigate('profile')">
          <i class="fa-solid fa-user-pen"></i> Complete Profile
        </button>
        <button class="btn btn-secondary" onclick="app.navigate('roadmaps')">
          <i class="fa-solid fa-map"></i> Explore Roadmaps
        </button>
        <button class="btn btn-secondary" onclick="app.navigate('learning')">
          <i class="fa-solid fa-list-check"></i> Learning Planner
        </button>
        <button class="btn btn-secondary" onclick="app.navigate('projects')">
          <i class="fa-solid fa-rocket"></i> Recommended Projects
        </button>
        <button class="btn btn-secondary" onclick="app.navigate('resume')">
          <i class="fa-solid fa-file-invoice"></i> Build Resume
        </button>
        <button class="btn btn-secondary" onclick="app.navigate('portfolio')">
          <i class="fa-solid fa-laptop-code"></i> Build Portfolio
        </button>
      </div>

      <!-- Recommended Next Steps -->
      <div class="next-steps-panel card">
        <div class="next-steps-header">
          <span class="next-steps-title"><i class="fa-solid fa-compass" style="margin-right: 0.4rem;"></i> Recommended Next Steps</span>
          <span class="next-steps-exclamation">!</span>
        </div>
        <div class="next-steps-list">
          <div class="next-step-item">
            <div class="step-info">
              <span class="sketch-check-icon"><i class="fa-regular fa-square-check" style="font-size: 1.35rem; color: var(--paper-ink);"></i></span>
              <div>
                <strong>Complete your career profile details</strong>
                <div>Add education, skills, and projects so resume builder can auto-fill.</div>
              </div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="app.navigate('profile')">Edit Profile</button>
          </div>

          <div class="next-step-item">
            <div class="step-info">
              <span class="sketch-check-icon"><i class="fa-regular fa-circle-dot" style="font-size: 1.35rem; color: var(--paper-ink);"></i></span>
              <div>
                <strong>Check next module on ${activeRoadmap}</strong>
                <div>Complete tasks in Learning Planner to increase your roadmap progress.</div>
              </div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="app.navigate('learning')">View Planner</button>
          </div>

          <div class="next-step-item">
            <div class="step-info">
              <span class="sketch-check-icon"><i class="fa-solid fa-circle" style="font-size: 1.1rem; color: var(--paper-ink); margin-top: 3px;"></i></span>
              <div>
                <strong>Build a recommended project</strong>
                <div>Complete matched projects to automatically add them to your portfolio.</div>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm btn-hatched" onclick="app.navigate('projects')">View Projects</button>
          </div>
        </div>
      </div>
    `;
  }
};
