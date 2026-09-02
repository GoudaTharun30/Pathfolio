/**
 * Public Home / Landing Page
 */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="hero-badge">
            <i className="fa-solid fa-wand-magic-sparkles"></i> Connected Student Career Ecosystem
          </div>
          <h1 className="hero-title">
            Build Your Career.<br />
            <span>Build Your Path.</span>
          </h1>
          <p className="hero-subtitle">
            Create your portfolio, build your resume, explore career roadmaps, complete projects, and get AI-powered career guidance — all in one place.
          </p>
          <div className="hero-ctas">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                <i className="fa-solid fa-house"></i> Go to Dashboard
              </Link>
            ) : (
              <Link to="/signup" className="btn btn-primary btn-lg">
                <i className="fa-solid fa-rocket"></i> Get Started Free
              </Link>
            )}
            <Link to="/roadmaps" className="btn btn-secondary btn-lg">
              <i className="fa-solid fa-compass"></i> Explore Roadmaps
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <h2>Everything You Need for Career Growth</h2>
            <p className="section-subtitle">
              A unified platform replacing fragmented tools for resume building, roadmaps, project recommendations, and career planning.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-route"></i></div>
              <h3>Career Roadmaps</h3>
              <p>Explore curved learning paths for Frontend, Backend, Full Stack, Data & AI, Cloud/DevOps, Embedded Systems, and VLSI.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-list-check"></i></div>
              <h3>Learning Planner</h3>
              <p>Turn career roadmaps into actionable week-by-week learning goals, track completion %, and prepare for placement interviews.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-laptop-code"></i></div>
              <h3>Project Recommendations</h3>
              <p>Get 5 skill-matched project specifications (2 Easy, 2 Medium, 1 Hard) designed to feature directly on your resume and portfolio.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-file-invoice"></i></div>
              <h3>ATS Resume Builder</h3>
              <p>Generate clean, ATS-optimized developer resumes automatically populated with your profile data and customizable styling.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-globe"></i></div>
              <h3>Portfolio Builder</h3>
              <p>Select modern portfolio templates, customize accent themes, live preview your projects, and export clean HTML code.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><i className="fa-solid fa-robot"></i></div>
              <h3>AI Career Assistant</h3>
              <p>Chat with a dedicated AI mentor aware of your active roadmap, completed skills, and goals for personalized guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How Pathfolio Works</h2>
            <p className="section-subtitle">Your step-by-step journey from learning fundamentals to landing your dream tech role.</p>
          </div>

          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <h4>Create Profile</h4>
              <p>Fill in your branch, skills, and academic background once.</p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h4>Choose Roadmap</h4>
              <p>Pick a specialized technical career path aligned with your branch.</p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h4>Follow Curved Journey</h4>
              <p>Master technical stages and track completed modules visually.</p>
            </div>
            <div className="step-item">
              <div className="step-number">4</div>
              <h4>Build Projects</h4>
              <p>Develop 5 tiered projects to prove your hands-on ability.</p>
            </div>
            <div className="step-item">
              <div className="step-number">5</div>
              <h4>Create Resume & Portfolio</h4>
              <p>Generate professional resumes and portfolios with one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <div className="card" style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(15, 23, 42, 0.95))',
            borderColor: 'var(--primary)',
            padding: '3.5rem 2rem'
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>
              Start Building Your Engineering Career Today
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
              Join students from CSE, IT, ECE, EEE, Mechanical, and Civil branches creating resumes, portfolios, and following structured roadmaps.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/signup" className="btn btn-primary btn-lg">
                <i className="fa-solid fa-user-plus"></i> Create Free Account
              </Link>
              <Link to="/roadmaps" className="btn btn-secondary btn-lg">
                <i className="fa-solid fa-map-location-dot"></i> Browse All 17 Roadmaps
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
