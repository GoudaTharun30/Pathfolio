import React from 'react';

export const PaperCard = ({ 
  children, 
  folded = false, 
  washi = false, 
  className = '', 
  style = {},
  ...props 
}) => {
  return (
    <div 
      className={`card ${folded ? 'paper-fold' : ''} ${className}`}
      style={{
        position: 'relative',
        backgroundColor: 'var(--paper-surface, #FFFEFA)',
        border: '2px solid var(--paper-ink, #171717)',
        borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
        boxShadow: '3px 4px 0px var(--paper-ink, #171717)',
        ...style
      }}
      {...props}
    >
      {washi && <div className="washi-tape-top" />}
      {children}
    </div>
  );
};

export default PaperCard;

