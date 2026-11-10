import React from 'react';

export const PaperSidebar = ({ activeRoute = 'dashboard', onNavigate, onLogout, onToggleTheme }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-house' },
    { id: 'profile', label: 'My Profile', icon: 'fa-user-gear' },
    { id: 'roadmaps', label: 'Career Roadmaps', icon: 'fa-map-location-dot' },
    { id: 'learning', label: 'Learning Planner', icon: 'fa-list-check' },
    { id: 'projects', label: 'Recommended Projects', icon: 'fa-rocket' },
    { id: 'resume', label: 'Resume Builder', icon: 'fa-file-invoice' },
    { id: 'portfolio', label: 'Portfolio Builder', icon: 'fa-laptop-code' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <a href="#dashboard" className="logo" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}>
          <i className="fa-solid fa-compass"></i> Pathfolio<span>.</span>
        </a>
      </div>
      <ul className="sidebar-menu">
        {navItems.map(item => (
          <li key={item.id} className={`sidebar-item ${activeRoute === item.id ? 'active' : ''}`}>
            <a href={`#${item.id}`} onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}>
              <i className={`fa-solid ${item.icon}`}></i> {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <button className="btn btn-secondary btn-block btn-sm" onClick={onToggleTheme} style={{ marginBottom: '0.5rem' }}>
          <i className="fa-solid fa-palette"></i> Customize Theme
        </button>
        <button className="btn btn-outline btn-block btn-sm" onClick={onLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </button>
      </div>
    </aside>
  );
};

export default PaperSidebar;

