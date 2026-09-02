/**
 * Root Pathfolio Application Component
 * Manages routing, layouts (Public vs Authenticated App Shell), and global providers
 */
import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import FloatingAi from './components/FloatingAi';
import Loading from './components/Loading';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Roadmaps from './pages/Roadmaps';
import RoadmapDetails from './pages/RoadmapDetails';
import LearningPlanner from './pages/LearningPlanner';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <Loading message="Authenticating session..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

export const App = () => {
  const { isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // Determine if current route uses App Shell (Sidebar + AppHeader) or Public Shell (Navbar + Footer)
  const isPublicOnlyRoute = ['/', '/about', '/faq', '/login', '/signup'].includes(location.pathname);
  const useAppShell = isAuthenticated && !isPublicOnlyRoute;

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
        <Loading message="Initializing Pathfolio..." />
      </div>
    );
  }

  return (
    <div className="app-root">
      {useAppShell ? (
        /* Authenticated Application Shell */
        <div className="app-layout">
          <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          
          <div className="app-main-content">
            <AppHeader toggleSidebar={toggleSidebar} />
            <main className="main-viewport" style={{ padding: '2rem 1.5rem', maxWidth: '1300px', margin: '0 auto', width: '100%' }}>
              <Routes>
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/roadmaps" element={<Roadmaps />} />
                <Route path="/roadmaps/:id" element={<RoadmapDetails />} />
                <Route path="/learning" element={<ProtectedRoute><LearningPlanner /></ProtectedRoute>} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
                <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
          
          <FloatingAi />
        </div>
      ) : (
        /* Public Landing & Guest Shell */
        <div className="public-layout">
          <Navbar />
          <main className="public-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/roadmaps" element={<Roadmaps />} />
              <Route path="/roadmaps/:id" element={<RoadmapDetails />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
              <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/learning" element={<ProtectedRoute><LearningPlanner /></ProtectedRoute>} />
              <Route path="/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
              <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
