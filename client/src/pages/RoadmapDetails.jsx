/**
 * Career Roadmap Details Page (/roadmaps/:id)
 * Features the interactive curved serpentine learning path component
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import roadmapService from '../services/roadmapService';
import RoadmapPath from '../components/RoadmapPath';
import Loading from '../components/Loading';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const RoadmapDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completedTopicIds, setCompletedTopicIds] = useState(new Set());
  const [isActivating, setIsActivating] = useState(false);
  const [planMessage, setPlanMessage] = useState('');

  // Storage key for user topic completions
  const storageKey = `pathfolio_completed_${id}`;

  useEffect(() => {
    // Load local completed state
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCompletedTopicIds(new Set(JSON.parse(saved)));
      }
    } catch (e) {
      console.warn('Failed to load completed topics from localStorage');
    }

    const fetchRoadmap = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await roadmapService.getRoadmapBySlug(id);
        setRoadmap(data);
      } catch (err) {
        setError(err.message || `Roadmap "${id}" could not be loaded.`);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [id, storageKey]);

  // Toggle topic completion state
  const handleToggleComplete = (topicId) => {
    setCompletedTopicIds((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(next)));
      } catch (e) {}
      return next;
    });
  };

  // Set this roadmap as user's active learning plan
  const handleSetActivePlan = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsActivating(true);
    setPlanMessage('');
    try {
      await api.request('/learning-plan/create-or-update', {
        method: 'POST',
        body: JSON.stringify({
          roadmapSlug: roadmap.slug || roadmap.id,
          roadmapTitle: roadmap.title,
          intensity: 'Moderate'
        })
      });
      setPlanMessage(`"${roadmap.title}" is now your active learning path!`);
      setTimeout(() => setPlanMessage(''), 4000);
    } catch (err) {
      setPlanMessage('Failed to set active roadmap: ' + err.message);
    } finally {
      setIsActivating(false);
    }
  };

  if (loading) {
    return <Loading message={`Loading ${id} career journey...`} />;
  }

  if (error || !roadmap) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem' }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '2.5rem', color: 'var(--danger)', marginBottom: '1rem' }}></i>
          <h2 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Roadmap Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {error || `We couldn't find a career roadmap for "${id}".`}
          </p>
          <Link to="/roadmaps" className="btn btn-primary">
            <i className="fa-solid fa-arrow-left"></i> Back to All Roadmaps
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="roadmap-details-page">
      
      {/* Top Breadcrumb & Action Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <Link to="/roadmaps" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <i className="fa-solid fa-arrow-left"></i> Back to Roadmaps Explorer
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {isAuthenticated && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleSetActivePlan}
              disabled={isActivating}
            >
              <i className="fa-solid fa-bookmark" style={{ color: 'var(--primary)' }}></i>
              {isActivating ? 'Activating...' : 'Set as Active Plan'}
            </button>
          )}

          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/projects')}>
            <i className="fa-solid fa-rocket" style={{ color: '#c084fc' }}></i>
            5 Project Specs
          </button>

          <button className="btn btn-primary btn-sm" onClick={() => navigate('/resume')}>
            <i className="fa-solid fa-file-invoice"></i>
            Build Resume
          </button>
        </div>
      </div>

      {planMessage && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid var(--success)',
          color: '#6ee7b7',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <i className="fa-solid fa-circle-check"></i>
          <span>{planMessage}</span>
        </div>
      )}

      {/* Render Curved Learning Journey Component */}
      <RoadmapPath
        roadmap={roadmap}
        completedTopicIds={completedTopicIds}
        onToggleComplete={handleToggleComplete}
      />

    </div>
  );
};

export default RoadmapDetails;
