/**
 * Student Profile Page
 * Central data source for both ATS Resume and Portfolio generation
 */
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Loading from '../components/Loading';

export const Profile = () => {
  const [profile, setProfile] = useState({
    basicInfo: {
      fullName: '',
      phone: '',
      location: '',
      branch: 'CSE',
      college: '',
      aboutMe: ''
    },
    education: [],
    skills: [],
    experience: [],
    projects: [],
    links: { github: '', linkedin: '', portfolio: '' }
  });

  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.request('/profile');
        if (data && Object.keys(data).length > 0) {
          setProfile({
            basicInfo: data.basicInfo || { fullName: '', phone: '', location: '', branch: 'CSE', college: '', aboutMe: '' },
            education: data.education || [],
            skills: data.skills || [],
            experience: data.experience || [],
            projects: data.projects || [],
            links: data.links || { github: '', linkedin: '', portfolio: '' }
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveStatus({ type: '', text: '' });

    try {
      await api.request('/profile', {
        method: 'POST',
        body: JSON.stringify(profile)
      });
      setSaveStatus({ type: 'success', text: 'Profile saved successfully! Ready for Resume & Portfolio.' });
      setTimeout(() => setSaveStatus({ type: '', text: '' }), 4000);
    } catch (err) {
      setSaveStatus({ type: 'danger', text: 'Failed to save profile: ' + err.message });
    } finally {
      setSaving(false);
    }
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    }
    setNewSkill('');
  };

  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { institution: '', degree: 'B.Tech', branch: 'Computer Science', startYear: '2022', endYear: '2026', cgpa: '8.5' }
      ]
    }));
  };

  const removeEducation = (index) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const updateEducation = (index, field, value) => {
    setProfile(prev => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  const addProject = () => {
    setProfile(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: '', description: '', technologies: [], githubUrl: '' }
      ]
    }));
  };

  const removeProject = (index) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const updateProject = (index, field, value) => {
    setProfile(prev => {
      const updated = [...prev.projects];
      if (field === 'technologies') {
        updated[index] = { ...updated[index], technologies: typeof value === 'string' ? value.split(',').map(s => s.trim()).filter(Boolean) : value };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, projects: updated };
    });
  };

  if (loading) {
    return <Loading message="Loading profile data..." />;
  }

  return (
    <div className="profile-container" style={{ maxWidth: '950px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: '0 0 0.35rem 0' }}>
            <i className="fa-solid fa-user-gear" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}></i>
            Student Profile
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
            Enter your background once. Pathfolio automatically auto-populates your ATS Resume and Portfolio website.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</> : <><i className="fa-solid fa-floppy-disk"></i> Save Profile</>}
        </button>
      </div>

      {saveStatus.text && (
        <div style={{
          background: saveStatus.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: `1px solid ${saveStatus.type === 'success' ? 'var(--success)' : 'var(--danger)'}`,
          color: saveStatus.type === 'success' ? '#6ee7b7' : '#fca5a5',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <i className={`fa-solid ${saveStatus.type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}`}></i>
          <span>{saveStatus.text}</span>
        </div>
      )}

      {/* 1. Basic Information */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-main)' }}>
          <i className="fa-solid fa-id-card" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}></i>
          Basic Information
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Alex Rivers"
              value={profile.basicInfo.fullName || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, basicInfo: { ...prev.basicInfo, fullName: e.target.value } }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="+1 (555) 000-0000"
              value={profile.basicInfo.phone || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, basicInfo: { ...prev.basicInfo, phone: e.target.value } }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location (City, Country)</label>
            <input
              type="text"
              className="form-control"
              placeholder="San Francisco, CA"
              value={profile.basicInfo.location || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, basicInfo: { ...prev.basicInfo, location: e.target.value } }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Primary Engineering Branch</label>
            <select
              className="form-control"
              value={profile.basicInfo.branch || 'CSE'}
              onChange={(e) => setProfile(prev => ({ ...prev, basicInfo: { ...prev.basicInfo, branch: e.target.value } }))}
            >
              <option value="CSE">CSE — Computer Science Engineering</option>
              <option value="IT">IT — Information Technology</option>
              <option value="ECE">ECE — Electronics & Communication</option>
              <option value="EEE">EEE — Electrical & Electronics</option>
              <option value="Mechanical">Mechanical Engineering</option>
              <option value="Civil">Civil Engineering</option>
            </select>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
          <label className="form-label">About Me / Professional Bio</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Passionate engineering student focused on building scalable web applications and distributed systems..."
            value={profile.basicInfo.aboutMe || ''}
            onChange={(e) => setProfile(prev => ({ ...prev, basicInfo: { ...prev.basicInfo, aboutMe: e.target.value } }))}
          ></textarea>
        </div>
      </div>

      {/* 2. Technical Skills */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
          <i className="fa-solid fa-code" style={{ color: 'var(--secondary)', marginRight: '0.5rem' }}></i>
          Technical Skills & Tools
        </h3>

        <form onSubmit={addSkill} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Add skill (e.g. React, Node.js, Python, Docker, Verilog)..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button type="submit" className="btn btn-secondary">
            <i className="fa-solid fa-plus"></i> Add
          </button>
        </form>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {profile.skills.map((skill, idx) => (
            <span
              key={idx}
              className="badge badge-primary"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {skill}
              <i
                className="fa-solid fa-xmark"
                style={{ cursor: 'pointer', opacity: 0.8 }}
                onClick={() => removeSkill(skill)}
              ></i>
            </span>
          ))}
          {profile.skills.length === 0 && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No skills added yet. Add your programming languages and frameworks above.</p>
          )}
        </div>
      </div>

      {/* 3. Education Section */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-main)' }}>
            <i className="fa-solid fa-graduation-cap" style={{ color: 'var(--success)', marginRight: '0.5rem' }}></i>
            Education History
          </h3>
          <button className="btn btn-secondary btn-sm" onClick={addEducation}>
            <i className="fa-solid fa-plus"></i> Add Education
          </button>
        </div>

        {profile.education.map((edu, idx) => (
          <div key={idx} className="card" style={{ background: 'var(--bg-input)', marginBottom: '1rem', padding: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <strong>Education #{idx + 1}</strong>
              <button className="btn btn-outline btn-sm" onClick={() => removeEducation(idx)} style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                <i className="fa-solid fa-trash"></i> Remove
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
              <div className="form-group">
                <label className="form-label">Institution / College Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="MIT / Stanford / University"
                  value={edu.institution || ''}
                  onChange={(e) => updateEducation(idx, 'institution', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Degree</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="B.Tech / B.E. / B.S."
                  value={edu.degree || ''}
                  onChange={(e) => updateEducation(idx, 'degree', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Branch / Major</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Computer Science"
                  value={edu.branch || ''}
                  onChange={(e) => updateEducation(idx, 'branch', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Graduation Year / CGPA</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="2026 (CGPA: 8.8)"
                  value={edu.cgpa ? `${edu.endYear || '2026'} | CGPA: ${edu.cgpa}` : (edu.endYear || '2026')}
                  onChange={(e) => updateEducation(idx, 'cgpa', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        {profile.education.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Click "Add Education" to list your college degrees.</p>
        )}
      </div>

      {/* 4. Projects Section */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-main)' }}>
            <i className="fa-solid fa-diagram-project" style={{ color: '#c084fc', marginRight: '0.5rem' }}></i>
            Featured Projects
          </h3>
          <button className="btn btn-secondary btn-sm" onClick={addProject}>
            <i className="fa-solid fa-plus"></i> Add Project
          </button>
        </div>

        {profile.projects.map((proj, idx) => (
          <div key={idx} className="card" style={{ background: 'var(--bg-input)', marginBottom: '1rem', padding: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <strong>Project #{idx + 1}</strong>
              <button className="btn btn-outline btn-sm" onClick={() => removeProject(idx)} style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                <i className="fa-solid fa-trash"></i> Remove
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Distributed Task Queue"
                  value={proj.title || proj.name || ''}
                  onChange={(e) => updateProject(idx, 'title', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Technologies (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="React, Node.js, Redis, Docker"
                  value={(proj.technologies || []).join(', ')}
                  onChange={(e) => updateProject(idx, 'technologies', e.target.value)}
                />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Description & Impact</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Engineered a resilient async task queue handling 5,000 tasks/min with Redis Pub/Sub..."
                  value={proj.description || ''}
                  onChange={(e) => updateProject(idx, 'description', e.target.value)}
                ></textarea>
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">GitHub Repository / Live Demo URL</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://github.com/username/project"
                  value={proj.githubUrl || ''}
                  onChange={(e) => updateProject(idx, 'githubUrl', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Social & Portfolio Links */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-main)' }}>
          <i className="fa-solid fa-link" style={{ color: '#f59e0b', marginRight: '0.5rem' }}></i>
          Social & Portfolio Links
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label"><i className="fa-brands fa-github"></i> GitHub URL</label>
            <input
              type="url"
              className="form-control"
              placeholder="https://github.com/yourhandle"
              value={profile.links?.github || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, links: { ...prev.links, github: e.target.value } }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label"><i className="fa-brands fa-linkedin"></i> LinkedIn URL</label>
            <input
              type="url"
              className="form-control"
              placeholder="https://linkedin.com/in/yourhandle"
              value={profile.links?.linkedin || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, links: { ...prev.links, linkedin: e.target.value } }))}
            />
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
        <button className="btn btn-primary btn-lg" onClick={handleSave} disabled={saving}>
          {saving ? <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</> : <><i className="fa-solid fa-floppy-disk"></i> Save Profile</>}
        </button>
      </div>

    </div>
  );
};

export default Profile;
