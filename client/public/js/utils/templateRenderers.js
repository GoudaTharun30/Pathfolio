/**
 * Template Renderers for Resume and Portfolio Preview & Export
 */

const TemplateRenderers = {
  renderResumeHTML(templateId = 'software-developer', profileData = {}, customConfig = {}) {
    const basic = profileData.basicInfo || {};
    const name = basic.fullName || 'Your Full Name';
    const email = basic.email || 'developer@example.com';
    const phone = basic.phone || '+1 (555) 000-0000';
    const location = basic.location || 'San Francisco, CA';
    const about = basic.aboutMe || 'Passionate engineer dedicated to building scalable systems.';

    const education = profileData.education || [];
    const skills = profileData.skills || ['JavaScript', 'HTML5', 'CSS3', 'Node.js', 'React'];
    const experience = profileData.experience || [];
    const projects = profileData.projects || [];
    const links = profileData.links || {};

    const fontStyle = customConfig.fontStyle || 'Inter, sans-serif';
    const accentColor = customConfig.accentColor || '#1e293b';

    return `
      <div class="resume-doc" style="font-family: ${fontStyle}; color: #1e293b;">
        <header class="resume-header" style="border-bottom: 2px solid ${accentColor};">
          <h1 style="color: ${accentColor}; margin: 0;">${name}</h1>
          <div class="resume-contact-line" style="margin-top: 0.5rem;">
            <span><i class="fa-solid fa-envelope"></i> ${email}</span>
            ${phone ? `<span><i class="fa-solid fa-phone"></i> ${phone}</span>` : ''}
            ${location ? `<span><i class="fa-solid fa-location-dot"></i> ${location}</span>` : ''}
            ${links.github ? `<span><i class="fa-brands fa-github"></i> ${links.github}</span>` : ''}
            ${links.linkedin ? `<span><i class="fa-brands fa-linkedin"></i> ${links.linkedin}</span>` : ''}
          </div>
        </header>

        <section class="resume-section">
          <h2 class="resume-section-title" style="color: ${accentColor}; border-bottom-color: ${accentColor};">Professional Summary</h2>
          <p style="font-size: 0.95rem; color: #334155;">${about}</p>
        </section>

        <section class="resume-section">
          <h2 class="resume-section-title" style="color: ${accentColor}; border-bottom-color: ${accentColor};">Technical Skills</h2>
          <div class="skill-tags-flex">
            ${skills.map(sk => `<span class="skill-tag-item">${sk}</span>`).join('')}
          </div>
        </section>

        ${projects.length ? `
          <section class="resume-section">
            <h2 class="resume-section-title" style="color: ${accentColor}; border-bottom-color: ${accentColor};">Featured Projects</h2>
            ${projects.map(p => `
              <div class="resume-item">
                <div class="resume-item-header">
                  <span>${p.name} ${p.role ? `(${p.role})` : ''}</span>
                  <span style="font-size: 0.85rem; color: #64748b;">${(p.technologies || []).join(', ')}</span>
                </div>
                <div class="resume-item-sub">${p.description}</div>
                ${p.githubUrl ? `<div style="font-size: 0.8rem; color: #475569;">GitHub: ${p.githubUrl}</div>` : ''}
              </div>
            `).join('')}
          </section>
        ` : ''}

        ${experience.length ? `
          <section class="resume-section">
            <h2 class="resume-section-title" style="color: ${accentColor}; border-bottom-color: ${accentColor};">Work Experience</h2>
            ${experience.map(exp => `
              <div class="resume-item">
                <div class="resume-item-header">
                  <span>${exp.role} — ${exp.company}</span>
                  <span style="font-size: 0.85rem; color: #64748b;">${exp.startDate} - ${exp.endDate || 'Present'}</span>
                </div>
                <div class="resume-item-sub">${exp.description}</div>
              </div>
            `).join('')}
          </section>
        ` : ''}

        ${education.length ? `
          <section class="resume-section">
            <h2 class="resume-section-title" style="color: ${accentColor}; border-bottom-color: ${accentColor};">Education</h2>
            ${education.map(edu => `
              <div class="resume-item">
                <div class="resume-item-header">
                  <span>${edu.degree} ${edu.branch ? `in ${edu.branch}` : ''}</span>
                  <span style="font-size: 0.85rem; color: #64748b;">${edu.startYear} - ${edu.endYear}</span>
                </div>
                <div class="resume-item-sub">${edu.institution} ${edu.cgpa ? `| CGPA/Score: ${edu.cgpa}` : ''}</div>
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
    const theme = customConfig.theme || 'dark';
    const accent = customConfig.accentColor || '#6366f1';
    
    const skills = profileData.skills || ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'];
    const projects = profileData.projects || [];
    const links = profileData.links || {};

    const bgColor = theme === 'dark' ? '#0f172a' : theme === 'minimal' ? '#fafafa' : '#ffffff';
    const textColor = theme === 'dark' ? '#f8fafc' : '#1e293b';
    const cardBg = theme === 'dark' ? '#1e293b' : '#ffffff';

    return `
      <div class="portfolio-doc" style="background-color: ${bgColor}; color: ${textColor}; padding: 2rem; border-radius: 12px; font-family: Outfit, sans-serif;">
        <header style="text-align: center; padding: 2.5rem 1rem; background: linear-gradient(135deg, ${accent}22, transparent); border-radius: 12px; margin-bottom: 2rem;">
          <h1 style="font-size: 2.5rem; color: ${textColor}; margin-bottom: 0.5rem;">${name}</h1>
          <p style="font-size: 1.15rem; color: ${accent}; font-weight: 600; max-width: 650px; margin: 0 auto 1.5rem;">${headline}</p>
          <div style="display: flex; justify-content: center; gap: 1rem;">
            ${links.github ? `<a href="${links.github}" target="_blank" style="color: ${accent}; font-size: 1.25rem;"><i class="fa-brands fa-github"></i></a>` : ''}
            ${links.linkedin ? `<a href="${links.linkedin}" target="_blank" style="color: ${accent}; font-size: 1.25rem;"><i class="fa-brands fa-linkedin"></i></a>` : ''}
            ${basic.email ? `<a href="mailto:${basic.email}" style="color: ${accent}; font-size: 1.25rem;"><i class="fa-solid fa-envelope"></i></a>` : ''}
          </div>
        </header>

        ${customConfig.showSkillsSection !== false ? `
          <section style="margin-bottom: 2.5rem;">
            <h2 style="font-size: 1.5rem; color: ${textColor}; border-left: 4px solid ${accent}; padding-left: 0.75rem; margin-bottom: 1rem;">Technical Toolkit</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${skills.map(sk => `
                <span style="background: ${cardBg}; border: 1px solid ${accent}44; padding: 0.4rem 0.85rem; border-radius: 20px; font-size: 0.875rem; color: ${textColor}; font-weight: 500;">
                  ${sk}
                </span>
              `).join('')}
            </div>
          </section>
        ` : ''}

        ${customConfig.showProjectsSection !== false ? `
          <section style="margin-bottom: 2.5rem;">
            <h2 style="font-size: 1.5rem; color: ${textColor}; border-left: 4px solid ${accent}; padding-left: 0.75rem; margin-bottom: 1rem;">Featured Projects</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.25rem;">
              ${projects.length ? projects.map(p => `
                <div style="background: ${cardBg}; border: 1px solid ${accent}33; border-radius: 10px; padding: 1.25rem; display: flex; flex-direction: column;">
                  <h3 style="font-size: 1.15rem; color: ${textColor}; margin-bottom: 0.5rem;">${p.name}</h3>
                  <p style="font-size: 0.875rem; color: ${theme === 'dark' ? '#94a3b8' : '#64748b'}; margin-bottom: 1rem; flex: 1;">${p.description}</p>
                  <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1rem;">
                    ${(p.technologies || []).map(t => `<span style="font-size: 0.75rem; background: ${accent}15; color: ${accent}; padding: 0.15rem 0.5rem; border-radius: 4px;">${t}</span>`).join('')}
                  </div>
                  ${p.githubUrl ? `<a href="${p.githubUrl}" style="color: ${accent}; font-size: 0.85rem; font-weight: 600;"><i class="fa-brands fa-github"></i> View Code</a>` : ''}
                </div>
              `).join('') : `
                <div style="color: ${theme === 'dark' ? '#94a3b8' : '#64748b'}; font-style: italic;">No projects added to profile yet. Mark recommended projects completed to feature them here!</div>
              `}
            </div>
          </section>
        ` : ''}
      </div>
    `;
  }
};
