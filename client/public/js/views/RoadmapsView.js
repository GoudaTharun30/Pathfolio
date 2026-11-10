/**
 * Upgraded Career Roadmaps Explorer View with Personalization Modal & Multi-Branch Filtering
 */
const RoadmapsView = {
  roadmaps: [],
  selectedRoadmap: null,
  debounceTimer: null,

  async render() {
    await this.fetchRoadmaps();

    return `
      <div style="margin-bottom: 2rem;">
        <h2>Career Roadmaps Explorer</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Discover realistic engineering career paths, explore structured interactive learning routes, and build a time-based personalized learning plan.</p>
      </div>

      <!-- Filter Controls Card -->
      <div class="card" style="margin-bottom: 2rem;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
          
          <!-- 1. Branch Filter -->
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label"><i class="fa-solid fa-graduation-cap"></i> Filter by Engineering Branch</label>
            <select id="filter-branch" class="form-control" onchange="RoadmapsView.applyFilters()">
              <option value="Any">Any Branch / All</option>
              <option value="CSE">CSE — Computer Science Engineering</option>
              <option value="IT">IT — Information Technology</option>
              <option value="ECE">ECE — Electronics & Communication</option>
              <option value="EEE">EEE — Electrical & Electronics</option>
              <option value="Mechanical">Mechanical Engineering</option>
              <option value="Civil">Civil Engineering</option>
            </select>
          </div>

          <!-- 2. Category Filter -->
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label"><i class="fa-solid fa-tags"></i> Category</label>
            <select id="filter-category" class="form-control" onchange="RoadmapsView.applyFilters()">
              <option value="All">All Categories</option>
              <option value="Software Development">Software Development</option>
              <option value="Data & AI">Data & AI</option>
              <option value="Cloud & DevOps">Cloud & DevOps</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Embedded Systems">Embedded Systems</option>
              <option value="VLSI & Semiconductor">VLSI & Semiconductor</option>
              <option value="Electrical & Power">Electrical & Power</option>
              <option value="Automation & Robotics">Automation & Robotics</option>
              <option value="Design & CAD">Design & CAD</option>
              <option value="Civil & Construction">Civil & Construction</option>
            </select>
          </div>

          <!-- 3. Known Skill Search -->
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label"><i class="fa-solid fa-magnifying-glass"></i> Filter by Known Skill</label>
            <input type="text" id="filter-skill" class="form-control" placeholder="e.g. React, Python, C++, Verilog" onkeyup="RoadmapsView.handleSkillInput(event)">
          </div>

        </div>
      </div>

      <!-- Roadmaps Grid -->
      <div class="features-grid" id="roadmaps-cards-grid" style="margin-bottom: 3rem;">
        ${this.renderRoadmapCards()}
      </div>
    `;
  },

  async fetchRoadmaps(query = '') {
    try {
      this.roadmaps = await API.request('/roadmaps' + query);
      if (this.roadmaps.length) {
        if (!this.selectedRoadmap || !this.roadmaps.some(r => r.slug === this.selectedRoadmap.slug)) {
          this.selectedRoadmap = this.roadmaps[0];
        }
      } else {
        this.selectedRoadmap = null;
      }
    } catch (e) {
      this.roadmaps = [];
      this.selectedRoadmap = null;
    }
  },

  renderRoadmapCards() {
    if (!this.roadmaps.length) {
      return `
        <div style="grid-column: 1 / -1; background-color: var(--bg-card); border: 1px dashed var(--border-color); border-radius: var(--radius-lg); padding: 3rem; text-align: center;">
          <i class="fa-solid fa-compass-drafting" style="font-size: 2.5rem; color: var(--text-subtle); margin-bottom: 1rem;"></i>
          <h3 style="margin-bottom: 0.5rem;">No career paths found</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Try changing your branch filter, category, or known skill search query.</p>
        </div>
      `;
    }

    return this.roadmaps.map(r => {
      const branchesList = (r.branches || ['CSE', 'IT']).join(' • ');
      const topicCount = (r.levels || []).reduce((count, level) => count + (level.topics || []).length, 0);
      const estimatedHours = (r.levels || []).flatMap(level => level.topics || []).reduce((count, topic) => count + (topic.estimatedHours || 0), 0);

      return `
        <div class="feature-card" style="display: flex; flex-direction: column;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <span class="badge badge-primary">${r.category}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);"><i class="fa-solid fa-list-check"></i> ${topicCount} topics</span>
          </div>
          <h3 style="font-size: 1.25rem; margin-bottom: 0.4rem;">${r.title}</h3>
          
          <div style="font-size: 0.8rem; color: #a5b4fc; font-weight: 500; margin-bottom: 0.75rem;">
            <i class="fa-solid fa-graduation-cap"></i> Suitable: ${branchesList}
          </div>

          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem; flex: 1; height: 55px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${r.description}</p>
          
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1.25rem;">
            ${(r.requiredSkills || []).slice(0, 4).map(sk => `<span class="badge">${sk}</span>`).join('')}
            ${(r.requiredSkills || []).length > 4 ? `<span class="badge">+${r.requiredSkills.length - 4} more</span>` : ''}
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin: -0.45rem 0 1.15rem;">
            <i class="fa-solid fa-signal"></i> ${r.levels?.length || 0} stages &nbsp; <i class="fa-regular fa-clock"></i> ~${estimatedHours || 0} hours
          </div>

          <div style="display: grid; grid-template-columns: 1fr auto; gap: 0.5rem;">
            <button class="btn btn-primary btn-sm" onclick="app.navigate('roadmap-detail', { slug: '${r.slug}' })">
              <i class="fa-solid fa-route"></i> View Details
            </button>
            <button class="btn btn-outline btn-sm" title="Personalized Learning Plan" onclick="RoadmapsView.openPersonalizationModal('${r.slug}')">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  handleSkillInput(e) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.applyFilters();
    }, 300);
  },

  async applyFilters() {
    const branch = document.getElementById('filter-branch').value;
    const category = document.getElementById('filter-category').value;
    const skill = document.getElementById('filter-skill').value;

    const query = `?branch=${encodeURIComponent(branch)}&category=${encodeURIComponent(category)}&knownSkills=${encodeURIComponent(skill)}`;
    await this.fetchRoadmaps(query);
    
    document.getElementById('roadmaps-cards-grid').innerHTML = this.renderRoadmapCards();
  },

  /**
   * Opens Personalization Modal to ask for learning time duration & daily study hours
   */
  openPersonalizationModal(slug) {
    const r = this.roadmaps.find(item => item.slug === slug) || this.selectedRoadmap;
    if (!r) return;

    const modal = document.getElementById('modal-root');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
        <div>
          <span class="badge badge-primary" style="margin-bottom: 0.3rem;">Personalized Learning</span>
          <h3>${r.title}</h3>
        </div>
        <button class="btn btn-outline btn-sm" onclick="app.closeModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.5rem;">
        Pathfolio will dynamically prioritize essential modules and schedule topics to match your exact timeline.
      </p>

      <form onsubmit="RoadmapsView.handlePersonalizationSubmit(event, '${r.slug}')">
        
        <!-- 1. Learning Duration -->
        <div class="form-group">
          <label class="form-label"><i class="fa-solid fa-calendar-days"></i> How much time do you have to learn?</label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.6rem; margin-top: 0.5rem;">
            <label class="time-option-label">
              <input type="radio" name="time-duration" value="2-weeks" data-weeks="2" data-label="2 Weeks (Crash Path)">
              <span>2 Weeks</span>
            </label>
            <label class="time-option-label">
              <input type="radio" name="time-duration" value="1-month" data-weeks="4" data-label="1 Month">
              <span>1 Month</span>
            </label>
            <label class="time-option-label">
              <input type="radio" name="time-duration" value="2-months" data-weeks="8" data-label="2 Months">
              <span>2 Months</span>
            </label>
            <label class="time-option-label">
              <input type="radio" name="time-duration" value="3-months" data-weeks="12" data-label="3 Months" checked>
              <span>3 Months</span>
            </label>
            <label class="time-option-label">
              <input type="radio" name="time-duration" value="6-months" data-weeks="24" data-label="6 Months">
              <span>6 Months</span>
            </label>
            <label class="time-option-label">
              <input type="radio" name="time-duration" value="1-year" data-weeks="52" data-label="1 Year">
              <span>1 Year</span>
            </label>
          </div>
        </div>

        <!-- 2. Daily Study Hours -->
        <div class="form-group" style="margin-top: 1.5rem;">
          <label class="form-label"><i class="fa-solid fa-clock"></i> How much time can you study per day?</label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.6rem; margin-top: 0.5rem;">
            <label class="time-option-label">
              <input type="radio" name="daily-hours" value="0.5" data-hpw="3.5" data-label="30 min/day">
              <span>30 min/day</span>
            </label>
            <label class="time-option-label">
              <input type="radio" name="daily-hours" value="1" data-hpw="7" data-label="1 hour/day">
              <span>1 hour/day</span>
            </label>
            <label class="time-option-label">
              <input type="radio" name="daily-hours" value="2" data-hpw="14" data-label="2 hours/day" checked>
              <span>2 hours/day</span>
            </label>
            <label class="time-option-label">
              <input type="radio" name="daily-hours" value="3" data-hpw="21" data-label="3+ hours/day">
              <span>3+ hours/day</span>
            </label>
          </div>
        </div>

        <style>
          .time-option-label {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 0.5rem;
            background-color: var(--bg-input);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            transition: var(--transition);
          }
          .time-option-label input { margin-right: 0.4rem; accent-color: var(--primary); }
          .time-option-label:hover { border-color: var(--primary); }
        </style>

        <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top: 2rem;" id="gen-path-btn">
          <i class="fa-solid fa-wand-magic-sparkles"></i> Create My Learning Path
        </button>
      </form>
    `;

    if (window.paperTransitions && typeof paperTransitions.openComponent === 'function') {
      paperTransitions.openComponent(body);
    }
    modal.classList.add('active');
  },

  async handlePersonalizationSubmit(e, roadmapSlug) {
    e.preventDefault();
    const btn = document.getElementById('gen-path-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculating Priority Schedule...';

    const selectedDurationRadio = document.querySelector('input[name="time-duration"]:checked');
    const selectedHoursRadio = document.querySelector('input[name="daily-hours"]:checked');

    const durationWeeks = Number(selectedDurationRadio.getAttribute('data-weeks')) || 12;
    const durationLabel = selectedDurationRadio.getAttribute('data-label') || '3 Months';
    
    const hoursPerWeek = Number(selectedHoursRadio.getAttribute('data-hpw')) || 14;
    const dailyHoursLabel = selectedHoursRadio.getAttribute('data-label') || '2 hours/day';

    try {
      const res = await API.request('/learning-plan/generate', {
        method: 'POST',
        body: JSON.stringify({
          roadmapSlug,
          durationLabel,
          durationWeeks,
          dailyHoursLabel,
          hoursPerWeek
        })
      });

      // Also update user profile active roadmap
      await API.request('/profile', {
        method: 'PUT',
        body: JSON.stringify({ activeRoadmapId: roadmapSlug })
      });

      app.closeModal();
      API.showToast(res.message);
      app.navigate('learning');
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Create My Learning Path';
    }
  }
};
