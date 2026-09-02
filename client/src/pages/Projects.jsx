/**
 * 5-Project Recommendation Page for Technical Roadmaps
 */
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import roadmapService from '../services/roadmapService';
import Loading from '../components/Loading';

export const Projects = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmapSlug, setSelectedRoadmapSlug] = useState('frontend-developer');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [currentRoadmap, setCurrentRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedMessage, setAddedMessage] = useState('');

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const list = await roadmapService.getRoadmaps();
        setRoadmaps(list || []);
      } catch (err) {
        console.error('Error fetching roadmaps:', err);
      }
    };
    fetchRoadmaps();
  }, []);

  useEffect(() => {
    const fetchRoadmapProjects = async () => {
      setLoading(true);
      try {
        const data = await roadmapService.getRoadmapBySlug(selectedRoadmapSlug);
        setCurrentRoadmap(data);
      } catch (err) {
        console.error('Error loading roadmap projects:', err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedRoadmapSlug) {
      fetchRoadmapProjects();
    }
  }, [selectedRoadmapSlug]);

  const projects = currentRoadmap?.projects || [];
  const filteredProjects = selectedDifficulty === 'all'
    ? projects
    : projects.filter(p => p.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase());

  const handleAddProjectToProfile = async (project) => {
    setAddedMessage('');
    try {
      const profileData = await api.request('/profile').catch(() => ({}));
      const existingProjects = profileData.projects || [];
      const updatedProjects = [
        ...existingProjects,
        {
          title: project.title,
          description: project.description,
          technologies: project.technologies || [],
          githubUrl: ''
        }
      ];

      await api.request('/profile', {
        method: 'POST',
        body: JSON.stringify({ ...profileData, projects: updatedProjects })
      });

      setAddedMessage(`"${project.title}" was added to your Profile & Resume!`);
      setTimeout(() => setAddedMessage(''), 4000);
    } catch (err) {
      setAddedMessage('Failed to add project to profile: ' + err.message);
    }
  };

  return (
    <div className="projects-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Title */}
      <div>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: '0 0 0.35rem 0' }}>
          <i className="fa-solid fa-rocket" style={{ color: '#c084fc', marginRight: '0.5rem' }}></i>
          Recommended Portfolio Projects
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
          Master your chosen career path by building 5 skill-matched projects (2 Easy, 2 Medium, 1 Hard) designed for student resumes.
        </p>
      </div>

      {addedMessage && (
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
          <span>{addedMessage}</span>
        </div>
      )}

      {/* Filter Controls */}
      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Select Career Track</label>
            <select
              className="form-control"
              value={selectedRoadmapSlug}
              onChange={(e) => setSelectedRoadmapSlug(e.target.value)}
            >
              {roadmaps.map(r => (
                <option key={r.slug || r.id} value={r.slug || r.id}>
                  {r.title} ({r.category})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Filter by Difficulty</label>
            <select
              className="form-control"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="all">All Difficulties (5 Projects)</option>
              <option value="easy">Easy Foundation Projects</option>
              <option value="medium">Medium Skill-Builder Projects</option>
              <option value="hard">Hard Capstone / Portfolio Projects</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects List */}
      {loading ? (
        <Loading message="Loading project specifications..." />
      ) : filteredProjects.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>No projects matching the selected difficulty.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {filteredProjects.map((project, idx) => {
            const diff = (project.difficulty || 'Easy').toLowerCase();
            const badgeColor = diff === 'easy' ? 'badge-success' : diff === 'medium' ? 'badge-primary' : 'badge-warning';

            return (
              <div key={idx} className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span className={`badge ${badgeColor}`} style={{ textTransform: 'capitalize' }}>
                        {project.difficulty} Project #{idx + 1}
                      </span>
                      {project.estimatedTime && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <i className="fa-solid fa-clock" style={{ marginRight: '0.25rem' }}></i> {project.estimatedTime}
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>
                      {project.title}
                    </h3>
                  </div>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleAddProjectToProfile(project)}
                  >
                    <i className="fa-solid fa-plus"></i> Add to My Profile & Resume
                  </button>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {project.description}
                </p>

                {project.whyBuildIt && (
                  <div style={{ background: 'var(--bg-input)', padding: '0.85rem 1.1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--primary)' }}><i className="fa-solid fa-bullseye" style={{ marginRight: '0.3rem' }}></i> Why Build It: </strong>
                    {project.whyBuildIt}
                  </div>
                )}

                {/* Tech Stack & Features */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <strong style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      Technologies:
                    </strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {(project.technologies || ['React', 'Node.js', 'Git']).map((t, tIdx) => (
                        <span key={tIdx} className="badge badge-primary">{t}</span>
                      ))}
                    </div>
                  </div>

                  {project.features && project.features.length > 0 && (
                    <div>
                      <strong style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                        Core Features:
                      </strong>
                      <ul style={{ paddingLeft: '1.1rem', margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {project.features.map((f, fIdx) => (
                          <li key={fIdx}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* 9-Step Roadmap */}
                {project.developmentSteps && project.developmentSteps.length > 0 && (
                  <details style={{ marginTop: '0.5rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
                    <summary style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 600, fontSize: '0.88rem' }}>
                      <i className="fa-solid fa-list-ol" style={{ marginRight: '0.4rem' }}></i>
                      View Step-by-Step Implementation Guide (9 Steps)
                    </summary>
                    <ol style={{ paddingLeft: '1.25rem', marginTop: '0.75rem', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                      {project.developmentSteps.map((step, sIdx) => (
                        <li key={sIdx}>{step}</li>
                      ))}
                    </ol>
                  </details>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default Projects;
