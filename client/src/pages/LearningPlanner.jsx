/**
 * Learning Planner Page
 * Converts structured career roadmaps into actionable weekly study schedules
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';

export const LearningPlanner = () => {
  const navigate = useNavigate();
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePlan, setActivePlan] = useState(null);
  const [newCustomGoal, setNewCustomGoal] = useState('');

  useEffect(() => {
    const fetchLearningPlan = async () => {
      try {
        const data = await api.request('/learning-plan/paths').catch(() => []);
        setPaths(data || []);
        if (data && data.length > 0) {
          const current = data.find(p => p.isActive) || data[0];
          setActivePlan(current);
        }
      } catch (err) {
        console.error('Error fetching learning plan:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPlan();
  }, []);

  const toggleTask = async (weekIdx, taskIdx) => {
    if (!activePlan) return;

    const updatedWeeks = [...(activePlan.weeks || [])];
    const task = updatedWeeks[weekIdx].tasks[taskIdx];
    task.completed = !task.completed;

    // Recalculate progress %
    let totalTasks = 0;
    let completedTasks = 0;
    updatedWeeks.forEach(w => {
      (w.tasks || []).forEach(t => {
        totalTasks++;
        if (t.completed) completedTasks++;
      });
    });

    const newProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const updatedPlan = { ...activePlan, weeks: updatedWeeks, progress: newProgress };
    setActivePlan(updatedPlan);

    try {
      await api.request(`/learning-plan/paths/${activePlan._id || activePlan.id || 'active'}`, {
        method: 'PUT',
        body: JSON.stringify(updatedPlan)
      });
    } catch (e) {
      console.warn('Saved task locally:', e.message);
    }
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newCustomGoal.trim() || !activePlan) return;

    const updatedWeeks = [...(activePlan.weeks || [])];
    if (updatedWeeks.length === 0) {
      updatedWeeks.push({ weekNumber: 1, title: 'Custom Goals', tasks: [] });
    }

    updatedWeeks[0].tasks.push({
      title: newCustomGoal.trim(),
      completed: false,
      isCustom: true
    });

    setActivePlan({ ...activePlan, weeks: updatedWeeks });
    setNewCustomGoal('');
  };

  if (loading) {
    return <Loading message="Loading your weekly learning planner..." />;
  }

  if (!activePlan || !activePlan.roadmapSlug) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
        <i className="fa-solid fa-calendar-days" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
        <h2 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>No Active Learning Plan</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
          Select a career roadmap from our 17 engineering paths to generate your personalized weekly study schedule.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/roadmaps')}>
          <i className="fa-solid fa-compass"></i> Explore Career Roadmaps
        </button>
      </div>
    );
  }

  const progress = activePlan.progress || 0;

  return (
    <div className="learning-planner-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(15, 23, 42, 0.95))',
        borderColor: 'var(--primary)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
              Active Learning Track
            </span>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: '0 0 0.35rem 0' }}>
              {activePlan.roadmapTitle || 'Career Learning Schedule'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
              Study Pace: <strong>{activePlan.intensity || 'Moderate (10-12 hrs/week)'}</strong> • Target Timeline: <strong>{activePlan.durationLabel || '16 Weeks'}</strong>
            </p>
          </div>

          <div style={{ minWidth: '220px', textAlign: 'right' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>
              {progress}% Completed
            </div>
            <div className="progress-bar-container" style={{ height: '8px' }}>
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom Weekly Goal Form */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          <i className="fa-solid fa-plus-circle" style={{ color: 'var(--secondary)', marginRight: '0.4rem' }}></i>
          Add Custom Study Goal or Interview Topic
        </h3>
        <form onSubmit={handleAddGoal} style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Solve 5 LeetCode DP problems, Build portfolio project milestone..."
            value={newCustomGoal}
            onChange={(e) => setNewCustomGoal(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={!newCustomGoal.trim()}>
            Add Goal
          </button>
        </form>
      </div>

      {/* Weekly Schedule Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {(activePlan.weeks || []).map((week, wIdx) => {
          const completedInWeek = (week.tasks || []).filter(t => t.completed).length;
          const totalInWeek = (week.tasks || []).length;
          const isWeekDone = totalInWeek > 0 && completedInWeek === totalInWeek;

          return (
            <div
              key={wIdx}
              className="card"
              style={{
                borderColor: isWeekDone ? 'var(--success)' : 'var(--border-color)',
                background: isWeekDone ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-card)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="badge badge-secondary" style={{ fontSize: '0.85rem' }}>
                    Week {week.weekNumber || wIdx + 1}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', margin: 0, color: 'var(--text-main)' }}>
                    {week.title || `Phase ${wIdx + 1}: Core Modules`}
                  </h3>
                </div>
                <span style={{ fontSize: '0.85rem', color: isWeekDone ? '#10b981' : 'var(--text-muted)', fontWeight: 600 }}>
                  {completedInWeek}/{totalInWeek} Tasks Done
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {(week.tasks || []).map((task, tIdx) => (
                  <label
                    key={tIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      background: 'var(--bg-input)',
                      padding: '0.65rem 0.9rem',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      fontSize: '0.92rem',
                      color: task.completed ? 'var(--text-subtle)' : 'var(--text-main)',
                      textDecoration: task.completed ? 'line-through' : 'none'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={!!task.completed}
                      onChange={() => toggleTask(wIdx, tIdx)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                    <span>{task.title}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default LearningPlanner;
