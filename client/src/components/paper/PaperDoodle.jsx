import React from 'react';

export const PaperDoodle = ({ type = 'arrow', color = '#171717', style = {} }) => {
  if (type === 'arrow') {
    return (
      <svg width="42" height="36" viewBox="0 0 48 42" fill="none" style={style}>
        <path d="M 4 8 Q 20 6 36 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 28 12 L 37 16 L 33 22" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M 6 36 Q 22 34 38 24" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 33 18 L 39 23 L 30 28" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  if (type === 'pencil') {
    return <span style={{ fontSize: '1.2rem', transform: 'rotate(15deg)', display: 'inline-block', ...style }}>✏️</span>;
  }

  if (type === 'star') {
    return <span style={{ fontSize: '1.2rem', color: 'var(--paper-yellow-marker, #F3E5A8)', ...style }}>★</span>;
  }

  return null;
};

export default PaperDoodle;

