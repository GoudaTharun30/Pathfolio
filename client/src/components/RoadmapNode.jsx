/**
 * Roadmap Node Component
 * Renders an interactive stage node along the curved learning path
 */
import React from 'react';

export const RoadmapNode = ({
  topic,
  levelNum,
  stageIndex,
  topicIndex,
  isCompleted,
  isCurrent,
  alignClass,
  onClick
}) => {
  const cardStatusClass = isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming';

  return (
    <div className={`route-node-row ${alignClass}`}>
      <div
        className={`route-node-card ${cardStatusClass}`}
        onClick={() => onClick(topic)}
        title="Click for topic details & study concepts"
        tabIndex="0"
        role="button"
        onKeyDown={(e) => e.key === 'Enter' && onClick(topic)}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span className={`badge ${topic.importance === 'essential' ? 'badge-primary' : 'badge-success'}`} style={{ fontSize: '0.7rem' }}>
            {topic.importance || 'essential'}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <i className="fa-solid fa-clock" style={{ marginRight: '0.2rem' }}></i> ~{topic.estimatedHours || 4}h
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{ fontSize: '1.25rem', flexShrink: 0 }}>
            {isCompleted ? (
              <i className="fa-solid fa-circle-check" style={{ color: '#10b981' }}></i>
            ) : isCurrent ? (
              <i className="fa-solid fa-circle-dot" style={{ color: '#6366f1' }}></i>
            ) : (
              <i className="fa-regular fa-circle" style={{ color: 'var(--text-subtle)' }}></i>
            )}
          </div>
          <div>
            <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 600, display: 'block' }}>
              {topic.title}
            </strong>
            {isCurrent && (
              <span className="badge badge-primary" style={{ fontSize: '0.65rem', marginTop: '0.2rem' }}>
                YOU ARE HERE
              </span>
            )}
          </div>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem' }}>
          <span style={{ textTransform: 'capitalize' }}>Level: {topic.difficulty || 'beginner'}</span>
          <span style={{ color: 'var(--primary)', fontWeight: 500 }}>
            Details <i className="fa-solid fa-angle-right"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoadmapNode;
