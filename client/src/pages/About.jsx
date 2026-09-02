/**
 * About Pathfolio Page
 */
import React from 'react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem', maxWidth: '900px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>About Pathfolio</span>
        <h1 style={{ fontSize: '2.4rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          Empowering Engineering Students
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Pathfolio was created with a single mission: to help students from all engineering branches discover their career path, master industry-required technologies, build real projects, and showcase their work professionally.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '1rem' }}>
          <i className="fa-solid fa-graduation-cap" style={{ marginRight: '0.5rem' }}></i>
          Why Pathfolio?
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
          Traditional college curricula often leave students wondering: <em>"What technologies should I actually learn to become a Full Stack Developer, DevOps Engineer, or VLSI Designer?"</em>
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
          Instead of juggling fragmented tools, random YouTube playlists, and confusing job requirements, Pathfolio brings everything into one cohesive platform:
        </p>
        <ul style={{ color: 'var(--text-main)', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
          <li><strong>Structured Career Roadmaps:</strong> Step-by-step curved visual journeys inspired by roadmap.sh technical standards.</li>
          <li><strong>Branch-Inclusive Paths:</strong> Dedicated roadmaps for CSE, IT, ECE, EEE, Mechanical, and Civil students.</li>
          <li><strong>Reusable Profile Data:</strong> Enter your education and skills once — reuse them instantly for resumes and portfolios.</li>
          <li><strong>ATS-Optimized Resumes:</strong> Clean, professional developer resume templates designed to pass recruiter screening.</li>
          <li><strong>Personal Portfolios:</strong> Generate modern portfolio websites with customizable themes.</li>
        </ul>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link to="/roadmaps" className="btn btn-primary btn-lg" style={{ marginRight: '1rem' }}>
          Explore Career Roadmaps
        </Link>
        <Link to="/signup" className="btn btn-secondary btn-lg">
          Create Free Account
        </Link>
      </div>
    </div>
  );
};

export default About;
