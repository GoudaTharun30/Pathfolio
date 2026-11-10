import React from 'react';

export const PaperLoader = ({ message = 'Sketching notes...' }) => {
  return (
    <div className="paper-loader-container">
      <div className="paper-folding-icon" />
      <div className="paper-loader-text">{message}</div>
    </div>
  );
};

export default PaperLoader;

