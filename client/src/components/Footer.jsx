/**
 * Public Footer Component for Pathfolio
 */
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
          <div>
            <div className="logo" style="margin-bottom: 0.75rem;">
              <i className="fa-solid fa-compass"></i> Pathfolio<span>.</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
              The student-focused career development and portfolio platform built to guide engineering students toward job-ready skills.
            </p>
          </div>

          <div>
            <h4 style="color: var(--text-main); margin-bottom: 1rem; font-size: 1rem;">Career Roadmaps</h4>
            <ul style="list-style: none; padding: 0; font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><Link to="/roadmaps/frontend-developer" style="color: var(--text-muted);">Frontend Developer</Link></li>
              <li><Link to="/roadmaps/backend-developer" style="color: var(--text-muted);">Backend Developer</Link></li>
              <li><Link to="/roadmaps/fullstack-developer" style="color: var(--text-muted);">Full Stack Developer</Link></li>
              <li><Link to="/roadmaps/devops-engineer" style="color: var(--text-muted);">DevOps Engineer</Link></li>
              <li><Link to="/roadmaps/data-scientist" style="color: var(--text-muted);">Data Scientist</Link></li>
            </ul>
          </div>

          <div>
            <h4 style="color: var(--text-main); margin-bottom: 1rem; font-size: 1rem;">Student Tools</h4>
            <ul style="list-style: none; padding: 0; font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><Link to="/resume" style="color: var(--text-muted);">ATS Resume Builder</Link></li>
              <li><Link to="/portfolio" style="color: var(--text-muted);">Portfolio Builder</Link></li>
              <li><Link to="/learning" style="color: var(--text-muted);">Learning Planner</Link></li>
              <li><Link to="/projects" style="color: var(--text-muted);">Project Recommendations</Link></li>
            </ul>
          </div>

          <div>
            <h4 style="color: var(--text-main); margin-bottom: 1rem; font-size: 1rem;">Navigation</h4>
            <ul style="list-style: none; padding: 0; font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li><Link to="/" style="color: var(--text-muted);">Home</Link></li>
              <li><Link to="/about" style="color: var(--text-muted);">About Pathfolio</Link></li>
              <li><Link to="/faq" style="color: var(--text-muted);">FAQ</Link></li>
              <li><Link to="/login" style="color: var(--text-muted);">Login</Link></li>
            </ul>
          </div>
        </div>

        <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem; text-align: center; color: var(--text-subtle); font-size: 0.85rem;">
          &copy; {new Date().getFullYear()} Pathfolio. Built for engineering students.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
