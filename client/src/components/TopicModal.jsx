/**
 * Topic Details & Learning Step Modal Dialog
 */
import React from 'react';

export const TopicModal = ({ topic, roadmapTitle, isCompleted, onToggleComplete, onClose }) => {
  if (!topic) return null;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', width: '90%' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.85rem'
        }}>
          <div>
            <span className={`badge ${topic.importance === 'essential' ? 'badge-primary' : 'badge-success'}`} style={{ marginBottom: '0.3rem' }}>
              {topic.importance || 'essential'} Module
            </span>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: 0 }}>{topic.title}</h2>
          </div>
          <button className="btn btn-outline btn-sm" onClick={onClose} aria-label="Close modal">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.4rem', fontSize: '1rem' }}>
            <i className="fa-solid fa-bullseye" style={{ color: 'var(--primary)', marginRight: '0.4rem' }}></i>
            Why Learn {topic.title}?
          </h4>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
            {topic.whyItMatters || topic.description || `This module is a critical skill for the ${roadmapTitle} career path. Mastering it prepares you for real-world engineering projects and technical interview assessments.`}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <div className="card" style={{ background: 'var(--bg-input)', padding: '0.85rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', fontWeight: 600 }}>ESTIMATED TIME</span>
              <strong style={{ fontSize: '1rem', color: 'var(--primary)' }}>
                <i className="fa-solid fa-clock" style={{ marginRight: '0.3rem' }}></i> ~{topic.estimatedHours || 4} Hours
              </strong>
            </div>
            <div className="card" style={{ background: 'var(--bg-input)', padding: '0.85rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', fontWeight: 600 }}>DIFFICULTY</span>
              <strong style={{ fontSize: '1rem', color: 'var(--success)', textTransform: 'capitalize' }}>
                <i className="fa-solid fa-chart-line" style={{ marginRight: '0.3rem' }}></i> {topic.difficulty || 'beginner'}
              </strong>
            </div>
          </div>

          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1rem' }}>
            <i className="fa-solid fa-list-check" style={{ color: 'var(--secondary)', marginRight: '0.4rem' }}></i>
            Core Concepts & Subtopics:
          </h4>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {topic.concepts && topic.concepts.length > 0 ? (
              topic.concepts.map((concept, idx) => (
                <li key={idx}><strong>{concept}</strong></li>
              ))
            ) : (
              <>
                <li>Core Syntax, Architecture & Best Practices</li>
                <li>Practical Hands-on Exercises & Code Implementation</li>
                <li>Integration with Upstream & Downstream Modules</li>
                <li>Debugging & Performance Optimization</li>
              </>
            )}
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} btn-block btn-lg`}
            onClick={() => {
              onToggleComplete(topic.id);
              onClose();
            }}
          >
            <i className={`fa-solid ${isCompleted ? 'fa-xmark' : 'fa-check'}`}></i>
            {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicModal;
