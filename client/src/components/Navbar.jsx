/**
 * Public Navigation Bar for Pathfolio
 */
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrent = (path) => location.pathname === path;

  return (
    <header className="public-header">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <i className="fa-solid fa-compass"></i> Pathfolio<span>.</span>
        </Link>

        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" className={isCurrent('/') ? 'active' : ''} onClick={() => setMobileOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={isCurrent('/about') ? 'active' : ''} onClick={() => setMobileOpen(false)}>About</Link>
          </li>
          <li>
            <Link to="/roadmaps" className={isCurrent('/roadmaps') ? 'active' : ''} onClick={() => setMobileOpen(false)}>Roadmaps</Link>
          </li>
          <li>
            <Link to="/faq" className={isCurrent('/faq') ? 'active' : ''} onClick={() => setMobileOpen(false)}>FAQ</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" className="btn btn-secondary btn-sm" onClick={() => setMobileOpen(false)}>
                  <i className="fa-solid fa-house"></i> Dashboard
                </Link>
              </li>
              <li>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    logout();
                    navigate('/');
                    setMobileOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="btn btn-primary btn-sm" onClick={() => setMobileOpen(false)}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>

        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
          <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
