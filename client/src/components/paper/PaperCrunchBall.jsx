import React from 'react';

export const PaperCrunchBall = ({ text = 'Turning Page...', isDark = false }) => {
  return (
    <div className="paper-crunch-ui-layer">
      <div className="paper-crunch-badge">
        <span className="paper-crunch-icon">📜</span>
        <span className="paper-crunch-badge-text">{text}</span>
      </div>
    </div>
  );
};

export default PaperCrunchBall;

