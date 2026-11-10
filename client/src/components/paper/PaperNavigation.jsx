import React from 'react';

export const PaperNavigation = ({ onNavigate, onSignIn, onSignUp, onToggleThemeMode, onTogglePaperTheme }) => {
  return (
    <header className="public-header">
      <div className="container nav-container">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>
          <i className="fa-solid fa-compass"></i> Pathfolio<span>.</span>
        </a>
        <ul className="nav-links">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }}>Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li>
            <button className="btn btn-secondary btn-sm" onClick={onTogglePaperTheme} title="Switch Theme">
              <i className="fa-solid fa-scroll"></i> Paper World
            </button>
          </li>
          <li>
            <button className="btn btn-secondary btn-sm" onClick={onToggleThemeMode} title="Toggle Light/Dark Mode">
              <i className="fa-solid fa-circle-half-stroke"></i>
            </button>
          </li>
          <li><button className="btn btn-outline btn-sm" onClick={onSignIn}>Login</button></li>
          <li><button className="btn btn-primary btn-sm btn-marker-blue" onClick={onSignUp}>Sign Up</button></li>
        </ul>
      </div>
    </header>
  );
};

export default PaperNavigation;

