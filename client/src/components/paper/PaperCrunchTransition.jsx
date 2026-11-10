import React from 'react';
import PaperCrunchBall from './PaperCrunchBall';

export const PaperCrunchTransition = ({ active = false, label = 'Turning Page...', isDark = false }) => {
  return (
    <div
      id="paper-crunch-overlay"
      className={`paper-crunch-overlay ${active ? 'active' : ''}`}
      aria-hidden={!active}
    >
      <div id="paper-crunch-canvas-container" className="paper-crunch-canvas-container" />
      <PaperCrunchBall text={label} isDark={isDark} />
    </div>
  );
};

export default PaperCrunchTransition;

