/**
 * Application Sidebar for Authenticated Users
 */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <NavLink to="/dashboard" className="logo" onClick={() => sidebarOpen && toggleSidebar?.()}>
          <i className="fa-solid fa-compass"></i> Pathfolio<span>.</span>
        </NavLink>
      </div>

      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => sidebarOpen && toggleSidebar?.()}>
            <i className="fa-solid fa-house"></i> Dashboard
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => sidebarOpen && toggleSidebar?.()}>
            <i className="fa-solid fa-user-gear"></i> My Profile
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/roadmaps" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => sidebarOpen && toggleSidebar?.()}>
            <i className="fa-solid fa-map-location-dot"></i> Career Roadmaps
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/learning" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => sidebarOpen && toggleSidebar?.()}>
            <i className="fa-solid fa-list-check"></i> Learning Planner
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => sidebarOpen && toggleSidebar?.()}>
            <i className="fa-solid fa-rocket"></i> Recommended Projects
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/resume" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => sidebarOpen && toggleSidebar?.()}>
            <i className="fa-solid fa-file-invoice"></i> Resume Builder
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/portfolio" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => sidebarOpen && toggleSidebar?.()}>
            <i className="fa-solid fa-laptop-code"></i> Portfolio Builder
          </NavLink>
        </li>
      </ul>

      <div className="sidebar-footer">
        <button className="btn btn-secondary btn-block btn-sm" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
