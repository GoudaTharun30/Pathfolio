/**
 * Template Renderers for Resume and Portfolio Preview & Export
 */

export const TemplateRenderers = {
  renderResumeHTML(templateId = 'software-developer', profileData = {}, customConfig = {}) {
    const basic = profileData.basicInfo || {};
    const name = basic.fullName || 'Your Full Name';
    const email = basic.email || 'developer@example.com';
    const phone = basic.phone || '+1 (555) 000-0000';
    const location = basic.location || 'San Francisco, CA';
    const about = basic.aboutMe || 'Passionate engineer dedicated to building scalable software systems.';

    const education = profileData.education || [];
    const skills = profileData.skills || ['JavaScript', 'HTML5', 'CSS3', 'Node.js', 'React'];
    const experience = profileData.experience || [];
    const projects = profileData.projects || [];
    const links = profileData.links || {};

    const fontStyle = customConfig.fontStyle || 'Inter, sans-serif';
    const accentColor = customConfig.accentColor || '#1e293b';

    return `
      <div class="resume-doc" style="font-family: ${fontStyle}; color: #1e293b; background: #ffffff; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); max-width: 800px; margin: 0 auto;">
        <header class="resume-header" style="border-bottom: 2px solid ${accentColor}; padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <h1 style="color: ${accentColor}; margin: 0; font-size: 2rem; font-weight: 700;">${name}</h1>
          <div class="resume-contact-line" style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.85rem; color: #64748b;">
            <span><i class="fa-solid fa-envelope"></i> ${email}</span>
            ${phone ? `<span><i class="fa-solid fa-phone"></i> ${phone}</span>` : ''}
            ${location ? `<span><i class="fa-solid fa-location-dot"></i> ${location}</span>` : ''}
            ${links.github ? `<span><i class="fa-brands fa-github"></i> ${links.github}</span>` : ''}
            ${links.linkedin ? `<span><i class="fa-brands fa-linkedin"></i> ${links.linkedin}</span>` : ''}
          </div>
        </header>

        <section class="resume-section" style="margin-bottom: 1.5rem;">
          <h2 class="resume-section-title" style="color: ${accentColor}; font-size: 1.1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3rem; margin-bottom: 0.5rem;">Professional Summary</h2>
          <p style="font-size: 0.95rem; color: #334155; line-height: 1.6;">${about}</p>
        </section>

        <section class="resume-section" style="margin-bottom: 1.5rem;">
          <h2 class="resume-section-title" style="color: ${accentColor}; font-size: 1.1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3rem; margin-bottom: 0.5rem;">Technical Skills</h2>
          <div class="skill-tags-flex" style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            ${skills.map(sk => `<span class="skill-tag-item" style="background: #f1f5f9; color: #1e293b; padding: 0.25rem 0.6rem; border-radius: 4px; font-size: 0.8rem; font-weight: 500;">${sk}</span>`).join('')}
          </div>
        </section>

        ${projects.length ? `
          <section class="resume-section" style="margin-bottom: 1.5rem;">
            <h2 class="resume-section-title" style="color: ${accentColor}; font-size: 1.1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3rem; margin-bottom: 0.5rem;">Featured Projects</h2>
            ${projects.map(p => `
              <div class="resume-item" style="margin-bottom: 1rem;">
                <div class="resume-item-header" style="display: flex; justify-content: space-between; align-items: baseline; font-weight: 600; color: #0f172a;">
                  <span>${p.name || p.title} ${p.role ? `(${p.role})` : ''}</span>
                  <span style="font-size: 0.8rem; color: #64748b; font-weight: normal;">${(p.technologies || []).join(', ')}</span>
                </div>
                <div class="resume-item-sub" style="font-size: 0.9rem; color: #475569; margin-top: 0.2rem;">${p.description}</div>
                ${p.githubUrl ? `<div style="font-size: 0.8rem; color: #6366f1; margin-top: 0.2rem;">Link: ${p.githubUrl}</div>` : ''}
              </div>
            `).join('')}
          </section>
        ` : ''}

        ${experience.length ? `
          <section class="resume-section" style="margin-bottom: 1.5rem;">
            <h2 class="resume-section-title" style="color: ${accentColor}; font-size: 1.1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3rem; margin-bottom: 0.5rem;">Work Experience</h2>
            ${experience.map(exp => `
              <div class="resume-item" style="margin-bottom: 1rem;">
                <div class="resume-item-header" style="display: flex; justify-content: space-between; align-items: baseline; font-weight: 600; color: #0f172a;">
                  <span>${exp.role} — ${exp.company}</span>
                  <span style="font-size: 0.8rem; color: #64748b; font-weight: normal;">${exp.startDate} - ${exp.endDate || 'Present'}</span>
                </div>
                <div class="resume-item-sub" style="font-size: 0.9rem; color: #475569; margin-top: 0.2rem;">${exp.description}</div>
              </div>
            `).join('')}
          </section>
        ` : ''}

        ${education.length ? `
          <section class="resume-section">
            <h2 class="resume-section-title" style="color: ${accentColor}; font-size: 1.1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3rem; margin-bottom: 0.5rem;">Education</h2>
            ${education.map(edu => `
              <div class="resume-item" style="margin-bottom: 0.8rem;">
                <div class="resume-item-header" style="display: flex; justify-content: space-between; align-items: baseline; font-weight: 600; color: #0f172a;">
                  <span>${edu.degree} ${edu.branch ? `in ${edu.branch}` : ''}</span>
                  <span style="font-size: 0.8rem; color: #64748b; font-weight: normal;">${edu.startYear} - ${edu.endYear}</span>
                </div>
                <div class="resume-item-sub" style="font-size: 0.9rem; color: #475569; margin-top: 0.2rem;">${edu.institution} ${edu.cgpa ? `| CGPA: ${edu.cgpa}` : ''}</div>
              </div>
            `).join('')}
          </section>
        ` : ''}
      </div>
    `;
  },

  renderPortfolioHTML(templateId = 'developer', profileData = {}, customConfig = {}) {
    const basic = profileData.basicInfo || {};
    const name = basic.fullName || 'Alex Rivers';
    const headline = customConfig.customHeroHeadline || basic.aboutMe || 'Full Stack Software Engineer & Solution Architect';
    const skills = profileData.skills || ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Python', 'Docker'];
    const projects = profileData.projects || [];
    const links = profileData.links || {};

    const themeBg = customConfig.theme === 'light' ? '#ffffff' : '#0f172a';
    const textColor = customConfig.theme === 'light' ? '#0f172a' : '#f8fafc';
    const cardBg = customConfig.theme === 'light' ? '#f8fafc' : '#1e293b';
    const accent = customConfig.accentColor || '#6366f1';

    return `
      <div class="portfolio-preview-wrapper" style="background: ${themeBg}; color: ${textColor}; padding: 3rem 1.5rem; font-family: Inter, sans-serif; min-height: 100%;">
        <!-- Hero -->
        <div style="text-align: center; max-width: 800px; margin: 0 auto 3.5rem auto;">
          <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, ${accent}, #ec4899); color: #fff; font-size: 2rem; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; box-shadow: 0 8px 24px rgba(99,102,241,0.3);">
            ${name.charAt(0)}
          </div>
          <h1 style="font-size: 2.4rem; font-weight: 800; margin-bottom: 0.75rem; letter-spacing: -0.02em;">${name}</h1>
          <p style="font-size: 1.15rem; color: #94a3b8; line-height: 1.6; margin-bottom: 1.5rem;">${headline}</p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            ${links.github ? `<a href="${links.github}" target="_blank" style="display: inline-flex; align-items: center; gap: 0.5rem; background: ${cardBg}; color: ${textColor}; padding: 0.5rem 1rem; border-radius: 8px; text-decoration: none; border: 1px solid #334155;"><i class="fa-brands fa-github"></i> GitHub</a>` : ''}
            ${links.linkedin ? `<a href="${links.linkedin}" target="_blank" style="display: inline-flex; align-items: center; gap: 0.5rem; background: ${cardBg}; color: ${textColor}; padding: 0.5rem 1rem; border-radius: 8px; text-decoration: none; border: 1px solid #334155;"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>` : ''}
            <a href="mailto:${basic.email || 'hello@example.com'}" style="display: inline-flex; align-items: center; gap: 0.5rem; background: ${accent}; color: #fff; padding: 0.5rem 1.25rem; border-radius: 8px; text-decoration: none; font-weight: 600;"><i class="fa-solid fa-envelope"></i> Get In Touch</a>
          </div>
        </div>

        <!-- Skills Grid -->
        <div style="max-width: 900px; margin: 0 auto 3.5rem auto;">
          <h2 style="font-size: 1.4rem; border-bottom: 2px solid ${accent}; padding-bottom: 0.5rem; margin-bottom: 1.5rem; display: inline-block;">Core Skills & Technologies</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            ${skills.map(sk => `<div style="background: ${cardBg}; border: 1px solid #334155; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem; color: #a5b4fc;"><i class="fa-solid fa-check" style="color: ${accent}; margin-right: 0.4rem;"></i>${sk}</div>`).join('')}
          </div>
        </div>

        <!-- Featured Projects -->
        <div style="max-width: 900px; margin: 0 auto;">
          <h2 style="font-size: 1.4rem; border-bottom: 2px solid ${accent}; padding-bottom: 0.5rem; margin-bottom: 1.5rem; display: inline-block;">Featured Projects</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            ${projects.length ? projects.map(p => `
              <div style="background: ${cardBg}; border: 1px solid #334155; border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: #fff;">${p.name || p.title}</h3>
                  <p style="font-size: 0.9rem; color: #94a3b8; line-height: 1.5; margin-bottom: 1rem;">${p.description}</p>
                </div>
                <div>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem;">
                    ${(p.technologies || []).map(t => `<span style="background: rgba(99,102,241,0.15); color: #a5b4fc; font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 4px;">${t}</span>`).join('')}
                  </div>
                  ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" style="color: ${accent}; font-size: 0.85rem; text-decoration: none; font-weight: 600;"><i class="fa-brands fa-github"></i> View Code &rarr;</a>` : ''}
                </div>
              </div>
            `).join('') : `
              <div style="background: ${cardBg}; border: 1px solid #334155; border-radius: 12px; padding: 2rem; text-align: center; grid-column: 1 / -1;">
                <p style="color: #94a3b8;">Complete projects from recommended roadmaps or your profile to feature them here.</p>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }
};

export default TemplateRenderers;
