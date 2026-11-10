/**
 * Upgraded Interactive Career Roadmap Visual Route Map View
 * Single reusable component rendering dynamic serpentine/winding visual route for ANY career roadmap (/roadmaps/:slug)
 */
const RoadmapDetailView = {
  roadmap: null,
  activeUserPath: null,
  userCompletedTopicIds: new Set(),

  async render(slug) {
    if (!slug) {
      slug = 'frontend-developer';
    }

    try {
      // 1. Fetch roadmap details
      this.roadmap = await API.request(`/roadmaps/${slug}`);
    } catch (e) {
      return `
        <div class="card" style="text-align: center; padding: 4rem;">
          <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: var(--warning); margin-bottom: 1rem;"></i>
          <h2>Roadmap Not Found</h2>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem;">The career roadmap you are looking for does not exist or has been moved.</p>
          <button class="btn btn-primary" onclick="app.navigate('roadmaps')">
            <i class="fa-solid fa-arrow-left"></i> Back to Roadmaps
          </button>
        </div>
      `;
    }

    // 2. Fetch user's active learning paths to get completion status
    try {
      const paths = await API.request('/learning-plan/paths');
      if (paths && paths.length) {
        this.activeUserPath = paths.find(p => p.roadmapSlug === slug && p.isActive) || paths.find(p => p.roadmapSlug === slug) || paths[0];
        
        this.userCompletedTopicIds = new Set();
        if (this.activeUserPath?.weeks) {
          this.activeUserPath.weeks.forEach(w => {
            w.topics.forEach(t => {
              if (t.isCompleted) {
                this.userCompletedTopicIds.add(t.topicId);
              }
            });
          });
        }
      }
    } catch (e) {
      this.activeUserPath = null;
      this.userCompletedTopicIds = new Set();
    }

    // Extract all topics from levels
    const allTopics = [];
    (this.roadmap.levels || []).forEach(lvl => {
      (lvl.topics || []).forEach(top => {
        allTopics.push({ ...top, levelTitle: lvl.title, levelNum: lvl.level });
      });
    });

    const totalTopicsCount = allTopics.length;
    const completedCount = allTopics.filter(t => this.userCompletedTopicIds.has(t.id)).length;
    const progressPercent = totalTopicsCount > 0 ? Math.round((completedCount / totalTopicsCount) * 100) : 0;

    return `
      <!-- Navigation Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <button class="btn btn-outline btn-sm" onclick="app.navigate('roadmaps')">
          <i class="fa-solid fa-arrow-left"></i> Back to Career Roadmaps
        </button>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-secondary btn-sm" onclick="ProjectsView.selectedRoadmap = { slug: '${this.roadmap.slug}' }; app.navigate('projects');">
            <i class="fa-solid fa-folder-open"></i> View Recommended Projects
          </button>
          <button class="btn btn-primary btn-sm" onclick="RoadmapsView.openPersonalizationModal('${this.roadmap.slug}')">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Start Personalized Learning Path
          </button>
        </div>
      </div>

      <!-- Roadmap Header Banner Card -->
      <div class="card" style="margin-bottom: 2rem; border-color: var(--primary); background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(15, 23, 42, 0.9));">
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.4rem;">
              <span class="badge badge-primary">${this.roadmap.category}</span>
              <span class="badge badge-success"><i class="fa-solid fa-graduation-cap"></i> Suitable: ${(this.roadmap.branches || []).join(' • ')}</span>
              <span class="badge badge-secondary"><i class="fa-solid fa-clock"></i> Est. 4–6 Months</span>
            </div>
            <h1 style="font-size: 1.8rem; margin-bottom: 0.3rem;">${this.roadmap.title}</h1>
            <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 800px;">Your step-by-step visual learning journey from core engineering fundamentals to job-ready career skills.</p>
          </div>
          
          <!-- Progress Widget -->
          <div style="background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem 1.25rem; min-width: 240px; text-align: center;">
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem;">
              <span>Your Roadmap Progress</span>
              <span style="color: var(--primary);">${progressPercent}%</span>
            </div>
            <div class="progress-bar-container" style="height: 10px; margin-bottom: 0.4rem;">
              <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">
              ${completedCount} of ${totalTopicsCount} Skills Completed
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; align-items: center; border-top: 1px solid var(--border-color); padding-top: 0.85rem; margin-top: 0.5rem;">
          <strong style="font-size: 0.8rem; color: var(--text-subtle);">KEY SKILLS:</strong>
          ${(this.roadmap.requiredSkills || []).map(sk => `<span class="badge">${sk}</span>`).join('')}
        </div>
      </div>

      <!-- Main Visual Winding Route Map Container -->
      <div class="card" style="position: relative; padding: 2.5rem 1.5rem; overflow: hidden; background: var(--bg-card); border-radius: var(--radius-lg);">
        
        <div style="text-align: center; margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.4rem; color: var(--text-main); margin-bottom: 0.3rem;">
            <i class="fa-solid fa-route" style="color: var(--primary);"></i> Interactive Career Learning Journey
          </h2>
          <p style="font-size: 0.9rem; color: var(--text-muted);">
            Follow the winding learning path from Start to Career Ready. Hover over nodes for skill details, or click to view topics and mark as complete.
          </p>
        </div>

        <!-- Serpentine Visual Route Engine -->
        <div class="route-map-wrapper" id="route-map-wrapper">
          ${this.renderVisualSerpentineRoute(allTopics)}
        </div>

      </div>

      <style>
        .route-map-wrapper {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 1rem 0;
        }

        .route-node-row {
          display: flex;
          align-items: center;
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 2;
        }
        
        .route-node-row.align-left { justify-content: flex-start; padding-left: 5%; }
        .route-node-row.align-center { justify-content: center; }
        .route-node-row.align-right { justify-content: flex-end; padding-right: 5%; }

        .route-node-card {
          position: relative;
          background: var(--bg-input);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.85rem 1.25rem;
          min-width: 240px;
          max-width: 320px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .route-node-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: var(--primary);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.25);
        }

        .route-node-card.completed {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }

        .route-node-card.current {
          border-color: #6366f1;
          background: rgba(99, 102, 241, 0.18);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
          animation: pulseCurrent 2s infinite alternate;
        }

        @keyframes pulseCurrent {
          0% { box-shadow: 0 0 10px rgba(99, 102, 241, 0.3); }
          100% { box-shadow: 0 0 25px rgba(99, 102, 241, 0.7); }
        }

        .level-header-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2rem 0;
          position: relative;
          z-index: 2;
        }

        .level-header-badge {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: #fff;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.4rem 1.2rem;
          border-radius: 20px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }

        /* SVG Winding Path Overlay */
        .svg-route-connector {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .animated-stroke {
          stroke-dasharray: 8 8;
          animation: dashMove 20s linear infinite;
        }

        @keyframes dashMove {
          to { stroke-dashoffset: -100; }
        }

        @media (max-width: 768px) {
          .route-node-row.align-left,
          .route-node-row.align-right {
            justify-content: center;
            padding: 0;
          }
          .route-node-card {
            max-width: 100%;
            width: 100%;
          }
        }
      </style>
    `;
  },

  renderVisualSerpentineRoute(allTopics) {
    let currentLevelNum = null;
    let nextNodeOrder = 1;
    let firstUncompletedFound = false;

    let itemsHtml = '';

    // 1. START NODE
    itemsHtml += `
      <div class="route-node-row align-center">
        <div class="route-node-card" style="background: linear-gradient(135deg, #1e293b, #0f172a); border-color: var(--primary); text-align: center;">
          <div style="font-size: 1.5rem; color: var(--primary); margin-bottom: 0.3rem;"><i class="fa-solid fa-flag-checkered"></i></div>
          <strong style="font-size: 1.1rem; color: #fff;">START JOURNEY</strong>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Engineering Fundamentals</div>
        </div>
      </div>
    `;

    // 2. Iterate through levels & topics
    (this.roadmap.levels || []).forEach((lvl) => {
      // Level Header Divider
      itemsHtml += `
        <div class="level-header-divider">
          <div class="level-header-badge">
            <i class="fa-solid fa-layer-group"></i> Level ${lvl.level}: ${lvl.title}
          </div>
        </div>
      `;

      // Topics under this level
      (lvl.topics || []).forEach((top, idx) => {
        const isCompleted = this.userCompletedTopicIds.has(top.id);
        let isCurrent = false;
        
        if (!isCompleted && !firstUncompletedFound) {
          isCurrent = true;
          firstUncompletedFound = true;
        }

        // Serpentine alignment alternating: left, center, right, center
        const alignClass = idx % 2 === 0 ? 'align-left' : 'align-right';
        const cardStatusClass = isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming';

        itemsHtml += `
          <div class="route-node-row ${alignClass}">
            <div class="route-node-card ${cardStatusClass}" 
                 onclick="RoadmapDetailView.openTopicModal('${top.id}', '${top.title}', '${top.importance}', '${top.difficulty}', ${top.estimatedHours})"
                 title="Click for topic details & study steps">
              
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                <span class="badge ${top.importance === 'essential' ? 'badge-primary' : 'badge-success'}" style="font-size: 0.7rem;">
                  ${top.importance}
                </span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">
                  <i class="fa-solid fa-clock"></i> ~${top.estimatedHours || 4}h
                </span>
              </div>

              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <div style="font-size: 1.2rem;">
                  ${isCompleted 
                    ? '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i>' 
                    : isCurrent 
                    ? '<i class="fa-solid fa-circle-dot" style="color: #6366f1;"></i>' 
                    : '<i class="fa-regular fa-circle" style="color: var(--text-subtle);"></i>'}
                </div>
                <div>
                  <strong style="font-size: 0.95rem; color: var(--text-main); font-weight: 600;">${top.title}</strong>
                  ${isCurrent ? '<span class="badge badge-primary" style="font-size: 0.65rem; margin-left: 0.3rem;">YOU ARE HERE</span>' : ''}
                </div>
              </div>

              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem; display: flex; justify-content: space-between;">
                <span>Level: ${top.difficulty || 'beginner'}</span>
                <span style="color: var(--primary);">Click for Details <i class="fa-solid fa-angle-right"></i></span>
              </div>

            </div>
          </div>
        `;
        nextNodeOrder++;
      });
    });

    // 3. PROJECT MILESTONE NODE
    itemsHtml += `
      <div class="level-header-divider">
        <div class="level-header-badge" style="background: linear-gradient(135deg, #a855f7, #ec4899);">
          <i class="fa-solid fa-rocket"></i> PROJECT MILESTONE
        </div>
      </div>

      <div class="route-node-row align-center">
        <div class="route-node-card" style="border-color: #a855f7; background: rgba(168, 85, 247, 0.1); text-align: center;"
             onclick="ProjectsView.selectedRoadmap = { slug: '${this.roadmap.slug}' }; app.navigate('projects');">
          <div style="font-size: 1.5rem; color: #c084fc; margin-bottom: 0.3rem;"><i class="fa-solid fa-diagram-project"></i></div>
          <strong style="font-size: 1.1rem; color: #fff;">Build 5 Recommended Projects</strong>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">2 Easy Practice • 2 Medium Skill • 1 Hard Portfolio Project</p>
          <span class="badge badge-primary" style="margin-top: 0.5rem;">Open Project Recommendations <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    `;

    // 4. INTERVIEW PREPARATION MILESTONE
    itemsHtml += `
      <div class="level-header-divider">
        <div class="level-header-badge" style="background: linear-gradient(135deg, #f59e0b, #ef4444);">
          <i class="fa-solid fa-user-tie"></i> INTERVIEW PREPARATION
        </div>
      </div>

      <div class="route-node-row align-center">
        <div class="route-node-card" style="border-color: #f59e0b; background: rgba(245, 158, 11, 0.1); text-align: center;"
             onclick="RoadmapDetailView.openInterviewModal()">
          <div style="font-size: 1.5rem; color: #fbbf24; margin-bottom: 0.3rem;"><i class="fa-solid fa-clipboard-question"></i></div>
          <strong style="font-size: 1.1rem; color: #fff;">Career Interview Preparation</strong>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">Core Technical Questions, DSA & System Design Focus</p>
          <span class="badge badge-warning" style="margin-top: 0.5rem; color: #000;">View Interview Questions <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    `;

    // 5. CAREER READY FINAL DESTINATION
    itemsHtml += `
      <div class="route-node-row align-center" style="margin-top: 3rem;">
        <div class="route-node-card" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(15, 23, 42, 0.95)); border: 2px solid #10b981; text-align: center; padding: 1.5rem;">
          <div style="font-size: 2.2rem; color: #34d399; margin-bottom: 0.4rem;"><i class="fa-solid fa-trophy"></i></div>
          <strong style="font-size: 1.3rem; color: #6ee7b7;">★ CAREER READY ★</strong>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.4rem; max-width: 260px;">
            You are fully equipped to apply for <strong>${this.roadmap.title}</strong> engineering roles!
          </p>
          <div style="margin-top: 1rem;">
            <button class="btn btn-success btn-sm" onclick="app.navigate('resume')">
              <i class="fa-solid fa-file-invoice"></i> Build Resume
            </button>
          </div>
        </div>
      </div>
    `;

    return itemsHtml;
  },

  /**
   * Opens Course/Skill Topic Modal
   */
  openTopicModal(id, title, importance, difficulty, estimatedHours) {
    const isCompleted = this.userCompletedTopicIds.has(id);
    const modal = document.getElementById('modal-root');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.85rem;">
        <div>
          <span class="badge ${importance === 'essential' ? 'badge-primary' : 'badge-success'}" style="margin-bottom: 0.3rem;">${importance} Module</span>
          <h2>${title}</h2>
        </div>
        <button class="btn btn-outline btn-sm" onclick="app.closeModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="color: var(--text-main); margin-bottom: 0.4rem;">Why Learn ${title}?</h4>
        <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1rem;">
          This module is a critical skill for the <strong>${this.roadmap.title}</strong> career roadmap. Mastering it prepares you for real-world engineering projects and technical interview assessments.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.85rem; margin-bottom: 1.25rem;">
          <div class="card" style="background: var(--bg-input); padding: 0.85rem;">
            <span style="font-size: 0.8rem; color: var(--text-subtle); display: block;">ESTIMATED TIME:</span>
            <strong style="font-size: 1rem; color: var(--primary);"><i class="fa-solid fa-clock"></i> ~${estimatedHours || 4} Hours</strong>
          </div>
          <div class="card" style="background: var(--bg-input); padding: 0.85rem;">
            <span style="font-size: 0.8rem; color: var(--text-subtle); display: block;">DIFFICULTY:</span>
            <strong style="font-size: 1rem; color: var(--success);"><i class="fa-solid fa-chart-line"></i> ${difficulty || 'beginner'}</strong>
          </div>
        </div>

        <h4 style="color: var(--text-main); margin-bottom: 0.5rem;"><i class="fa-solid fa-list-check" style="color: var(--primary);"></i> Key Concepts Covered:</h4>
        <ul style="padding-left: 1.25rem; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem;">
          <li style="margin-bottom: 0.3rem;">Core Syntax, Principles & Best Practices</li>
          <li style="margin-bottom: 0.3rem;">Practical Hands-on Exercises & Code Snippets</li>
          <li style="margin-bottom: 0.3rem;">Integration with Upstream & Downstream Modules</li>
          <li style="margin-bottom: 0.3rem;">Debugging & Optimization Techniques</li>
        </ul>
      </div>

      <div style="display: flex; gap: 0.75rem;">
        <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} btn-block btn-lg" 
                onclick="RoadmapDetailView.toggleTopicCompletion('${id}', '${this.roadmap.slug}')">
          <i class="fa-solid ${isCompleted ? 'fa-xmark' : 'fa-check'}"></i> ${isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
      </div>
    `;

    if (window.paperTransitions && typeof paperTransitions.openComponent === 'function') {
      paperTransitions.openComponent(modalBody);
    }
    modal.classList.add('active');
  },

  async toggleTopicCompletion(topicId, slug) {
    app.closeModal();
    try {
      if (this.activeUserPath) {
        const res = await API.request(`/learning-plan/paths/${this.activeUserPath._id}/topic-toggle`, {
          method: 'PATCH',
          body: JSON.stringify({ topicId })
        });
        API.showToast(res.message);
      } else {
        // Automatically create user path if none active yet
        const genRes = await API.request('/learning-plan/generate', {
          method: 'POST',
          body: JSON.stringify({
            roadmapSlug: slug,
            durationLabel: '3 Months',
            durationWeeks: 12,
            dailyHoursLabel: '2 hours/day',
            hoursPerWeek: 14
          })
        });

        // Toggle topic in newly generated path
        const res = await API.request(`/learning-plan/paths/${genRes.path._id}/topic-toggle`, {
          method: 'PATCH',
          body: JSON.stringify({ topicId })
        });
        API.showToast(res.message);
      }

      // Re-render route details view to update live progress
      await app.renderCurrentView();
    } catch (e) {
      // Handled
    }
  },

  /**
   * Opens Interview Preparation Modal
   */
  openInterviewModal() {
    const modal = document.getElementById('modal-root');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.85rem;">
        <div>
          <span class="badge badge-warning" style="margin-bottom: 0.3rem; color: #000;">Career Readiness</span>
          <h2>${this.roadmap.title} Interview Preparation</h2>
        </div>
        <button class="btn btn-outline btn-sm" onclick="app.closeModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="color: var(--text-main); margin-bottom: 0.75rem;"><i class="fa-solid fa-circle-question" style="color: var(--warning);"></i> Core Interview Focus Questions</h4>
        <ul style="padding-left: 1.25rem; font-size: 0.95rem; color: var(--text-main); margin-bottom: 1.5rem;">
          ${(this.roadmap.interviewPreparation || [
            'Explain core architecture trade-offs and design patterns',
            'What are the key performance bottlenecks and how do you optimize them?',
            'Walk through a challenging project you built and how you handled bugs'
          ]).map(q => `<li style="margin-bottom: 0.6rem;">${q}</li>`).join('')}
        </ul>

        <h4 style="color: var(--text-main); margin-bottom: 0.75rem;"><i class="fa-solid fa-book-open" style="color: var(--primary);"></i> Recommended Study Resources</h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${(this.roadmap.recommendedResources || [
            { title: 'Official Documentation & Guides', type: 'Docs', url: '#' },
            { title: 'System Architecture & Problem Solving', type: 'Course', url: '#' }
          ]).map(r => `
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-input); padding: 0.6rem 0.85rem; border-radius: var(--radius-sm);">
              <div>
                <strong style="font-size: 0.9rem;">${r.title}</strong>
                <span class="badge badge-primary" style="margin-left: 0.4rem;">${r.type}</span>
              </div>
              <a href="${r.url || '#'}" target="_blank" class="btn btn-outline btn-sm">Explore <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="display: flex; gap: 0.75rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
        <button class="btn btn-primary btn-block btn-lg" onclick="app.closeModal(); app.navigate('resume');">
          <i class="fa-solid fa-file-invoice"></i> Build Resume with Verified Skills
        </button>
      </div>
    `;

    if (window.paperTransitions && typeof paperTransitions.openComponent === 'function') {
      paperTransitions.openComponent(modalBody);
    }
    modal.classList.add('active');
  }
};
