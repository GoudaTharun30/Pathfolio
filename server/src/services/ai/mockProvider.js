/**
 * Fallback Intelligent Mock AI Provider
 * Provides high-quality career advice and safe structured JSON design configurations out-of-the-box.
 */

const generateCareerChatResponse = (userPrompt, userContext) => {
  const promptLower = userPrompt.toLowerCase();
  const name = userContext?.fullName || 'friend';
  const role = userContext?.activeRoadmapTitle || 'Software Engineer';
  const skills = userContext?.skills?.length ? userContext.skills.join(', ') : 'JavaScript, HTML, CSS';

  if (promptLower.includes('next') || promptLower.includes('learn') || promptLower.includes('what should i')) {
    return `Hi ${name}! Based on your current roadmap (**${role}**) and your skills in **${skills}**, here is your personalized next step:

1. **Master Core Fundamentals**: Strengthen your depth in asynchronous programming and REST APIs.
2. **Build a Key Project**: Check your **Project Recommendations** tab for a project like an Authentication System or Full-Stack Dashboard.
3. **Practice DSA**: Solve 2-3 array and string manipulation problems daily to prepare for technical interviews.
4. **Update Portfolio**: Keep your latest projects updated in your **Portfolio Builder**!`;
  }

  if (promptLower.includes('resume') || promptLower.includes('cv')) {
    return `To make your **${role}** resume stand out:
- Quantify your achievements in projects (e.g., "Improved response time by 40%").
- Highlight key technologies (**${skills}**) in a dedicated Skills section.
- Use our **Resume Builder** to export a clean, ATS-optimized software developer resume!`;
  }

  if (promptLower.includes('interview') || promptLower.includes('prepare')) {
    return `For technical interviews in **${role}**:
1. Focus on core concepts: Data Structures, System Architecture, and Object-Oriented Principles.
2. Be prepared to explain your project architecture and trade-offs.
3. Check the **Learning Planner** for dedicated Interview Preparation checklists!`;
  }

  return `Great question! As you progress along the **${role}** path with skills like **${skills}**, keep focusing on hands-on project building and structured learning. Let me know if you need specific guidance on roadmaps, resume building, or project ideas!`;
};

const generatePortfolioConfig = (description) => {
  const desc = description.toLowerCase();
  const theme = desc.includes('light') ? 'light' : desc.includes('minimal') ? 'minimal' : 'dark';
  const layout = desc.includes('grid') ? 'grid' : desc.includes('sidebar') ? 'sidebar' : 'modern';
  const accentColor = desc.includes('purple') ? '#8b5cf6' : desc.includes('green') ? '#10b981' : desc.includes('blue') ? '#3b82f6' : '#6366f1';

  return {
    theme: theme,
    layout: layout,
    accentColor: accentColor,
    typography: 'Outfit, Inter, sans-serif',
    showHeroSection: true,
    showSkillsSection: true,
    showProjectsSection: true,
    showExperienceSection: !desc.includes('simple'),
    showEducationSection: true,
    showContactSection: true,
    customHeroHeadline: `Passionate Developer building high-impact web applications.`,
    customBioSnippet: `Creating scalable web experiences with clean code and modern architecture.`
  };
};

const generateResumeConfig = (description) => {
  const desc = description.toLowerCase();
  const template = desc.includes('classic') ? 'classic' : desc.includes('minimal') ? 'minimal' : 'software-developer';

  return {
    templateId: template,
    focusArea: desc.includes('backend') ? 'Backend Development' : desc.includes('frontend') ? 'Frontend Development' : 'Full Stack Engineering',
    fontStyle: 'Inter, Arial, sans-serif',
    accentColor: '#1e293b',
    spacing: 'compact',
    sectionsOrder: ['summary', 'skills', 'projects', 'experience', 'education']
  };
};

module.exports = {
  chat: async (userPrompt, userContext) => generateCareerChatResponse(userPrompt, userContext),
  generatePortfolioConfig: async (description) => generatePortfolioConfig(description),
  generateResumeConfig: async (description) => generateResumeConfig(description)
};
