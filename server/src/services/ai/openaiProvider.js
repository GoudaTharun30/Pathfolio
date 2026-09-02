const env = require('../../config/environment');

const callOpenAiApi = async (messages) => {
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured in environment.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
};

module.exports = {
  chat: async (userPrompt, userContext) => {
    const messages = [
      {
        role: 'system',
        content: `You are Pathfolio AI, a career advisor for software engineers. User context: ${JSON.stringify(userContext || {})}`
      },
      { role: 'user', content: userPrompt }
    ];
    return await callOpenAiApi(messages);
  },

  generatePortfolioConfig: async (description) => {
    const messages = [
      {
        role: 'system',
        content: 'You return ONLY JSON objects representing portfolio design configuration.'
      },
      {
        role: 'user',
        content: `User description: "${description}". Shape: {"theme":"dark","layout":"modern","accentColor":"#6366f1","typography":"Outfit, sans-serif","showHeroSection":true,"showSkillsSection":true,"showProjectsSection":true,"showExperienceSection":true,"showEducationSection":true,"showContactSection":true,"customHeroHeadline":"Full Stack Software Developer","customBioSnippet":"Building robust scalable apps"}`
      }
    ];
    const res = await callOpenAiApi(messages);
    const clean = res.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
  },

  generateResumeConfig: async (description) => {
    const messages = [
      {
        role: 'system',
        content: 'You return ONLY JSON objects representing resume configuration.'
      },
      {
        role: 'user',
        content: `User description: "${description}". Shape: {"templateId":"software-developer","focusArea":"Backend Development","fontStyle":"Inter, sans-serif","accentColor":"#1e293b","spacing":"compact"}`
      }
    ];
    const res = await callOpenAiApi(messages);
    const clean = res.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
  }
};
