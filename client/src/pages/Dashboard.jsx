/**
 * Authenticated Student Dashboard Page
 */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Loading from '../components/Loading';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [profileData, pathsData] = await Promise.all([
          api.request('/profile').catch(() => ({})),
          api.request('/learning-plan/paths').catch(() => ([]))
        ]);
        setProfile(profileData || {});
        setPaths(pathsData || []);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loading message="Loading your dashboard overview..." />;
  }

  const activePath = paths.find(p => p.isActive) || paths[0] || {};
  const userName = profile?.basicInfo?.fullName || user?.name || 'Developer';
  const activeRoadmap = activePath.roadmapTitle || 'Full Stack Developer';
  const learningProgress = activePath.progress || 0;

  const skillsCount = (profile?.skills || []).length;
  const projectsCount = (profile?.projects || []).length;

  // Calculate profile completion percentage
  let profileScore = 0;
  if (profile?.basicInfo?.fullName) profileScore += 20;
  if (profile?.education?.length) profileScore += 20;
  if (profile?.skills?.length) profileScore += 20;
  if (profile?.experience?.length || profile?.projects?.length) profileScore += 20;
  if (profile?.links?.github || profile?.links?.linkedin) profileScore += 20;

  return (
    <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <h2 style={{ fontSize: '1.6rem', color: '#fff', margin: '0 0 0.35rem 0' }}>
            Welcome back, {userName}! 👋
          </h2>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>
            Active Career Path: <strong style={{ color: '#a5b4fc' }}><i className="fa-solid fa-compass" style={{ marginRight: '0.3rem' }}></i>{activeRoadmap}</strong>
            {activePath.durationLabel && (
              <span className="badge badge-primary" style={{ marginLeft: '0.6rem' }}>{activePath.durationLabel}</span>
            )}
          </p>
        </div>
        <div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/learning')}>
            <i className="fa-solid fa-play"></i> Continue Learning
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span>Roadmap Progress</span>
            <i className="fa-solid fa-chart-line" style={{ color: 'var(--primary)' }}></i>
          </div>
          <div className="metric-value">{learningProgress}%</div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${learningProgress}%` }}></div>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            {activePath.roadmapSlug ? `Active: ${activeRoadmap}` : 'Select a roadmap to begin'}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Verified Skills</span>
            <i className="fa-solid fa-code" style={{ color: 'var(--secondary)' }}></i>
          </div>
          <div className="metric-value">{skillsCount}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
            Saved in your profile
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Projects Completed</span>
            <i className="fa-solid fa-diagram-project" style={{ color: 'var(--success)' }}></i>
          </div>
          <div className="metric-value">{projectsCount}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
            Linked to resume & portfolio
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>Profile Completion</span>
            <i className="fa-solid fa-user-check" style={{ color: 'var(--warning)' }}></i>
          </div>
          <div className="metric-value">{profileScore}%</div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${profileScore}%`, background: 'var(--warning)' }}></div>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Used to auto-populate builders
          </div>
        </div>
      </div>

      {/* Quick Actions Shortcuts */}
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: 'var(--text-main)' }}>
          <i className="fa-solid fa-bolt" style={{ color: 'var(--primary)', marginRight: '0.4rem' }}></i>
          Quick Actions
        </h3>
        <div className="quick-actions-grid">
          <button className="btn btn-secondary" onClick={() => navigate('/profile')}>
            <i className="fa-solid fa-user-pen" style={{ color: 'var(--primary)' }}></i> Edit Profile
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/roadmaps')}>
            <i className="fa-solid fa-map-location-dot" style={{ color: 'var(--secondary)' }}></i> Explore Roadmaps
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/learning')}>
            <i className="fa-solid fa-list-check" style={{ color: 'var(--success)' }}></i> Learning Planner
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/projects')}>
            <i className="fa-solid fa-rocket" style={{ color: '#c084fc' }}></i> Recommended Projects
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/resume')}>
            <i className="fa-solid fa-file-invoice" style={{ color: '#f59e0b' }}></i> Resume Builder
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/portfolio')}>
            <i className="fa-solid fa-laptop-code" style={{ color: '#0ea5e9' }}></i> Portfolio Builder
          </button>
        </div>
      </div>

      {/* Featured Career Roadmaps Strip */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.25rem 0', color: 'var(--text-main)' }}>
              Explore Top Engineering Roadmaps
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
              Follow curved interactive journeys tailored to your branch and career goals.
            </p>
          </div>
          <Link to="/roadmaps" className="btn btn-outline btn-sm">
            View All 17 &rarr;
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {[
            { slug: 'frontend-developer', title: 'Frontend Developer', branch: 'CSE • IT • ECE', icon: 'fa-solid fa-code' },
            { slug: 'backend-developer', title: 'Backend Developer', branch: 'CSE • IT • ECE • EEE', icon: 'fa-solid fa-server' },
            { slug: 'fullstack-developer', title: 'Full Stack Developer', branch: 'All Branches', icon: 'fa-solid fa-layer-group' },
            { slug: 'devops-engineer', title: 'DevOps Engineer', branch: 'CSE • IT • ECE', icon: 'fa-solid fa-infinity' }
          ].map(r => (
            <div
              key={r.slug}
              className="card"
              style={{
                background: 'var(--bg-input)',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onClick={() => navigate(`/roadmaps/${r.slug}`)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <i className={r.icon} style={{ color: 'var(--primary)', fontSize: '1.25rem' }}></i>
                <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{r.title}</strong>
              </div>
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>{r.branch}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
