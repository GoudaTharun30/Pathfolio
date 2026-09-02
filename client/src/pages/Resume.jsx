/**
 * ATS Resume Builder Page
 */
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TemplateRenderers from '../utils/templateRenderers';
import Loading from '../components/Loading';

export const Resume = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('software-developer');
  const [fontStyle, setFontStyle] = useState('Inter, sans-serif');
  const [accentColor, setAccentColor] = useState('#1e293b');
  const [targetTitle, setTargetTitle] = useState('Full Stack Software Engineer');
  const [savedStatus, setSavedStatus] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.request('/profile').catch(() => ({}));
        setProfile(data || {});
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handlePrint = () => {
    const printContent = TemplateRenderers.renderResumeHTML(selectedTemplate, profile, {
      fontStyle,
      accentColor,
      targetTitle
    });

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Resume - ${profile.basicInfo?.fullName || 'Student'}</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
              body { margin: 0; padding: 20px; font-family: ${fontStyle}; background: #fff; }
              @media print {
                body { padding: 0; }
                .resume-doc { box-shadow: none !important; padding: 0 !important; }
              }
            </style>
          </head>
          <body>
            ${printContent}
            <script>
              window.onload = () => { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleSaveResume = async () => {
    setSavedStatus('');
    try {
      await api.request('/resumes', {
        method: 'POST',
        body: JSON.stringify({
          templateId: selectedTemplate,
          customConfig: { fontStyle, accentColor, targetTitle },
          profileData: profile
        })
      });
      setSavedStatus('Resume configuration saved successfully!');
      setTimeout(() => setSavedStatus(''), 4000);
    } catch (err) {
      setSavedStatus('Failed to save resume: ' + err.message);
    }
  };

  if (loading) {
    return <Loading message="Loading resume builder & profile data..." />;
  }

  const resumeHTML = TemplateRenderers.renderResumeHTML(selectedTemplate, profile, {
    fontStyle,
    accentColor,
    targetTitle
  });

  return (
    <div className="resume-builder-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: '0 0 0.35rem 0' }}>
            <i className="fa-solid fa-file-invoice" style={{ color: '#f59e0b', marginRight: '0.5rem' }}></i>
            ATS Resume Builder
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
            Automatically formatted for Applicant Tracking Systems using your saved profile data.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={handleSaveResume}>
            <i className="fa-solid fa-floppy-disk"></i> Save Configuration
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print / Download PDF
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
            <i className="fa-solid fa-sliders" style={{ color: 'var(--primary)', marginRight: '0.4rem' }}></i>
            Customization
          </h3>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Target Role Headline</label>
            <input
              type="text"
              className="form-control"
              value={targetTitle}
              onChange={(e) => setTargetTitle(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Resume Template</label>
            <select
              className="form-control"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              <option value="software-developer">Software Developer Standard</option>
              <option value="modern-minimal">Modern Minimal Clean</option>
              <option value="academic-engineer">Academic / Engineering Focus</option>
              <option value="executive-tech">Executive Technical Leader</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Typography / Font</label>
            <select
              className="form-control"
              value={fontStyle}
              onChange={(e) => setFontStyle(e.target.value)}
            >
              <option value="Inter, sans-serif">Inter (Modern & Clean)</option>
              <option value="'Roboto', sans-serif">Roboto (Standard)</option>
              <option value="'Georgia', serif">Georgia (Executive Serif)</option>
              <option value="'Courier New', monospace">Courier (Code & Technical)</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Accent Heading Color</label>
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
              <i className="fa-solid fa-lightbulb" style={{ color: 'var(--warning)', marginRight: '0.3rem' }}></i>
              ATS Optimization Tip:
            </strong>
            Ensure your profile contains exact keywords matching the job description to achieve a high ATS match score.
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="card" style={{ padding: '2rem', background: '#f8fafc', overflowX: 'auto' }}>
          <div dangerouslySetInnerHTML={{ __html: resumeHTML }} />
        </div>

      </div>

    </div>
  );
};

export default Resume;
