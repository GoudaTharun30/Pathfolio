/**
 * Floating AI Career Mentor & Reality Check Chatbot Component
 */
import React, { useState, useRef, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const FloatingAi = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hi! I am your AI Career Mentor. Ask me anything about engineering roadmaps, skills to learn, resume optimization, or interview tips!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isAuthenticated) return null;

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const data = await api.request('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ prompt: userMessage })
      });

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: data.reply || 'I am here to guide your career path! Keep following your roadmap and completing hands-on projects.'
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Career Guidance: Focus on mastering fundamentals, building 5 solid portfolio projects, and practicing DSA problem solving for technical interviews.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="floating-ai-container">
      <button
        className="floating-ai-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="Ask Pathfolio AI Assistant"
        aria-label="Toggle AI Career Mentor"
      >
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-robot'}`}></i>
      </button>

      {isOpen && (
        <div className="ai-chat-window" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="ai-chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fa-solid fa-robot" style={{ color: 'var(--primary)' }}></i>
              <strong>Pathfolio AI Mentor</strong>
            </div>
            <button
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="ai-chat-messages" style={{ flex: 1, overflowY: 'auto' }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`chat-bubble ${m.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble chat-bubble-ai" style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                <i className="fa-solid fa-spinner fa-spin"></i> Generating personalized advice...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSend} className="ai-chat-input-area" style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Ask career question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="btn btn-primary btn-sm" disabled={loading || !input.trim()}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FloatingAi;
