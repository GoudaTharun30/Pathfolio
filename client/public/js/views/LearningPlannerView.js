/**
 * Personalized Time-Based Learning Planner View
 */
const LearningPlannerView = {
  userPaths: [],
  activePath: null,

  async render() {
    try {
      this.userPaths = await API.request('/learning-plan/paths');
      if (this.userPaths.length) {
        this.activePath = this.userPaths.find(p => p.isActive) || this.userPaths[0];
      } else {
        this.activePath = null;
      }
    } catch (e) {
      this.userPaths = [];
      this.activePath = null;
    }

    if (!this.activePath) {
      return `
        <div class="card" style="text-align: center; padding: 4rem 2rem;">
          <i class="fa-solid fa-compass-drafting" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
          <h2>No Personalized Learning Path Active</h2>
          <p style="color: var(--text-muted); max-width: 500px; margin: 0.5rem auto 1.5rem;">
            Explore Career Roadmaps and choose your available learning time to generate a personalized priority path!
          </p>
          <button class="btn btn-primary btn-lg" onclick="app.navigate('roadmaps')">
            <i class="fa-solid fa-map-location-dot"></i> Explore Career Roadmaps
          </button>
        </div>
      `;
    }

    const path = this.activePath;
    const progressPct = path.progress || 0;
    const weeks = path.weeks || [];

    // Group weeks by Month
    const monthsMap = {};
    weeks.forEach(w => {
      const mNum = w.monthNumber || 1;
      if (!monthsMap[mNum]) monthsMap[mNum] = [];
      monthsMap[mNum].push(w);
    });

    return `
      <!-- Header Banner & Path Switcher -->
      <div class="card" style="margin-bottom: 2rem; border-color: var(--primary);">
        
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.3rem;">
              <span class="badge badge-primary"><i class="fa-solid fa-compass"></i> Active Learning Path</span>
              <span class="badge badge-success"><i class="fa-solid fa-clock"></i> ${path.durationLabel} • ${path.dailyHoursLabel}</span>
            </div>
            <h2>${path.roadmapTitle}</h2>
          </div>

          <!-- Multi-Path Switcher -->
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            ${this.userPaths.length > 1 ? `
              <div class="form-group" style="margin-bottom: 0;">
                <select id="path-switcher-select" class="form-control" onchange="LearningPlannerView.switchActivePath(this.value)">
                  ${this.userPaths.map(p => `
                    <option value="${p._id}" ${p._id.toString() === path._id.toString() ? 'selected' : ''}>
                      ${p.roadmapTitle} (${p.progress}% completed)
                    </option>
                  `).join('')}
                </select>
              </div>
            ` : ''}
            <button class="btn btn-outline btn-sm" onclick="app.navigate('roadmaps')">
              <i class="fa-solid fa-plus"></i> New Career Path
            </button>
          </div>
        </div>

        <!-- Progress Overview -->
        <div style="background-color: var(--bg-input); padding: 1.25rem; border-radius: var(--radius-md);">
          <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">
            <span>Overall Roadmap Completion</span>
            <span style="color: var(--primary);">${progressPct}% Progress</span>
          </div>
          <div class="progress-bar-container" style="height: 12px;">
            <div class="progress-bar-fill" style="width: ${progressPct}%;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">
            <span><i class="fa-solid fa-calendar"></i> Duration: ${path.durationLabel} (${path.durationWeeks} Weeks)</span>
            <span><i class="fa-solid fa-bolt"></i> Commitment: ${path.hoursPerWeek} hrs/week (${path.totalCapacityHours} total study hrs)</span>
          </div>
        </div>

      </div>

      <!-- Schedule Breakdown Grouped by Month -->
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        ${Object.keys(monthsMap).map(monthNum => `
          <div class="card">
            <h3 style="font-size: 1.25rem; color: #a5b4fc; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              <i class="fa-solid fa-calendar-check" style="color: var(--primary);"></i> MONTH ${monthNum} SCHEDULE
            </h3>

            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              ${monthsMap[monthNum].map(week => `
                <div style="background-color: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
                  <h4 style="font-size: 1.05rem; margin-bottom: 1rem; color: var(--text-main);">
                    Week ${week.weekNumber}: <span style="font-weight: 400; color: var(--text-muted);">${week.title.replace(/^Week \d+:\s*/, '')}</span>
                  </h4>

                  <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                    ${week.topics.map(topic => `
                      <div class="next-step-item" style="padding: 0.75rem 1rem; ${topic.completed ? 'opacity: 0.6; background-color: var(--bg-card);' : ''}">
                        <div class="step-info">
                          <input 
                            type="checkbox" 
                            ${topic.completed ? 'checked' : ''} 
                            style="width: 20px; height: 20px; cursor: pointer; accent-color: var(--primary);" 
                            onchange="LearningPlannerView.toggleTopic('${path._id}', '${topic.topicId}')"
                          >
                          <div>
                            <strong style="font-size: 0.95rem; ${topic.completed ? 'text-decoration: line-through;' : ''}">${topic.title}</strong>
                            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">
                              <span class="badge ${topic.importance === 'essential' ? 'badge-primary' : 'badge-success'}" style="font-size: 0.65rem;">${topic.importance}</span>
                              <span style="margin-left: 0.5rem;"><i class="fa-solid fa-clock"></i> ~${topic.estimatedHours || 4} hrs</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          ${topic.completed ? '<span class="badge badge-success"><i class="fa-solid fa-check"></i> Finished</span>' : '<span class="badge">In Progress</span>'}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>

          </div>
        `).join('')}
      </div>
    `;
  },

  async toggleTopic(pathId, topicId) {
    try {
      const res = await API.request(`/learning-plan/paths/${pathId}/topic-toggle`, {
        method: 'PATCH',
        body: JSON.stringify({ topicId })
      });
      this.activePath = res.path;
      app.renderCurrentView();
    } catch (e) {
      // Handled
    }
  },

  async switchActivePath(pathId) {
    try {
      await API.request('/learning-plan/paths/set-active', {
        method: 'POST',
        body: JSON.stringify({ pathId })
      });
      app.renderCurrentView();
    } catch (e) {
      // Handled
    }
  }
};
