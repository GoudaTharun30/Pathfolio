/**
 * Career Roadmaps Explorer Page
 */
import React, { useState, useEffect, useMemo } from 'react';
import roadmapService from '../services/roadmapService';
import RoadmapCard from '../components/RoadmapCard';
import Loading from '../components/Loading';

export const Roadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState('Any');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchSkill, setSearchSkill] = useState('');

  useEffect(() => {
    const fetchRoadmapsList = async () => {
      setLoading(true);
      try {
        const list = await roadmapService.getRoadmaps({
          branch: selectedBranch,
          category: selectedCategory,
          knownSkills: searchSkill
        });
        setRoadmaps(list || []);
      } catch (err) {
        console.error('Error fetching roadmaps:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmapsList();
  }, [selectedBranch, selectedCategory, searchSkill]);

  return (
    <div className="roadmaps-page-container">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: '0 0 0.35rem 0' }}>
          <i className="fa-solid fa-map-location-dot" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}></i>
          Career Roadmaps Explorer
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
          Discover realistic engineering career paths, explore structured curved learning journeys, and master job-ready technical skills.
        </p>
      </div>

      {/* Filter Controls Card */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          
          {/* 1. Branch Filter */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="filter-branch">
              <i className="fa-solid fa-graduation-cap" style={{ marginRight: '0.3rem' }}></i> Filter by Engineering Branch
            </label>
            <select
              id="filter-branch"
              className="form-control"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="Any">Any Branch / All (17 Paths)</option>
              <option value="CSE">CSE — Computer Science Engineering</option>
              <option value="IT">IT — Information Technology</option>
              <option value="ECE">ECE — Electronics & Communication</option>
              <option value="EEE">EEE — Electrical & Electronics</option>
              <option value="Mechanical">Mechanical Engineering</option>
              <option value="Civil">Civil Engineering</option>
            </select>
          </div>

          {/* 2. Category Filter */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="filter-category">
              <i className="fa-solid fa-tags" style={{ marginRight: '0.3rem' }}></i> Category
            </label>
            <select
              id="filter-category"
              className="form-control"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Software Development">Software Development</option>
              <option value="Data & AI">Data & AI</option>
              <option value="Cloud & DevOps">Cloud & DevOps</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Embedded Systems">Embedded Systems</option>
              <option value="VLSI & Semiconductor">VLSI & Semiconductor</option>
              <option value="Electrical & Power">Electrical & Power</option>
              <option value="Automation & Robotics">Automation & Robotics</option>
              <option value="Design & CAD">Design & CAD</option>
              <option value="Civil & Construction">Civil & Construction</option>
            </select>
          </div>

          {/* 3. Known Skill Search */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="filter-skill">
              <i className="fa-solid fa-magnifying-glass" style={{ marginRight: '0.3rem' }}></i> Filter by Known Skill
            </label>
            <input
              id="filter-skill"
              type="text"
              className="form-control"
              placeholder="e.g. React, Python, C++, Verilog, SQL"
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* Roadmaps Grid */}
      {loading ? (
        <Loading message="Filtering technical career roadmaps..." />
      ) : roadmaps.length === 0 ? (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px dashed var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <i className="fa-solid fa-compass-drafting" style={{ fontSize: '2.5rem', color: 'var(--text-subtle)', marginBottom: '1rem', display: 'block' }}></i>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>No career paths found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Try changing your branch filter, category, or known skill search query.
          </p>
          <button
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem' }}
            onClick={() => {
              setSelectedBranch('Any');
              setSelectedCategory('All');
              setSearchSkill('');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="features-grid" style={{ marginBottom: '3rem' }}>
          {roadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.id || roadmap.slug} roadmap={roadmap} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Roadmaps;
