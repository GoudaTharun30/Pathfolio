import React from 'react';

export const PaperUnfold = ({ children, className = '' }) => {
  return (
    <div className={`paper-unfold paper-unfold-settle ${className}`}>
      {children}
    </div>
  );
};

export default PaperUnfold;

