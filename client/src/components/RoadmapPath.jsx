/**
 * Reusable Interactive Curved Career Roadmap Component
 * Renders an animated serpentine/winding visual path with interactive skill nodes,
 * start point, project milestones, interview preparation, and job-ready destination.
 */
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import RoadmapNode from './RoadmapNode';
import TopicModal from './TopicModal';

export const RoadmapPath = ({
  roadmap,
  completedTopicIds = new Set(),
  onToggleComplete = () => {}
}) => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  const stages = roadmap?.stages || roadmap?.levels || [];

  // Extract flattened list of all topics with level context
  const allTopics = useMemo(() => {
    const list = [];
    stages.forEach((lvl, sIdx) => {
      (lvl.topics || []).forEach((top, tIdx) => {
        list.push({
          ...top,
          levelNum: lvl.level || sIdx + 1,
          levelTitle: lvl.title,
          stageIndex: sIdx,
          topicIndex: tIdx
        });
      });
    });
    return list;
  }, [stages]);

  // Determine current active node (first incomplete topic)
  let firstIncompleteFound = false;
  const currentTopicId = useMemo(() => {
    for (const top of allTopics) {
      if (!completedTopicIds.has(top.id)) {
        return top.id;
      }
    }
    return null;
  }, [allTopics, completedTopicIds]);

  const totalTopics = allTopics.length;
  const completedCount = allTopics.filter(t => completedTopicIds.has(t.id)).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // Calculate dynamic SVG path height based on total items
  const estimatedHeight = Math.max(800, (allTopics.length + stages.length + 3) * 130);

  // Generate smooth SVG serpentine bezier path
  const svgCurvePath = useMemo(() => {
    const pointsCount = Math.max(6, allTopics.length + 4);
    let d = `M 450 40`;
    let currentY = 40;
    const stepY = (estimatedHeight - 100) / pointsCount;

    for (let i = 1; i <= pointsCount; i++) {
      currentY += stepY;
      const targetX = (i % 2 === 1) ? 220 : 680;
      const prevX = (i % 2 === 1) ? 680 : 220;
      const cp1X = prevX;
      const cp1Y = currentY - stepY * 0.5;
      const cp2X = targetX;
      const cp2Y = currentY - stepY * 0.5;

      d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${currentY}`;
    }
    return d;
  }, [allTopics.length, estimatedHeight]);

  return (
    <div className="roadmap-journey-container" style={{ position: 'relative', width: '100%', margin: '0 auto' }}>
      
      {/* Progress & Quick Stats Card */}
      <div className="card" style={{
        marginBottom: '2.5rem',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(15, 23, 42, 0.95))',
        borderColor: 'var(--primary)',
        padding: '1.5rem 2rem'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              <span className="badge badge-primary">{roadmap.category}</span>
              <span className="badge badge-success">
                <i className="fa-solid fa-graduation-cap" style={{ marginRight: '0.3rem' }}></i>
                {(roadmap.branches || ['CSE', 'IT']).join(' • ')}
              </span>
              <span className="badge badge-secondary">
                <i className="fa-solid fa-clock" style={{ marginRight: '0.3rem' }}></i>
                {roadmap.estimatedMonths || '4–6 Months'}
              </span>
            </div>
            <h1 style={{ fontSize: '1.85rem', margin: '0 0 0.35rem 0', color: 'var(--text-main)' }}>{roadmap.title}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '750px', margin: 0 }}>
              {roadmap.description}
            </p>
          </div>

          {/* Progress Widget */}
          <div style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.2rem 1.5rem',
            minWidth: '250px',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              <span>Journey Progress</span>
              <span style={{ color: 'var(--primary)' }}>{progressPercent}%</span>
            </div>
            <div className="progress-bar-container" style={{ height: '10px', marginBottom: '0.5rem' }}>
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {completedCount} of {totalTopics} Core Skills Completed
            </div>
          </div>
        </div>

        {roadmap.requiredSkills && roadmap.requiredSkills.length > 0 && (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1.25rem' }}>
            <strong style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', letterSpacing: '0.05em' }}>CORE TECH STACK:</strong>
            {roadmap.requiredSkills.map((sk, idx) => (
              <span key={idx} className="badge">{sk}</span>
            ))}
          </div>
        )}
      </div>

      {/* Main Curved Journey Canvas */}
      <div className="card route-map-wrapper" style={{
        position: 'relative',
        padding: '3rem 1.5rem',
        overflow: 'hidden',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
            <i className="fa-solid fa-route" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}></i>
            Career Learning Journey
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto' }}>
            Follow the curved learning road from fundamentals to job-ready mastery. Click any stage node to inspect concepts, hours, and track completion.
          </p>
        </div>

        {/* SVG Curved Path Overlay (Desktop / Tablet) */}
        <div className="svg-route-connector" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <svg width="100%" height="100%" viewBox={`0 0 900 ${estimatedHeight}`} preserveAspectRatio="xMidYMin meet" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="roadmapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Path Track */}
            <path
              d={svgCurvePath}
              fill="none"
              stroke="#334155"
              strokeWidth="10"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />

            {/* Animated Active Glowing Path */}
            <path
              d={svgCurvePath}
              fill="none"
              stroke="url(#roadmapGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              className="animated-stroke"
              filter="url(#glow)"
            />
          </svg>
        </div>

        {/* Dynamic Nodes Container */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '850px', margin: '0 auto' }}>
          
          {/* 1. START NODE */}
          <div className="route-node-row align-center">
            <div className="route-node-card" style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderColor: 'var(--primary)',
              textAlign: 'center',
              padding: '1.25rem'
            }}>
              <div style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '0.3rem' }}>
                <i className="fa-solid fa-flag-checkered"></i>
              </div>
              <strong style={{ fontSize: '1.15rem', color: '#fff', letterSpacing: '0.03em' }}>
                🚀 START YOUR JOURNEY
              </strong>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Engineering Core Fundamentals
              </div>
            </div>
          </div>

          {/* 2. STAGES & NODES */}
          {stages.map((lvl, stageIdx) => {
            const levelNumber = lvl.level || stageIdx + 1;
            return (
              <React.Fragment key={`stage-${levelNumber}`}>
                {/* Level Divider Header */}
                <div className="level-header-divider">
                  <div className="level-header-badge">
                    <i className="fa-solid fa-layer-group" style={{ marginRight: '0.4rem' }}></i>
                    Level {levelNumber}: {lvl.title}
                  </div>
                </div>

                {/* Level Description */}
                {lvl.description && (
                  <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    {lvl.description}
                  </div>
                )}

                {/* Level Topic Nodes */}
                {(lvl.topics || []).map((topic, topicIdx) => {
                  const isCompleted = completedTopicIds.has(topic.id);
                  const isCurrent = topic.id === currentTopicId;

                  // Alternating serpentine alignment: left, right, left, right...
                  const alignClass = (topicIdx % 2 === 0) ? 'align-left' : 'align-right';

                  return (
                    <RoadmapNode
                      key={topic.id || `topic-${stageIdx}-${topicIdx}`}
                      topic={topic}
                      levelNum={levelNumber}
                      stageIndex={stageIdx}
                      topicIndex={topicIdx}
                      isCompleted={isCompleted}
                      isCurrent={isCurrent}
                      alignClass={alignClass}
                      onClick={(t) => setSelectedTopic(t)}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}

          {/* 3. PROJECT MILESTONE NODE */}
          <div className="level-header-divider">
            <div className="level-header-badge" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
              <i className="fa-solid fa-diagram-project" style={{ marginRight: '0.4rem' }}></i>
              PROJECT MILESTONE
            </div>
          </div>

          <div className="route-node-row align-center">
            <div
              className="route-node-card"
              style={{
                borderColor: '#a855f7',
                background: 'rgba(168, 85, 247, 0.12)',
                textAlign: 'center',
                padding: '1.25rem',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/projects')}
              tabIndex="0"
              role="button"
            >
              <div style={{ fontSize: '1.8rem', color: '#c084fc', marginBottom: '0.3rem' }}>
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <strong style={{ fontSize: '1.15rem', color: '#fff' }}>
                🛠️ Build 5 Recommended Projects
              </strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.4rem 0 0.8rem 0' }}>
                2 Easy Foundation • 2 Medium Skill • 1 Hard Portfolio Project
              </p>
              <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); navigate('/projects'); }}>
                View Project Guides &rarr;
              </button>
            </div>
          </div>

          {/* 4. INTERVIEW PREPARATION MILESTONE */}
          <div className="level-header-divider">
            <div className="level-header-badge" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
              <i className="fa-solid fa-user-tie" style={{ marginRight: '0.4rem' }}></i>
              INTERVIEW PREPARATION
            </div>
          </div>

          <div className="route-node-row align-center">
            <div
              className="route-node-card"
              style={{
                borderColor: '#f59e0b',
                background: 'rgba(245, 158, 11, 0.12)',
                textAlign: 'center',
                padding: '1.25rem',
                cursor: 'pointer'
              }}
              onClick={() => setShowInterviewModal(true)}
              tabIndex="0"
              role="button"
            >
              <div style={{ fontSize: '1.8rem', color: '#fbbf24', marginBottom: '0.3rem' }}>
                <i className="fa-solid fa-clipboard-question"></i>
              </div>
              <strong style={{ fontSize: '1.15rem', color: '#fff' }}>
                💼 Technical Interview Prep
              </strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.4rem 0 0.8rem 0' }}>
                Core Conceptual Questions, DSA Scenarios & System Architecture
              </p>
              <button className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); setShowInterviewModal(true); }}>
                Open Interview Questions &rarr;
              </button>
            </div>
          </div>

          {/* 5. JOB READY FINAL DESTINATION */}
          <div className="route-node-row align-center" style={{ marginTop: '3.5rem' }}>
            <div className="route-node-card" style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(15, 23, 42, 0.95))',
              border: '2px solid #10b981',
              textAlign: 'center',
              padding: '1.75rem',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.25)'
            }}>
              <div style={{ fontSize: '2.5rem', color: '#34d399', marginBottom: '0.4rem' }}>
                <i className="fa-solid fa-trophy"></i>
              </div>
              <strong style={{ fontSize: '1.35rem', color: '#6ee7b7', letterSpacing: '0.04em' }}>
                🎯 JOB READY DESTINATION
              </strong>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '0.5rem auto 1.25rem auto', maxWidth: '320px', lineHeight: 1.5 }}>
                You have completed all technical milestones for <strong>{roadmap.title}</strong>! You are ready to create your ATS resume and apply for engineering roles.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button className="btn btn-success btn-sm" onClick={() => navigate('/resume')}>
                  <i className="fa-solid fa-file-invoice"></i> Build ATS Resume
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/portfolio')}>
                  <i className="fa-solid fa-laptop-code"></i> Build Portfolio
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Topic Details Modal */}
      {selectedTopic && (
        <TopicModal
          topic={selectedTopic}
          roadmapTitle={roadmap.title}
          isCompleted={completedTopicIds.has(selectedTopic.id)}
          onToggleComplete={(id) => onToggleComplete(id)}
          onClose={() => setSelectedTopic(null)}
        />
      )}

      {/* Interview Questions Modal */}
      {showInterviewModal && (
        <div className="modal-overlay active" onClick={() => setShowInterviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px', width: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem' }}>
              <div>
                <span className="badge badge-warning" style={{ color: '#000', marginBottom: '0.3rem' }}>Technical Assessment</span>
                <h2 style={{ fontSize: '1.3rem', margin: 0 }}>{roadmap.title} Interview Questions</h2>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => setShowInterviewModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '60vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {(roadmap.interviewPreparation && roadmap.interviewPreparation.length > 0 ? roadmap.interviewPreparation : [
                `Explain the fundamental architecture and design patterns used in ${roadmap.title}.`,
                'How do you identify and optimize performance bottlenecks in production?',
                'What are common security vulnerabilities and how do you safeguard against them?',
                'Describe how you would architect a scalable system to handle 100,000 requests per minute.'
              ]).map((q, idx) => (
                <div key={idx} className="card" style={{ background: 'var(--bg-input)', padding: '1rem' }}>
                  <strong style={{ color: 'var(--primary)', fontSize: '0.9rem', display: 'block', marginBottom: '0.3rem' }}>
                    Q{idx + 1}: {q}
                  </strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                    Focus on practical code examples, trade-offs, and design principles during technical interviews.
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button className="btn btn-primary btn-sm" onClick={() => setShowInterviewModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .route-map-wrapper {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
        }

        .route-node-row {
          display: flex;
          align-items: center;
          margin-bottom: 2.75rem;
          position: relative;
          z-index: 2;
        }

        .route-node-row.align-left {
          justify-content: flex-start;
          padding-left: 6%;
        }

        .route-node-row.align-center {
          justify-content: center;
        }

        .route-node-row.align-right {
          justify-content: flex-end;
          padding-right: 6%;
        }

        .route-node-card {
          position: relative;
          background: var(--bg-input);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.9rem 1.3rem;
          min-width: 250px;
          max-width: 320px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 14px rgba(0,0,0,0.25);
        }

        .route-node-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: var(--primary);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
        }

        .route-node-card.completed {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }

        .route-node-card.current {
          border-color: #6366f1;
          background: rgba(99, 102, 241, 0.18);
          box-shadow: 0 0 22px rgba(99, 102, 241, 0.45);
          animation: pulseCurrentNode 2s infinite alternate;
        }

        @keyframes pulseCurrentNode {
          0% { box-shadow: 0 0 10px rgba(99, 102, 241, 0.3); }
          100% { box-shadow: 0 0 26px rgba(99, 102, 241, 0.75); }
        }

        .level-header-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2.25rem 0 1rem 0;
          position: relative;
          z-index: 2;
        }

        .level-header-badge {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: #fff;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.45rem 1.3rem;
          border-radius: 20px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
        }

        .animated-stroke {
          stroke-dasharray: 8 8;
          animation: dashMovePath 25s linear infinite;
        }

        @keyframes dashMovePath {
          to { stroke-dashoffset: -100; }
        }

        @media (max-width: 768px) {
          .svg-route-connector {
            display: none;
          }
          .route-node-row.align-left,
          .route-node-row.align-right {
            justify-content: center;
            padding: 0;
          }
          .route-node-card {
            max-width: 100%;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default RoadmapPath;
