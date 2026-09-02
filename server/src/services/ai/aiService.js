const env = require('../../config/environment');
const geminiProvider = require('./geminiProvider');
const openaiProvider = require('./openaiProvider');
const mockProvider = require('./mockProvider');

const getActiveProvider = () => {
  const providerType = (env.AI_PROVIDER || 'gemini').toLowerCase();

  if (providerType === 'openai' && env.OPENAI_API_KEY) {
    return { name: 'openai', provider: openaiProvider };
  }
  
  if (providerType === 'gemini' && env.GEMINI_API_KEY) {
    return { name: 'gemini', provider: geminiProvider };
  }

  // If specified key is missing or fallback requested, use Mock Intelligent Provider
  return { name: 'mock', provider: mockProvider };
};

const chat = async (userPrompt, userContext) => {
  const { name, provider } = getActiveProvider();
  try {
    return await provider.chat(userPrompt, userContext);
  } catch (err) {
    console.warn(`[AI Service] ${name} provider failed: ${err.message}. Falling back to mock provider.`);
    return await mockProvider.chat(userPrompt, userContext);
  }
};

const generatePortfolioConfig = async (description) => {
  const { name, provider } = getActiveProvider();
  try {
    return await provider.generatePortfolioConfig(description);
  } catch (err) {
    console.warn(`[AI Service] ${name} provider failed: ${err.message}. Falling back to mock provider.`);
    return await mockProvider.generatePortfolioConfig(description);
  }
};

const generateResumeConfig = async (description) => {
  const { name, provider } = getActiveProvider();
  try {
    return await provider.generateResumeConfig(description);
  } catch (err) {
    console.warn(`[AI Service] ${name} provider failed: ${err.message}. Falling back to mock provider.`);
    return await mockProvider.generateResumeConfig(description);
  }
};

module.exports = {
  chat,
  generatePortfolioConfig,
  generateResumeConfig
};
