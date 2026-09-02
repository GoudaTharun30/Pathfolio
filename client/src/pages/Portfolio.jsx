/**
 * Personal Portfolio Builder Page
 */
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TemplateRenderers from '../utils/templateRenderers';
import Loading from '../components/Loading';

export const Portfolio = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('#6366f1');
  const [customHeroHeadline, setCustomHeroHeadline] = useState('');
  const [savedStatus, setSavedStatus] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.request('/profile').catch(() => ({}));
        setProfile(data || {});
        if (data?.basicInfo?.aboutMe) {
          setCustomHeroHeadline(data.basicInfo.aboutMe);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleDownloadHTML = () => {
    const portfolioContent = TemplateRenderers.renderPortfolioHTML('developer', profile, {
      theme,
      accentColor,
      customHeroHeadline
    });

    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${profile.basicInfo?.fullName || 'Developer'} - Portfolio</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Inter', sans-serif; background: ${theme === 'light' ? '#f8fafc' : '#0f172a'}; color: ${theme === 'light' ? '#0f172a' : '#f8fafc'}; }
          </style>
        </head>
        <body>
          ${portfolioContent}
        </body>
      </html>
    `;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${(profile.basicInfo?.fullName || 'student').toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSavePortfolio = async () => {
    setSavedStatus('');
    try {
      await api.request('/portfolios', {
        method: 'POST',
        body: JSON.stringify({
          templateId: 'developer',
          customConfig: { theme, accentColor, customHeroHeadline },
          profileData: profile
        })
      });
      setSavedStatus('Portfolio configuration saved successfully!');
      setTimeout(() => setSavedStatus(''), 4000);
    } catch (err) {
      setSavedStatus('Failed to save portfolio: ' + err.message);
    }
  };

  if (loading) {
    return <Loading message="Loading portfolio builder..." />;
  }

  const portfolioHTML = TemplateRenderers.renderPortfolioHTML('developer', profile, {
    theme,
    accentColor,
    customHeroHeadline
  });

  return (
    <div className="portfolio-builder-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: '0 0 0.35rem 0' }}>
            <i className="fa-solid fa-laptop-code" style={{ color: '#0ea5e9', marginRight: '0.5rem' }}></i>
            Personal Portfolio Builder
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
            Generate a modern personal portfolio website to showcase your skills and featured projects.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={handleSavePortfolio}>
            <i className="fa-solid fa-floppy-disk"></i> Save Configuration
          </button>
          <button className="btn btn-primary" onClick={handleDownloadHTML}>
            <i className="fa-solid fa-download"></i> Export HTML Website
          </button>
        </div>
      </div>

      {savedStatus && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid var(--success)',
          color: '#6ee7b7',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <i className="fa-solid fa-circle-check"></i>
          <span>{savedStatus}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Controls Column */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: 0 }}>
            <i className="fa-solid fa-palette" style={{ color: 'var(--primary)', marginRight: '0.4rem' }}></i>
            Theme & Styling
          </h3>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Hero Headline Bio</label>
            <textarea
              className="form-control"
              rows="3"
              value={customHeroHeadline}
              onChange={(e) => setCustomHeroHeadline(e.target.value)}
              placeholder="Full Stack Software Engineer specializing in React, Node.js, and cloud systems..."
            ></textarea>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Theme Mode</label>
            <select
              className="form-control"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="dark">Dark Theme (Modern Sleek)</option>
              <option value="light">Light Theme (Minimalist Clean)</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Accent Brand Color</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                style={{ width: '40px', height: '36px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{accentColor}</span>
            </div>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.3rem' }}>
              <i className="fa-solid fa-circle-info" style={{ color: 'var(--primary)', marginRight: '0.3rem' }}></i>
              Hosting Tip:
            </strong>
            You can export this HTML file and host it free on GitHub Pages, Netlify, or Vercel.
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ background: '#1e293b', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #334155' }}>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginLeft: '0.5rem' }}>Live Portfolio Preview</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: portfolioHTML }} />
        </div>

      </div>

    </div>
  );
};

export default Portfolio;
