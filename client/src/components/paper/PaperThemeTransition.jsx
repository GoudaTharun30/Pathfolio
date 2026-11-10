import React from 'react';

export const PaperThemeTransition = ({ isTransitioning = false, targetTheme = 'paper' }) => {
  if (!isTransitioning) return null;

  const label = targetTheme === 'paper'
    ? 'Transforming to Paper World...'
    : 'Transforming to Professional Theme...';

  return (
    <div className="paper-theme-transition-indicator" aria-live="polite">
      <div className="paper-crunch-badge">
        <span className="paper-crunch-icon">✨</span>
        <span className="paper-crunch-badge-text">{label}</span>
      </div>
    </div>
  );
};

export default PaperThemeTransition;

