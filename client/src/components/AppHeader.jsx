/**
 * Authenticated App Shell Header Component
 */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AppHeader = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/roadmaps/')) return 'Career Roadmap Details';
    if (path === '/dashboard') return 'Dashboard Overview';
    if (path === '/profile') return 'My Profile';
    if (path === '/roadmaps') return 'Career Roadmaps Explorer';
    if (path === '/learning') return 'Learning Planner';
    if (path === '/projects') return 'Recommended Projects';
    if (path === '/resume') return 'ATS Resume Builder';
    if (path === '/portfolio') return 'Portfolio Builder';
    return 'Pathfolio';
  };

  const userName = user?.name || 'Developer';
  const initial = userName.charAt(0).toUpperCase();

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar Menu">
          <i className="fa-solid fa-bars"></i>
        </button>
        <span className="page-title">{getPageTitle()}</span>
      </div>

      <div className="header-right">
        <div className="user-profile-badge" onClick={() => navigate('/profile')} title="View & Edit Profile">
          <div className="user-avatar">{initial}</div>
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{userName}</span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
