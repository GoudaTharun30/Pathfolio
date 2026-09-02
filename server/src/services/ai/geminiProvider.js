const env = require('../../config/environment');

const callGeminiApi = async (prompt) => {
  if (!env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured in environment.');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || '';
};

module.exports = {
  chat: async (userPrompt, userContext) => {
    const contextPrompt = `You are Pathfolio AI, an expert career mentor for software developers.
User Details:
Name: ${userContext?.fullName || 'User'}
Active Career Path: ${userContext?.activeRoadmapTitle || 'Full Stack Developer'}
Skills: ${(userContext?.skills || []).join(', ')}

User Question: ${userPrompt}

Provide concise, friendly, practical advice formatted in Markdown.`;

    return await callGeminiApi(contextPrompt);
  },

  generatePortfolioConfig: async (description) => {
    const prompt = `Convert this portfolio design description into a valid JSON object matching this exact shape:
{
  "theme": "dark" | "light" | "minimal",
  "layout": "modern" | "grid" | "sidebar",
  "accentColor": "#hexcode",
  "typography": "Inter, sans-serif",
  "showHeroSection": true,
  "showSkillsSection": true,
  "showProjectsSection": true,
  "showExperienceSection": true,
  "showEducationSection": true,
  "showContactSection": true,
  "customHeroHeadline": "string",
  "customBioSnippet": "string"
}
User Description: "${description}"
Return ONLY valid raw JSON without markdown formatting backticks.`;

    const res = await callGeminiApi(prompt);
    const clean = res.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
  },

  generateResumeConfig: async (description) => {
    const prompt = `Convert this resume style request into a valid JSON object:
{
  "templateId": "software-developer" | "classic" | "minimal" | "modern" | "professional",
  "focusArea": "string",
  "fontStyle": "string",
  "accentColor": "#hexcode",
  "spacing": "compact" | "normal"
}
User Request: "${description}"
Return ONLY valid raw JSON without markdown formatting backticks.`;

    const res = await callGeminiApi(prompt);
    const clean = res.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
  }
};
