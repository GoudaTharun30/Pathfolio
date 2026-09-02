/**
 * Loading Spinner & State Component
 */
import React from 'react';

export const Loading = ({ message = 'Loading your career path...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '300px',
      padding: '3rem',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '2.5rem',
        color: 'var(--primary)',
        marginBottom: '1rem',
        animation: 'spin 1s linear infinite'
      }}>
        <i className="fa-solid fa-spinner"></i>
      </div>
      <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: '0 0 0.4rem 0' }}>
        {message}
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
        Fetching technical stages and personalized learning data...
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
