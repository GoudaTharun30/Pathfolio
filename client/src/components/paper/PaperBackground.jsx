import React from 'react';

export const PaperBackground = ({ children }) => {
  return (
    <div className="theme-paper-bg-container" style={{
      minHeight: '100vh',
      backgroundColor: 'var(--paper-bg, #F8F5EE)',
      backgroundImage: `linear-gradient(var(--paper-grid, #DEDCD4) 1px, transparent 1px), linear-gradient(90deg, var(--paper-grid, #DEDCD4) 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      color: 'var(--paper-ink, #171717)',
      position: 'relative'
    }}>
      {children}
    </div>
  );
};

export default PaperBackground;

