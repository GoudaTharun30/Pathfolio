/**
 * Frequently Asked Questions (FAQ) Page
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'What is Pathfolio?',
    a: 'Pathfolio is an integrated career development platform for engineering students. It provides structured career roadmaps, a week-by-week learning planner, project recommendations, an ATS resume builder, a portfolio builder, and AI career mentoring.'
  },
  {
    q: 'Is Pathfolio only for Computer Science students?',
    a: 'No! Pathfolio includes career paths for all major engineering branches including CSE, IT, ECE (Embedded Systems, VLSI, IoT), EEE (Electrical Design, PLC/SCADA Automation), Mechanical (Mechanical Design, Robotics & Mechatronics), and Civil (Structural Engineering, BIM Project Management).'
  },
  {
    q: 'How does the visual curved roadmap work?',
    a: 'Each career roadmap is mapped along a continuous curved learning road from "START YOUR JOURNEY" through foundational, core, and advanced levels to "JOB READY". You can click on any node to view concepts, estimated study hours, and check off completed skills.'
  },
  {
    q: 'Can I generate both a resume and a portfolio from my profile?',
    a: 'Yes! Once you populate your profile with your education, skills, projects, and experience, Pathfolio automatically fills both the ATS Resume Builder and Portfolio Builder without requiring you to re-type your information.'
  },
  {
    q: 'Are the resume templates ATS-friendly?',
    a: 'Yes. Pathfolio resume templates are formatted with clean standard headings, clear typography, and ATS-parseable layouts to ensure automated applicant tracking systems process your qualifications accurately.'
  },
  {
    q: 'Is Pathfolio free for college students?',
    a: 'Yes, Pathfolio is free to use for students to plan their learning journeys, build projects, and prepare for placement interviews.'
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem', maxWidth: '850px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Help & Questions</span>
        <h1 style={{ fontSize: '2.4rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Everything you need to know about navigating Pathfolio and accelerating your engineering career.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="card"
              style={{
                cursor: 'pointer',
                borderColor: isOpen ? 'var(--primary)' : 'var(--border-color)',
                transition: 'var(--transition)'
              }}
              onClick={() => toggle(idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', color: isOpen ? 'var(--primary)' : 'var(--text-main)', margin: 0 }}>
                  {faq.q}
                </h3>
                <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ color: 'var(--text-muted)' }}></i>
              </div>

              {isOpen && (
                <div style={{ marginTop: '0.85rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
        <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Have more questions?</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Explore our roadmaps or create your profile to get started.</p>
        <Link to="/roadmaps" className="btn btn-primary">
          Explore Career Roadmaps &rarr;
        </Link>
      </div>
    </div>
  );
};

export default FAQ;
