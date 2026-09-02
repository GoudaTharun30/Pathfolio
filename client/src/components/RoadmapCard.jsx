/**
 * Career Roadmap Card Component
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RoadmapCard = ({ roadmap }) => {
  const navigate = useNavigate();
  const slug = roadmap.slug || roadmap.id;

  const topicCount = (roadmap.stages || roadmap.levels || []).reduce(
    (acc, lvl) => acc + (lvl.topics || []).length,
    0
  );

  const stageCount = (roadmap.stages || roadmap.levels || []).length;

  const branchesText = (roadmap.branches || ['CSE', 'IT']).join(' • ');

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/roadmaps/${slug}`);
  };

  return (
    <div className="card roadmap-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
          <span className="badge badge-primary">{roadmap.category}</span>
          <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
            <i className="fa-solid fa-graduation-cap" style={{ marginRight: '0.3rem' }}></i>
            {branchesText}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem'
          }}>
            <i className={roadmap.icon || 'fa-solid fa-compass'}></i>
          </div>
          <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-main)' }}>{roadmap.title}</h3>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          {roadmap.description}
        </p>
      </div>

      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '0.85rem',
          marginBottom: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-subtle)'
        }}>
          <span><i className="fa-solid fa-layer-group" style={{ marginRight: '0.3rem', color: 'var(--primary)' }}></i>{stageCount} Stages</span>
          <span><i className="fa-solid fa-book-bookmark" style={{ marginRight: '0.3rem', color: 'var(--secondary)' }}></i>{topicCount} Core Topics</span>
          <span><i className="fa-solid fa-clock" style={{ marginRight: '0.3rem', color: 'var(--success)' }}></i>{roadmap.estimatedMonths || '4–6 Mo'}</span>
        </div>

        <button
          className="btn btn-primary btn-block"
          onClick={handleViewDetails}
          id={`view-details-${slug}`}
        >
          <i className="fa-solid fa-route"></i> View Details
        </button>
      </div>
    </div>
  );
};

export default RoadmapCard;
